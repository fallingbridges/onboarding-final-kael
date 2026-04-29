"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import { useFlow } from "@/lib/flow-store";
import { STUCK_AREAS } from "@/lib/stuck-areas";

const FEATURES = [
  "Unlimited coaching sessions",
  "Memory that holds across time",
  "Pattern recognition, in real time",
  "Personalized check-ins between sessions",
  "Private. Encrypted. Yours.",
];

const GOAL_PHRASES: Record<string, string> = {
  confidence: "feeling confident again",
  calm: "a calm mind",
  habits: "habits that hold",
  trusting: "trusting yourself",
  close: "real closeness",
  cycle: "breaking the cycle",
  charge: "feeling in control again",
  alive: "feeling alive again",
};

export default function Screen28Paywall() {
  const flow = useFlow();
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");

  const area = flow.stuckArea ? STUCK_AREAS[flow.stuckArea]?.labelLower : "";
  const topGoal = flow.goals[0];
  const phrase = topGoal ? GOAL_PHRASES[topGoal] ?? "what you came here for" : "what you came here for";
  const subhead = area
    ? `Let's work on your ${area}, and get you to ${phrase}.`
    : `Let's work on the things you named, and get you to ${phrase}.`;

  return (
    <Screen
      showBack={false}
      cta={
        <div className="flex flex-col gap-3">
          <PrimaryCTA label="Start 7-day free trial" onClick={() => {/* purchase flow */}} />
          <p className="text-[11.5px] leading-snug text-center" style={{ color: "var(--text-faint)" }}>
            Free for 7 days. Then auto-renews at the selected plan unless canceled at least 24 hours before the trial
            ends. Cancel anytime in Settings.
          </p>
          <div className="flex justify-center gap-5 mt-1 mb-0.5">
            <FootLink>Restore purchase</FootLink>
            <FootLink>Terms</FootLink>
            <FootLink>Privacy</FootLink>
          </div>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-2"
      >
        <Headline text="Start your **first** session." size="xl" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-3 text-[15.5px] leading-snug"
        style={{ color: "var(--text-mute)" }}
      >
        {subhead}
      </motion.p>

      {/* What you get */}
      <div className="mt-7">
        <div
          className="text-[11.5px] tracking-[0.16em] uppercase font-semibold mb-3"
          style={{ color: "var(--accent-hi)" }}
        >
          What you get
        </div>
        <ul className="flex flex-col gap-2.5">
          {FEATURES.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.18 + i * 0.06 }}
              className="flex gap-2.5 items-start"
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                style={{
                  width: 18,
                  height: 18,
                  background: "rgba(139, 92, 255, 0.16)",
                  color: "var(--accent-hi)",
                }}
              >
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="text-[14.5px] leading-snug" style={{ color: "rgba(255,255,255,0.95)" }}>
                {f}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Anchor line */}
      <p className="mt-6 text-[13px]" style={{ color: "var(--text-faint)" }}>
        A coaching session is $150. Kael is $14.99 a month. Unlimited.
      </p>

      {/* Plan cards */}
      <div className="mt-4 flex flex-col gap-3">
        <PlanCard
          selected={plan === "yearly"}
          onClick={() => setPlan("yearly")}
          title="Yearly"
          price="$99 / year"
          subline="$8.25 a month, billed annually after trial"
          badge="SAVE 45%"
        />
        <PlanCard
          selected={plan === "monthly"}
          onClick={() => setPlan("monthly")}
          title="Monthly"
          price="$14.99 / month"
          subline="Billed monthly after trial"
        />
      </div>
    </Screen>
  );
}

function PlanCard({
  selected,
  onClick,
  title,
  price,
  subline,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  price: string;
  subline: string;
  badge?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className="press text-left rounded-2xl p-4 flex items-center gap-3 relative"
      style={{
        background: selected ? "rgba(139, 92, 255, 0.10)" : "rgba(255,255,255,0.04)",
        border: `1.5px solid ${selected ? "rgba(139, 92, 255, 0.55)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: selected ? "0 0 24px rgba(139, 92, 255, 0.18)" : "none",
      }}
    >
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 22,
          height: 22,
          background: selected ? "var(--accent)" : "transparent",
          border: `1.5px solid ${selected ? "var(--accent)" : "rgba(255,255,255,0.22)"}`,
        }}
      >
        {selected && <span className="rounded-full" style={{ width: 8, height: 8, background: "#FFFFFF" }} />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[15.5px] font-semibold" style={{ color: "var(--text)" }}>
            {title}
          </span>
          <span className="text-[15px] font-semibold tabular-nums" style={{ color: "var(--text)" }}>
            {price}
          </span>
        </div>
        <div className="text-[12.5px] mt-0.5" style={{ color: "var(--text-mute)" }}>
          {subline}
        </div>
      </div>
      {badge && (
        <span
          className="absolute right-4 -top-2.5 rounded-full text-[10px] font-bold tracking-[0.08em] px-2 py-1"
          style={{
            background: "linear-gradient(180deg, #9B6DFF 0%, #7B47F2 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 10px -2px rgba(139,92,255,0.5)",
          }}
        >
          {badge}
        </span>
      )}
    </motion.button>
  );
}

function FootLink({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="text-[11.5px]" style={{ color: "var(--text-faint)" }}>
      {children}
    </button>
  );
}
