"use client";

import { motion } from "framer-motion";
import { Brain, FlaskConical, Infinity as InfinityIcon, Repeat } from "lucide-react";
import { useState } from "react";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import { useFlow } from "@/lib/flow-store";

const FEATURES = [
  { text: "Unlimited conversations with Kael", Icon: InfinityIcon },
  { text: "Memory that connects your story over time", Icon: Brain },
  { text: "Spots the loops you keep repeating", Icon: Repeat },
  { text: "Gives you experiments and follows up", Icon: FlaskConical },
];

const GOLD = "#F5C247";

export default function Screen28Paywall() {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const name = useFlow((s) => s.name);
  const display = name?.trim() || "you";

  return (
    <motion.section
      key="screen"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative flex flex-col"
      style={{ minHeight: "100dvh" }}
    >
      <div className="px-6 pb-6 pt-12">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Headline text={`Let's make the commitment **real**, ${display}.`} size="xl" />
        </motion.div>

        {/* Features with golden icons */}
        <ul className="mt-8 flex flex-col gap-3">
          {FEATURES.map(({ text, Icon }, i) => (
            <motion.li
              key={text}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.32, delay: 0.18 + i * 0.07 }}
              className="flex gap-3 items-center"
            >
              <Icon
                size={20}
                strokeWidth={2}
                color={GOLD}
                style={{ filter: "drop-shadow(0 0 6px rgba(245, 194, 71, 0.4))" }}
                className="shrink-0"
              />
              <span className="text-[15.5px] leading-snug" style={{ color: "rgba(255,255,255,0.95)" }}>
                {text}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Pricing cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="mt-6 flex flex-col gap-2.5"
        >
          <PlanCard
            selected={plan === "yearly"}
            onClick={() => setPlan("yearly")}
            title="Yearly"
            price="$99/year"
            priceStrikeBelow="$179.88"
            subline="Billed annually"
            badge="SAVE 45%"
            badgeAccent="green"
          />
          <PlanCard
            selected={plan === "monthly"}
            onClick={() => setPlan("monthly")}
            title="Monthly"
            price="$14.99/month"
            subline="Billed monthly"
          />
        </motion.div>

        {/* Total Due Today */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.65 }}
          className="mt-6 text-center"
        >
          <h2
            className="font-bold tracking-[-0.02em]"
            style={{
              fontSize: 24,
              lineHeight: 1.1,
              color: "var(--text)",
              textShadow: "0 0 28px rgba(139, 92, 255, 0.25)",
            }}
          >
            Total Due Today: $0.00
          </h2>
          <p className="mt-1.5 text-[13px]" style={{ color: "var(--text-mute)" }}>
            Payment charged only after free trial.
          </p>
        </motion.div>

        {/* CTA + fine print + footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.78 }}
          className="mt-6 flex flex-col gap-2.5"
        >
          <PrimaryCTA label="Start 7-Day Free Trial" onClick={() => {/* purchase flow */}} />
          <p
            className="text-[11.5px] leading-snug text-center"
            style={{ color: "var(--text-faint)" }}
          >
            This subscription auto-renews at{" "}
            <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 500 }}>
              {plan === "yearly" ? "$99/year" : "$14.99/month"}
            </span>{" "}
            after the 7 days free trial.
          </p>
          <div className="flex justify-center gap-5 mt-1" style={{ paddingBottom: "calc(var(--safe-bottom) + 8px)" }}>
            <FootLink>Restore</FootLink>
            <FootLink>Terms</FootLink>
            <FootLink>Privacy</FootLink>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PlanCard({
  selected,
  onClick,
  title,
  price,
  priceStrikeBelow,
  subline,
  badge,
  badgeAccent = "purple",
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  price: string;
  priceStrikeBelow?: string;
  subline: string;
  badge?: string;
  badgeAccent?: "purple" | "green";
}) {
  const badgeBg =
    badgeAccent === "green"
      ? "linear-gradient(180deg, #4FD68C 0%, #2BA063 100%)"
      : "linear-gradient(180deg, #9B6DFF 0%, #7B47F2 100%)";
  const badgeShadow =
    badgeAccent === "green"
      ? "0 4px 10px -2px rgba(59, 209, 127, 0.55)"
      : "0 4px 10px -2px rgba(139,92,255,0.5)";
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
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[15.5px] font-semibold" style={{ color: "var(--text)" }}>
              {title}
            </div>
            <div className="text-[12.5px] mt-0.5" style={{ color: "var(--text-mute)" }}>
              {subline}
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0 leading-tight">
            <span className="text-[15px] font-semibold tabular-nums" style={{ color: "var(--text)" }}>
              {price}
            </span>
            {priceStrikeBelow && (
              <span
                className="text-[12.5px] tabular-nums mt-0.5"
                style={{
                  color: "rgba(255,255,255,0.42)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(255,255,255,0.55)",
                }}
              >
                {priceStrikeBelow}
              </span>
            )}
          </div>
        </div>
      </div>
      {badge && (
        <span
          className="absolute right-4 -top-2.5 rounded-full text-[10px] font-bold tracking-[0.08em] px-2 py-1"
          style={{
            background: badgeBg,
            color: "#FFFFFF",
            boxShadow: badgeShadow,
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
