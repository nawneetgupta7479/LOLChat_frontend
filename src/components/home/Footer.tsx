"use client";

import { Mail, Github, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-primary/10 via-blue-100/30 to-white dark:from-primary/20 dark:via-blue-900/10 dark:to-neutral-900 pt-0 pb-0 px-0 overflow-hidden">
      {/* Top wave SVG */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path
            fill="currentColor"
            d="M0,64L60,58.7C120,53,240,43,360,53.3C480,64,600,96,720,101.3C840,107,960,85,1080,74.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            className="text-primary/20 dark:text-primary/30"
          />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-4 md:px-0 pb-8">
        {/* Brand & Social */}
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-1/3">
          <span className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight drop-shadow-lg flex items-center gap-2">
            <span className="inline-block animate-bounce">😂</span> LOLChat
          </span>
          <span className="text-muted-foreground text-base md:text-lg text-center md:text-left font-medium">
            Where every message is a punchline.
          </span>
          <div className="flex gap-4 mt-1">
            <a href="https://github.com/" target="_blank" rel="noopener" className="hover:text-primary transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener" className="hover:text-primary transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener" className="hover:text-primary transition">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
        {/* Newsletter - enhanced and mobile-friendly */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary/10 via-blue-100/40 to-white dark:from-primary/20 dark:via-blue-900/20 dark:to-neutral-900 rounded-2xl shadow-2xl border-0 px-5 py-7 flex flex-col items-center gap-3 w-full max-w-md md:max-w-xl ring-1 ring-primary/10"
          onSubmit={e => {
            e.preventDefault();
            // Add your subscribe logic here
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Mail className="text-primary w-6 h-6" />
            <span className="text-lg font-bold text-primary tracking-tight">Subscribe for Updates</span>
          </div>
          <p className="text-muted-foreground text-center text-sm mb-2 font-medium">
            Get the latest jokes, updates, and features straight to your inbox!
          </p>
          <div className="flex w-full flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-white/80 dark:bg-blue-950/40 text-foreground focus:ring-2 focus:ring-primary outline-none transition text-base placeholder:text-primary shadow-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none hidden sm:block">
                <Mail className="w-5 h-5" />
              </span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-primary transition text-base whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <span className="text-xs text-muted-foreground mt-2 opacity-70">
            No spam. Unsubscribe anytime.
          </span>
          {/* Decorative sparkle */}
          <span className="absolute -top-6 -right-6 text-3xl md:text-4xl pointer-events-none select-none animate-pulse">✨</span>
        </motion.form>
      </div>
      {/* Bottom copyright */}
      <div className="w-full text-center text-xs md:text-sm text-muted-foreground py-4 border-t border-primary/10 mt-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
        © {new Date().getFullYear()} <span className="font-bold text-primary">LOLChat</span>. All rights reserved.
      </div>
      {/* Decorative blurred spot */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[380px] h-[100px] rounded-full bg-primary/20 blur-3xl opacity-60 dark:bg-primary/30 z-0"
      />
    </footer>
  );
}