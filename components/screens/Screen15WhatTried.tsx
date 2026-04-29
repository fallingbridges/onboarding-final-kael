"use client";

import { motion } from "framer-motion";
import {
  Sofa,
  BookOpen,
  GraduationCap,
  Headphones,
  Smartphone,
  PenLine,
  Flower2,
  MessageCircle,
  Dumbbell,
  Circle,
  type LucideIcon,
} from "lucide-react";
import Screen from "@/components/Screen";
import ColorTile from "@/components/ColorTile";
import Headline from "@/components/Headline";
import PrimaryCTA from "@/components/PrimaryCTA";
import { useFlow } from "@/lib/flow-store";

interface Opt {
  key: string;
  label: string;
  Icon: LucideIcon;
  color: string;
}

const OPTIONS: Opt[] = [
  { key: "therapy", label: "Therapy", Icon: Sofa, color: "#5B7BD9" },
  { key: "books", label: "Books", Icon: BookOpen, color: "#3BA77E" },
  { key: "courses", label: "Courses", Icon: GraduationCap, color: "#D8A246" },
  { key: "podcasts", label: "Podcasts", Icon: Headphones, color: "#A26AE8" },
  { key: "apps", label: "Apps", Icon: Smartphone, color: "#3FA3C5" },
  { key: "journaling", label: "Journaling", Icon: PenLine, color: "#E04877" },
  { key: "meditation", label: "Meditation", Icon: Flower2, color: "#3BA7A7" },
  { key: "friends", label: "Talking to friends", Icon: MessageCircle, color: "#E87158" },
  { key: "pushing", label: "Pushing through", Icon: Dumbbell, color: "#C64655" },
  { key: "nothing", label: "Nothing really", Icon: Circle, color: "#7A6B85" },
];

export default function Screen15WhatTried() {
  const whatTried = useFlow((s) => s.whatTried);
  const toggleWhatTried = useFlow((s) => s.toggleWhatTried);
  const next = useFlow((s) => s.next);

  const canContinue = whatTried.length >= 1;

  return (
    <Screen
      showProgress
      cta={<PrimaryCTA label="Continue" onClick={next} disabled={!canContinue} />}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-2"
      >
        <Headline text="So what have you **tried** so far?" size="lg" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-3 text-[15.5px] leading-snug"
        style={{ color: "var(--text-mute)" }}
      >
        Pick all that apply.
      </motion.p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {OPTIONS.map((o, i) => (
          <motion.div
            key={o.key}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.16 + i * 0.04, ease: "easeOut" }}
          >
            <ColorTile
              Icon={o.Icon}
              label={o.label}
              selected={whatTried.includes(o.key)}
              onClick={() => toggleWhatTried(o.key)}
              color={o.color}
            />
          </motion.div>
        ))}
      </div>
    </Screen>
  );
}
