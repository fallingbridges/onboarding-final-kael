"use client";

import { motion } from "framer-motion";
import { Lock, Zap, Shield, Gavel, type LucideIcon } from "lucide-react";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import { useFlow } from "@/lib/flow-store";

interface Box {
  Icon: LucideIcon;
  label: string;
  desc: string;
  from: string;
  to: string;
  iconTint: string;
}

const BOXES: Box[] = [
  {
    Icon: Lock,
    label: "Limiting beliefs",
    desc: "Absorbed before you had words.",
    from: "#7B3F4A",
    to: "#3F1F26",
    iconTint: "#FFB7B7",
  },
  {
    Icon: Zap,
    label: "Unconscious triggers",
    desc: "Fire faster than thought.",
    from: "#7B5F2C",
    to: "#3F2F14",
    iconTint: "#F7CB7A",
  },
  {
    Icon: Shield,
    label: "Coping mechanisms",
    desc: "Old self-protection still running.",
    from: "#2F5C6B",
    to: "#162B33",
    iconTint: "#9DD2E0",
  },
  {
    Icon: Gavel,
    label: "Inner critic",
    desc: "The voice you can't argue with.",
    from: "#5B3F7B",
    to: "#2C1F3F",
    iconTint: "#C4A3FF",
  },
];

export default function Screen03WhyNothingStuck() {
  const next = useFlow((s) => s.next);

  return (
    <Screen cta={<PrimaryCTA label="Continue" onClick={next} />}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-2"
      >
        <Headline text="Meet the **scripts** running your life." size="xl" />
      </motion.div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {BOXES.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.18 + i * 0.08, ease: "easeOut" }}
            className="rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
            style={{
              aspectRatio: "1 / 1",
              background: `linear-gradient(155deg, ${b.from} 0%, ${b.to} 100%)`,
              border: `1px solid ${b.iconTint}30`,
              boxShadow: `0 12px 28px -14px rgba(0,0,0,0.55), inset 0 1px 0 ${b.iconTint}18`,
            }}
          >
            <span
              className="absolute -top-12 -right-12 rounded-full opacity-30"
              style={{
                width: 96,
                height: 96,
                background: `radial-gradient(circle, ${b.iconTint}55 0%, transparent 70%)`,
              }}
              aria-hidden
            />
            <span
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{
                width: 38,
                height: 38,
                background: `${b.iconTint}1f`,
                border: `1px solid ${b.iconTint}3a`,
                color: b.iconTint,
              }}
            >
              <b.Icon size={19} strokeWidth={1.85} />
            </span>
            <div
              className="text-[15.5px] font-semibold leading-tight mt-auto"
              style={{ color: "var(--text)" }}
            >
              {b.label}
            </div>
          </motion.div>
        ))}
      </div>

    </Screen>
  );
}
