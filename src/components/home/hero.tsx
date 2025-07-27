"use client";

import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Hero() {
  return (
    <div className="relative mt-3">
      {/* Aceternity Spotlight Background */}
      <Spotlight className="top-[-30%] left-1/2 -translate-x-1/2 opacity-80" fill="#2563eb" />
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[70vh] py-16 px-4 md:px-20 bg-background overflow-hidden z-10">
        {/* Left: Text Content */}
        <div className="relative z-10 flex flex-col items-start max-w-xl w-full text-left md:pr-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight drop-shadow-sm">
            LOLChat:{" "}
            <span className="text-primary">
              Where Every Message is a Punchline!
            </span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-7">
            Ready to{" "}
            <span className="text-primary font-semibold">chat</span> with your comedy crew,
            <span className="text-primary font-semibold"> call</span> your funniest friends, and
            <span className="text-primary font-semibold"> post</span> your wildest moments? <br />
            LOLChat is your stage—bring your best jokes, memes, and banter. <br />
            Because here, every conversation is a stand-up show!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#signup"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition text-base transform hover:-translate-y-1"
            >
              Start Laughing
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition text-base animate-pulse"
            >
              Discover the Vibes
            </a>
          </div>
        </div>
        {/* Right: Hero Illustration */}
        <div className="relative z-10 mb-10 md:mb-0 md:ml-16 flex-1 flex justify-center items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary bg-white dark:bg-neutral-900 transition-all duration-300 w-[360px] h-[320px] md:w-[440px] md:h-[400px] flex items-center justify-center">
            <Image
              src="/home/hero.jpg"
              alt="Comedian Chat Illustration"
              width={420}
              height={380}
              className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
          {/* Fun emoji overlay */}
          <div className="absolute -top-6 -left-6 text-4xl md:text-5xl animate-bounce select-none pointer-events-none">
            😂
          </div>
          <div className="absolute -bottom-6 -right-6 text-3xl md:text-4xl animate-pulse select-none pointer-events-none">
            🎤
          </div>
        </div>
        {/* Decorative gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-primary/20 blur-3xl opacity-60 dark:bg-primary/30"
        />
      </section>
    </div>
  );
}