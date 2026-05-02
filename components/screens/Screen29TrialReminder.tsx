"use client";

import { motion } from "framer-motion";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import { useFlow } from "@/lib/flow-store";

export default function Screen29TrialReminder() {
  const next = useFlow((s) => s.next);

  return (
    <Screen
      showBack={false}
      contentClassName="flex flex-col"
      cta={<PrimaryCTA label="Continue for FREE" onClick={next} hideArrow />}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="font-bold tracking-[-0.02em]"
          style={{ fontSize: 28, lineHeight: 1.18, color: "var(--text)" }}
        >
          We&apos;ll remind you
          <br />
          <span className="emph">2 days</span> before your
          <br />
          trial ends.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [-8, -2, -8],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3, ease: "easeOut" },
            rotate: {
              duration: 1.4,
              delay: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="mt-12"
          style={{
            transformOrigin: "70% 18%",
            filter: "drop-shadow(0 22px 36px rgba(0,0,0,0.55))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bell.png"
            alt="Bell with notification"
            style={{ width: 200, height: "auto" }}
          />
        </motion.div>
      </div>
    </Screen>
  );
}
