"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const demos = [
	{
		title: "Chat Interface",
		desc: "Experience seamless, real-time conversations with your friends and groups.",
		img: "/home/demo-chat.jpg",
	},
	{
		title: "Video Calling",
		desc: "Crystal-clear video calls with a modern, intuitive interface.",
		img: "/home/demo-video.jpg",
	},
];

export default function DemoPreview() {
	return (
		<section className="relative py-24 px-4 md:px-20 bg-background overflow-hidden">
			<motion.h2
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, type: "spring" }}
				viewport={{ once: true }}
				className="text-center text-3xl md:text-5xl font-extrabold text-foreground mb-16"
			>
				<span className="text-primary">LOLChat Demo Preview</span>
			</motion.h2>
			<div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
				{demos.map((demo, idx) => (
					<motion.div
						key={demo.title}
						initial={{ opacity: 0, y: 60, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.8, delay: idx * 0.18, type: "spring" }}
						viewport={{ once: true }}
						className="group relative bg-gradient-to-br from-primary/10 to-blue-100/30 dark:from-primary/20 dark:to-blue-900/10 border-0 rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center w-full md:w-[440px] overflow-hidden"
					>
						{/* Floating glass effect */}
						<div className="absolute inset-0 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-[2px] z-0 pointer-events-none" />
						<div className="relative z-10 flex flex-col items-center w-full px-6 py-8">
							<div className="w-full flex justify-center mb-6">
								<Image
									src={demo.img}
									alt={demo.title}
									width={400}
									height={240}
									className="rounded-2xl shadow-xl object-cover border-2 border-primary/20 group-hover:scale-105 transition-transform duration-500"
								/>
							</div>
							<h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 text-center drop-shadow">
								{demo.title}
							</h3>
							<p className="text-muted-foreground text-center text-base md:text-lg mb-2">
								{demo.desc}
							</p>
						</div>
						{/* Accent border animation */}
						<motion.div
							className="absolute inset-0 rounded-3xl border-2 border-primary opacity-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none"
							initial={{ scale: 0.97, opacity: 0 }}
							whileHover={{ scale: 1.01, opacity: 0.6 }}
						/>
					</motion.div>
				))}
			</div>
			{/* Decorative blurred spot */}
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[520px] h-[180px] rounded-full bg-primary/20 blur-3xl opacity-60 dark:bg-primary/30"
			/>
		</section>
	);
}