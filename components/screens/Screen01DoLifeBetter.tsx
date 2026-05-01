"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  RefreshCw,
  HelpCircle,
  EyeOff,
  Zap,
  Hourglass,
  HeartHandshake,
  Target,
  Brain,
  Sparkles,
  CheckCircle2,
  Compass,
  Anchor,
  Heart,
  TrendingUp,
  Shield,
  Hand,
  type LucideIcon,
} from "lucide-react";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import Headline from "@/components/Headline";
import KaelLogo from "@/components/KaelLogo";
import { useFlow } from "@/lib/flow-store";

interface Tile {
  label: string;
  Icon: LucideIcon;
  /** For aspirational tiles only. Problem tiles share the muted palette. */
  from?: string;
  to?: string;
}

const PROBLEMS: Tile[] = [
  { label: "Overthinking", Icon: Brain },
  { label: "Stuck loops", Icon: RefreshCw },
  { label: "Self-doubt", Icon: HelpCircle },
  { label: "Avoidance", Icon: EyeOff },
  { label: "Reactivity", Icon: Zap },
  { label: "Procrastination", Icon: Hourglass },
  { label: "People-pleasing", Icon: HeartHandshake },
  { label: "Perfectionism", Icon: Target },
];

const ASPIRATIONS: Tile[] = [
  { label: "Real momentum", Icon: TrendingUp, from: "#E04877", to: "#A02E5A" },
  { label: "Honesty with yourself", Icon: Heart, from: "#E97A3A", to: "#C25A26" },
  { label: "Steadiness", Icon: Anchor, from: "#5B7BD9", to: "#3F5BB5" },
  { label: "Clarity", Icon: Sparkles, from: "#3FA3C5", to: "#1F7B9C" },
  { label: "Self-trust", Icon: Compass, from: "#A26AE8", to: "#6B3FB5" },
  { label: "Follow-through", Icon: CheckCircle2, from: "#3BA77E", to: "#1F7A58" },
  { label: "Boundaries that hold", Icon: Shield, from: "#D8A246", to: "#A87826" },
  { label: "Doing the thing", Icon: Hand, from: "#E5B043", to: "#A87826" },
];

export default function Screen01DoLifeBetter() {
  const next = useFlow((s) => s.next);

  return (
    <Screen
      showBack={false}
      showLogo
      showSettings
      cta={<PrimaryCTA label="Find your path forward" onClick={next} />}
      contentClassName="flex flex-col"
    >
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        className="mt-2"
      >
        <Headline text="Welcome to **Kael**." size="2xl" className="tracking-[-0.025em] text-center" />
      </motion.div>

      {/* Subhead */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        className="mt-4 text-[16px] leading-[1.45] text-center"
        style={{ color: "var(--text-mute)" }}
      >
        A coach that helps you get unstuck in life.
      </motion.p>

      {/* Carousel area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="relative flex-1 mt-7 mx-[-24px] px-[14px]"
        style={{ minHeight: 380 }}
      >
        {/* arc/horizon line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-2"
          style={{
            height: 100,
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(139,92,255,0.16), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative grid grid-cols-2 gap-3" style={{ height: 460 }}>
          <CarouselColumn tiles={PROBLEMS} direction="up" align="right" />
          <CarouselColumn tiles={ASPIRATIONS} direction="down" align="left" />

          {/* Centered transformation arrow between columns */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 44,
                height: 44,
                background: "rgba(20, 12, 36, 0.92)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 6px 20px -4px rgba(0,0,0,0.55), 0 0 24px rgba(139,92,255,0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ArrowRight size={18} strokeWidth={2.25} color="#FFFFFF" />
            </div>
          </div>
        </div>

        {/* top/bottom fade masks */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: 60,
            background: "linear-gradient(180deg, rgba(14,8,32,1) 0%, rgba(14,8,32,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: 80,
            background: "linear-gradient(0deg, rgba(14,8,32,1) 0%, rgba(14,8,32,0) 100%)",
          }}
        />
      </motion.div>
    </Screen>
  );
}

function CarouselColumn({
  tiles,
  direction,
  align,
}: {
  tiles: Tile[];
  direction: "up" | "down";
  align: "left" | "right";
}) {
  // Duplicate the list so the wrap is invisible.
  const doubled = [...tiles, ...tiles];

  return (
    <div className="relative overflow-hidden" style={{ height: "100%" }}>
      <motion.div
        className="flex flex-col gap-3"
        style={{
          // Slight horizontal nudge so the column edges sit closer to the center than the screen
          paddingLeft: align === "left" ? 6 : 0,
          paddingRight: align === "right" ? 6 : 0,
        }}
        initial={{ y: direction === "up" ? "0%" : "-50%" }}
        animate={{ y: direction === "up" ? "-50%" : "0%" }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <Tile key={i} tile={t} aspirational={!!t.from} />
        ))}
      </motion.div>
    </div>
  );
}

function Tile({ tile, aspirational }: { tile: Tile; aspirational: boolean }) {
  const { Icon, label } = tile;
  const tileBg = aspirational
    ? `linear-gradient(160deg, ${tile.from}, ${tile.to})`
    : "rgba(255,255,255,0.035)";
  const tileBorder = aspirational ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)";
  const labelColor = aspirational ? "#FFFFFF" : "rgba(255,255,255,0.5)";
  const iconBg = aspirational ? "rgba(255,255,255,0.18)" : "rgba(217, 67, 78, 0.15)";
  const iconColor = aspirational ? "#FFFFFF" : "rgba(255, 180, 180, 0.85)";

  return (
    <div
      className="rounded-[20px] flex flex-col items-center justify-center gap-2"
      style={{
        background: tileBg,
        border: `1px solid ${tileBorder}`,
        height: 134,
        padding: "16px 12px",
        boxShadow: aspirational ? "0 12px 24px -10px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{
          width: 42,
          height: 42,
          background: iconBg,
          border: aspirational ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(217,67,78,0.25)",
        }}
      >
        <Icon size={18} strokeWidth={1.85} color={iconColor} />
      </span>
      <span
        className="text-[13px] font-medium text-center leading-tight"
        style={{ color: labelColor, maxWidth: 120 }}
      >
        {label}
      </span>
    </div>
  );
}
