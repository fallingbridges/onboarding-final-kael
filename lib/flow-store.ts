import { create } from "zustand";

/**
 * 0-indexed step ids where back navigation is disabled.
 *
 * Disabled on: Screen 1 (nothing prior), Screen 5 (auth — Apple/Google
 * native flow), Screen 16 (The Read — stale re-stream), Screen 17 (Day 1
 * celebration), Screen 24 (Loading), Screens 25-27 (commitment beats),
 * Screen 28 (Paywall).
 *
 * Back is ENABLED on Screens 6-10 (Name through Honesty) so the user
 * can correct prior selections.
 */
export const BACK_DISABLED = new Set<number>([
  0,    // Screen 1
  4,    // Screen 5 (auth)
  15,   // Screen 16 (The Read)
  16,   // Screen 17 (Day 1)
  23,   // Screen 24 (Loading)
  24,   // Screen 25 (Reveal)
  25,   // Screen 26 (Seal)
  26,   // Screen 27 (All set)
  27,   // Screen 28 (Paywall)
]);

/**
 * Continuous progress percentage across the form-filling block.
 * Screen 6 (Name, idx 5) through Screen 15 (Tried, idx 14) is the
 * progress range — 10 screens. Returns null on screens that should
 * hide the bar (everything before Name and from The Read onward).
 */
export function progressPercentFor(step: number): number | null {
  // Visible 5..14 (Name through Tried)
  if (step < 5 || step > 14) return null;
  const idx = step - 5; // 0..9
  // Walk from ~10% to ~95% so it always feels like motion both at start and end
  return Math.round(10 + (idx / 9) * 85);
}

export interface FlowState {
  currentStep: number; // 0..27
  direction: 1 | -1;   // last navigation direction (for transitions)

  name: string;
  age: string;
  gender: string;
  stuckArea: string;        // key into STUCK_AREA_COLORS
  specificShape: string;
  customShape: string;
  timeStuck: string;
  patterns: string[];       // multi-select, max 3
  whatTried: string[];      // multi-select
  goals: string[];          // multi-select, max 3

  setName: (v: string) => void;
  setAge: (v: string) => void;
  setGender: (v: string) => void;
  setStuckArea: (v: string) => void;
  setSpecificShape: (v: string) => void;
  setCustomShape: (v: string) => void;
  setTimeStuck: (v: string) => void;
  togglePattern: (v: string) => void;
  toggleWhatTried: (v: string) => void;
  toggleGoal: (v: string) => void;

  next: () => void;
  back: () => void;
  goTo: (n: number) => void;
}

const TOTAL_SCREENS = 28;

export const useFlow = create<FlowState>((set) => ({
  currentStep: 0,
  direction: 1,

  name: "",
  age: "",
  gender: "",
  stuckArea: "",
  specificShape: "",
  customShape: "",
  timeStuck: "",
  patterns: [],
  whatTried: [],
  goals: [],

  setName: (v) => set({ name: v }),
  setAge: (v) => set({ age: v }),
  setGender: (v) => set({ gender: v }),
  setStuckArea: (v) => set({ stuckArea: v }),
  setSpecificShape: (v) => set({ specificShape: v }),
  setCustomShape: (v) => set({ customShape: v }),
  setTimeStuck: (v) => set({ timeStuck: v }),

  togglePattern: (v) =>
    set((s) => {
      const has = s.patterns.includes(v);
      if (has) return { patterns: s.patterns.filter((x) => x !== v) };
      if (s.patterns.length >= 3) return s;
      return { patterns: [...s.patterns, v] };
    }),

  toggleWhatTried: (v) =>
    set((s) => {
      // "Nothing really" is mutually exclusive with the others
      const NOTHING = "nothing";
      if (v === NOTHING) {
        return { whatTried: s.whatTried.includes(NOTHING) ? [] : [NOTHING] };
      }
      const without = s.whatTried.filter((x) => x !== NOTHING);
      const has = without.includes(v);
      return { whatTried: has ? without.filter((x) => x !== v) : [...without, v] };
    }),

  toggleGoal: (v) =>
    set((s) => {
      const has = s.goals.includes(v);
      if (has) return { goals: s.goals.filter((x) => x !== v) };
      return { goals: [...s.goals, v] };
    }),

  next: () =>
    set((s) => ({
      currentStep: Math.min(s.currentStep + 1, TOTAL_SCREENS - 1),
      direction: 1,
    })),

  back: () =>
    set((s) => {
      if (BACK_DISABLED.has(s.currentStep)) return s;
      return { currentStep: Math.max(s.currentStep - 1, 0), direction: -1 };
    }),

  goTo: (n) =>
    set((s) => ({
      currentStep: Math.max(0, Math.min(n, TOTAL_SCREENS - 1)),
      direction: n >= s.currentStep ? 1 : -1,
    })),
}));

export function isBackEnabled(step: number): boolean {
  return !BACK_DISABLED.has(step);
}
