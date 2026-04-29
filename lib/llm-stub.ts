/**
 * Stub for The Read (Screen 16). Returns three pre-written messages
 * shaped like the spec calls for: recognition, hypothesis, shape of
 * coaching with bullets.
 *
 * Production version replaces this with a streaming LLM call. Inputs
 * to the prompt: stuck area, specific shape, time stuck, patterns,
 * what they've tried, age, gender.
 */

export interface ReadMessages {
  recognition: string;
  hypothesis: string;
  shapeIntro: string;
  shapeBullets: string[];
}

import type { FlowState } from "./flow-store";
import { STUCK_AREAS } from "./stuck-areas";

const PATTERN_PHRASE_YOU: Record<string, string> = {
  "high-standards": "hold yourself to high standards",
  "in-head": "live in your head",
  "shut-down": "shut down when it gets to be too much",
  "emotions-best": "let your emotions get the best of you",
  "escape": "escape when things get heavy",
  "everyone-okay": "make sure everyone else is okay first",
  "hard-on-myself": "are hard on yourself",
  "put-off": "put things off",
  "control": "need to feel in control",
  "motions": "go through the motions",
};

export function buildReadMessages(s: Partial<FlowState>): ReadMessages {
  const name = s.name?.trim() || "you";
  const area = s.stuckArea ? STUCK_AREAS[s.stuckArea]?.labelLower ?? "" : "";
  const shape = s.specificShape || s.customShape || "";
  const time = formatTime(s.timeStuck);
  const patternsLine = (s.patterns ?? [])
    .slice(0, 2)
    .map((k) => PATTERN_PHRASE_YOU[k] ?? k)
    .join(" and ");

  const recognition = recognitionFor(name, area, shape, time, patternsLine);
  const hypothesis = hypothesisFor(name, patternsLine);
  const shapeIntro = "Here's what we'll try to do together:";
  const shapeBullets = bulletsFor(area, shape, s.patterns ?? []);

  return { recognition, hypothesis, shapeIntro, shapeBullets };
}

function formatTime(t?: string): string {
  switch (t) {
    case "few-months": return "for a few months";
    case "about-year": return "for about a year";
    case "two-three": return "for two or three years";
    case "four-five": return "for four or five years";
    case "longer": return "for longer than that";
    default: return "for a while";
  }
}

function recognitionFor(name: string, area: string, shape: string, time: string, _patternsLine: string): string {
  const areaPart = area ? ` with your ${area}` : "";
  const shapePart = shape ? `\n\nThe shape: "${shape.toLowerCase()}."` : "";
  return (
    `Okay, ${name}. I hear you.\n\nYou've been stuck${areaPart}, ${time}.${shapePart}`
  ).trim();
}

function hypothesisFor(_name: string, patternsLine: string): string {
  const tail = patternsLine
    ? `The way you ${patternsLine} — that's one move, in different clothes.`
    : `The things you named aren't separate. Same move, different clothes.`;
  return `Here's a hypothesis, not a verdict.\n\n${tail}`;
}

function bulletsFor(area: string, shape: string, patterns: string[]): string[] {
  const bullets: string[] = [];
  if (patterns.length) {
    bullets.push(`Catch the pattern in real time, not after.`);
  } else {
    bullets.push(`Name what's actually firing, in your words.`);
  }
  if (shape) {
    bullets.push(`Look at "${shape.toLowerCase()}" without flinching from it.`);
  } else if (area) {
    bullets.push(`Find out what's underneath the ${area} story.`);
  } else {
    bullets.push(`Find out what's underneath the surface story.`);
  }
  bullets.push(`Build something steadier than the old loop.`);
  bullets.push(`Hold you to it across weeks, not just sessions.`);
  return bullets.slice(0, 4);
}

/**
 * Faked LLM response. ~600ms latency to feel like a real call without
 * blocking the user too long.
 */
export async function fakeFetchRead(s: Partial<FlowState>): Promise<ReadMessages> {
  await new Promise((r) => setTimeout(r, 600));
  return buildReadMessages(s);
}
