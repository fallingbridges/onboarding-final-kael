"use client";

import { motion } from "framer-motion";
import { Eye, Infinity as InfinityIcon, Hand, type LucideIcon } from "lucide-react";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import { useFlow } from "@/lib/flow-store";

interface Feature {
  Icon: LucideIcon;
  label: string;
  desc: string;
  hue: string;
  hueDeep: string;
}

const FEATURES: Feature[] = [
  {
    Icon: Eye,
    label: "Names what's firing.",
    desc: "In your own words, as it happens.",
    hue: "#A26AE8",
    hueDeep: "#5C2EAB",
  },
  {
    Icon: InfinityIcon,
    label: "Holds it across time.",
    desc: "Patterns named once stay caught.",
    hue: "#3FA3C5",
    hueDeep: "#1F5C75",
  },
  {
    Icon: Hand,
    label: "Doesn't let you slip back.",
    desc: "When the old move shows up, Kael calls it.",
    hue: "#E87158",
    hueDeep: "#9C3D27",
  },
];

export default function Screen04HowKaelWorks() {
  const next = useFlow((s) => s.next);

  return (
    <Screen cta={<PrimaryCTA label="Let's get started" onClick={next} />}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-2"
      >
        <Headline text="Kael lives **where** the script lives." size="2xl" />
      </motion.div>


      <div className="mt-9 flex flex-col gap-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 + i * 0.1, ease: "easeOut" }}
            className="rounded-2xl p-4 flex gap-4 items-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${f.hue}1a 0%, ${f.hueDeep}10 100%)`,
              border: `1px solid ${f.hue}38`,
              boxShadow: `0 0 24px ${f.hue}18`,
            }}
          >
            <span
              className="absolute -top-10 -right-10 rounded-full opacity-25"
              style={{
                width: 96,
                height: 96,
                background: `radial-gradient(circle, ${f.hue}80 0%, transparent 70%)`,
              }}
              aria-hidden
            />
            <span
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 50,
                height: 50,
                background: `${f.hue}24`,
                border: `1px solid ${f.hue}50`,
                color: f.hue,
                boxShadow: `0 0 14px ${f.hue}30`,
              }}
            >
              <f.Icon size={22} strokeWidth={1.85} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold leading-tight" style={{ color: "var(--text)" }}>
                {f.label}
              </div>
              <div className="text-[13.5px] mt-1 leading-snug" style={{ color: "var(--text-mute)" }}>
                {f.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Screen>
  );
}
