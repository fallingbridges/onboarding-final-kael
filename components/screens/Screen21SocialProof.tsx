"use client";

import { motion } from "framer-motion";
import { Bot, BookOpen, Check, Minus, X, type LucideIcon } from "lucide-react";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import { useFlow } from "@/lib/flow-store";

type Mark = "check" | "x" | "minus";

interface Row {
  label: string;
  chatbots: Mark;
  books: Mark;
}

const ROWS: Row[] = [
  { label: "Available 24/7",             chatbots: "check", books: "x"     },
  { label: "Remembers you",              chatbots: "minus", books: "x"     },
  { label: "Spots the loops you repeat", chatbots: "x",     books: "x"     },
  { label: "Challenges your thinking",   chatbots: "x",     books: "check" },
  { label: "Follows up on what you said", chatbots: "x",    books: "x"     },
];

const KAEL_PURPLE = "#B98EFF";
const GRID_COLS = "1fr 50px 70px 56px";

function AltMark({ type }: { type: Mark }) {
  const Icon: LucideIcon = type === "check" ? Check : type === "minus" ? Minus : X;
  const color = type === "check" ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.25)";
  return <Icon size={16} strokeWidth={2.2} color={color} />;
}

function AltHeader({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Icon size={17} strokeWidth={1.85} color="rgba(255,255,255,0.55)" />
      <span
        className="text-[10.5px] font-medium leading-tight text-center"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Screen21SocialProof() {
  const next = useFlow((s) => s.next);

  return (
    <Screen cta={<PrimaryCTA label="Continue" onClick={next} />}>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-2 flex items-center gap-2.5"
      >
        <span
          aria-hidden
          className="block"
          style={{
            width: 18,
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(196,163,255,0.6) 100%)",
          }}
        />
        <span
          className="text-[10.5px] font-semibold uppercase"
          style={{ color: "rgba(196,163,255,0.85)", letterSpacing: "0.32em" }}
        >
          Why this is different
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mt-3"
      >
        <Headline text="Why **nothing else** stuck." size="xl" />
      </motion.div>

      {/* Subhead */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mt-3 text-[15px] leading-snug"
        style={{ color: "var(--text-mute)" }}
      >
        Books drift. Podcasts fade. Chatbots forget. Kael stays.
      </motion.p>

      {/* Comparison grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28 }}
        className="mt-8 relative rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 14px",
        }}
      >
        {/* Kael column highlight (absolute, behind the grid) */}
        <span
          aria-hidden
          className="absolute pointer-events-none rounded-xl"
          style={{
            top: 8,
            bottom: 8,
            right: 8,
            width: 68,
            background:
              "linear-gradient(180deg, rgba(185,142,255,0.18) 0%, rgba(185,142,255,0.06) 100%)",
            border: `1px solid ${KAEL_PURPLE}55`,
            boxShadow: `0 0 28px rgba(185,142,255,0.22)`,
          }}
        />

        {/* Header row */}
        <div
          className="grid items-end gap-2 relative pb-3"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <div />
          <AltHeader Icon={Bot} label="Chatbots" />
          <AltHeader Icon={BookOpen} label="Books" />
          <div className="flex flex-col items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kael-logo.svg"
              alt=""
              aria-hidden
              style={{
                width: 26,
                height: 17,
                filter: `drop-shadow(0 0 8px ${KAEL_PURPLE}88)`,
              }}
            />
            <span
              className="text-[11px] font-semibold tracking-[0.01em]"
              style={{ color: "var(--text)" }}
            >
              Kael
            </span>
          </div>
        </div>

        {/* Data rows */}
        <div className="flex flex-col">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
              className="grid items-center gap-2 py-3 relative"
              style={{
                gridTemplateColumns: GRID_COLS,
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="text-[13.5px] leading-snug"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {row.label}
              </span>
              <div className="flex justify-center">
                <AltMark type={row.chatbots} />
              </div>
              <div className="flex justify-center">
                <AltMark type={row.books} />
              </div>
              <div className="flex justify-center">
                <Check
                  size={18}
                  strokeWidth={2.5}
                  color={KAEL_PURPLE}
                  style={{ filter: `drop-shadow(0 0 6px ${KAEL_PURPLE}80)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Screen>
  );
}
