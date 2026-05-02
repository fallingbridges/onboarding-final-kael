"use client";

import { motion } from "framer-motion";
import Screen from "@/components/Screen";
import PrimaryCTA from "@/components/PrimaryCTA";
import { useFlow } from "@/lib/flow-store";

export default function Screen28FreeTrial() {
  const next = useFlow((s) => s.next);

  return (
    <Screen
      showBack={false}
      contentClassName="flex flex-col"
      cta={<PrimaryCTA label="Try for $0.00" onClick={next} hideArrow />}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="font-bold tracking-[-0.02em]"
          style={{
            fontSize: 30,
            lineHeight: 1.18,
            color: "var(--text)",
          }}
        >
          We offer
          <br />
          <span className="emph">7 days free</span>
          <br />
          so everyone can try
          <br />
          Kael.
        </motion.div>
      </div>
    </Screen>
  );
}
