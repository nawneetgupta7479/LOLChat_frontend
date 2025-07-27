"use client";

import { motion } from "framer-motion";
import { PartyPopper, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="relative py-28 px-4 md:px-0 bg-gradient-to-br from-primary/10 via-blue-100/30 to-white dark:from-primary/20 dark:via-blue-900/10 dark:to-neutral-900 flex items-center justify-center overflow-hidden">
      {/* Decorative floating icons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1, delay: 0.2, type: "spring" }}
        viewport={{ once: true }}
        className="absolute left-10 top-10 text-5xl md:text-7xl select-none pointer-events-none z-10"
      >
        <PartyPopper className="text-primary drop-shadow-xl" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.8 }}
        whileInView={{ opacity: 0.5, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, type: "spring" }}
        viewport={{ once: true }}
        className="absolute right-10 bottom-10 text-4xl md:text-6xl select-none pointer-events-none z-10"
      >
        <Sparkles className="text-blue-400 drop-shadow-xl" />
      </motion.div>
      {/* Main CTA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-primary/10 dark:bg-primary/20 rounded-[2.5rem] shadow-2xl border-0 p-10 md:p-14 flex flex-col items-center text-center relative z-20 backdrop-blur-xl ring-2 ring-primary/10"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -8 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-blue-200/40 p-7 shadow-2xl border-2 border-primary/20 animate-pulse">
            <PartyPopper className="text-primary w-14 h-14" />
          </span>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 drop-shadow-lg tracking-tight">
          Ready to LOL?{" "}
          <span className="inline-block align-middle animate-bounce">😂</span>
        </h2>
        <p className="text-muted-foreground mb-8 text-base md:text-lg font-medium">
          Join{" "}
          <span className="text-primary font-bold">LOLChat</span> now and unlock a
          world of fun, friends, and endless comedy.
          <br />
          <span className="text-primary font-semibold">
            Sign up free and start chatting today!
          </span>
        </p>
        <motion.a
          href="#signup"
          whileHover={{
            scale: 1.08,
            y: -8,
            boxShadow: "0 12px 40px 0 rgba(37,99,235,0.18)",
          }}
          className="inline-block px-12 py-5 rounded-2xl bg-gradient-to-r from-primary to-blue-500 text-white font-extrabold shadow-xl hover:from-blue-600 hover:to-primary transition text-base md:text-lg tracking-wide border-2 border-primary/30"
        >
          Get Started For Free
        </motion.a>
      </motion.div>
      {/* Decorative blurred spot */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[520px] h-[160px] rounded-full bg-primary/20 blur-3xl opacity-60 dark:bg-primary/30 z-0"
      />
    </section>
  );
}