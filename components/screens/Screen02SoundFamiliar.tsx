"use client";

import { motion } from "framer-motion";
import { BookOpen, Smartphone, Headphones, Flame, type LucideIcon } from "lucide-react";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import { useFlow } from "@/lib/flow-store";

interface Item {
  Icon: LucideIcon;
  label: string;
  tint: string;
}

const ITEMS: Item[] = [
  { Icon: BookOpen, label: "Books that hyped you up for a week", tint: "#E5B043" },
  { Icon: Smartphone, label: "Apps you opened twice", tint: "#7CA3D6" },
  { Icon: Headphones, label: "Podcasts you binged, then forgot", tint: "#E87158" },
  { Icon: Flame, label: "Motivation that died by Wednesday", tint: "#C64655" },
];

export default function Screen02SoundFamiliar() {
  const next = useFlow((s) => s.next);

  return (
    <Screen cta={<PrimaryCTA label="Continue" onClick={next} />}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-2"
      >
        <Headline text="You know **how** this goes." size="2xl" />
      </motion.div>

      <div className="mt-9 flex flex-col gap-3">
        {ITEMS.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.18 + i * 0.08, ease: "easeOut" }}
            className="flex items-center gap-4 px-4 py-[14px] rounded-2xl"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 6px 18px -8px rgba(0,0,0,0.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 42,
                height: 42,
                background: `linear-gradient(160deg, ${it.tint}38 0%, ${it.tint}10 100%)`,
                border: `1px solid ${it.tint}55`,
                color: it.tint,
                boxShadow: `0 0 18px ${it.tint}22`,
              }}
            >
              <it.Icon size={19} strokeWidth={1.85} />
            </span>
            <span className="text-[15.5px]" style={{ color: "rgba(255,255,255,0.92)" }}>
              {it.label}
            </span>
          </motion.div>
        ))}
      </div>

    </Screen>
  );
}
