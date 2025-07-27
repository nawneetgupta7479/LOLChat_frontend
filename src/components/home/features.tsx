"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
	{
		title: "Instant Chat",
		description:
			"Enjoy real-time messaging with your friends and groups. Fast, fun, and always in sync—never miss a punchline!",
	image: "/home/fet5.jpg",
		icon: "💬",
	},
	{
		title: "Video Calls",
		description:
			"Connect face-to-face with crystal-clear video and voice calls. Bring your comedy crew together, wherever they are!",
		image: "/home/fet2.jpg",
		icon: "📞",
	},
	{
		title: "Post Sharing / Social Feed",
		description:
			"Share your funniest moments, memes, and updates with the LOLChat community. Your stage for viral laughs!",
		image: "/home/fet1.jpg",
		icon: "📝",
	},
	{
		title: "Secure & Private",
		description:
			"Your chats, calls, and posts are protected with end-to-end encryption. LOLChat keeps your fun safe and private.",
		image: "/home/fet4.jpg",
		icon: "🔒",
	},
];

export default function Features() {
	return (
		<section className="px-4 py-16 bg-background text-foreground sm:px-6 md:px-10">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-10 text-3xl font-bold sm:mb-14 sm:text-4xl md:mb-16 md:text-5xl text-primary text-center">
					Why You'll Love LOLChat
				</h2>
				<p className="mb-12 max-w-3xl text-base text-muted-foreground sm:text-lg text-center mx-auto">
					All the tools you need for fun, connection, and privacy—packed into one
					modern chat app.
				</p>
				<div className="flex flex-col gap-16 sm:gap-20">
					{features.map((item, idx) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, delay: idx * 0.15 }}
							className={`flex flex-col items-center gap-8 ${
								idx % 2 === 1
									? "md:flex-row-reverse md:gap-10 lg:gap-16"
									: "md:flex-row md:gap-10 lg:gap-16"
							}`}
						>
							{/* Text */}
							<div className="w-full flex-1">
								<div className="mb-2 flex items-center">
									<span className="mr-2 text-2xl font-bold text-primary sm:text-3xl">
										{item.icon}
									</span>
									<span className="text-xl font-bold sm:text-2xl md:text-3xl text-foreground">
										{item.title}
									</span>
								</div>
								<p className="max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
									{item.description}
								</p>
							</div>
							{/* Image */}
							<div className="mt-6 flex w-full flex-1 justify-center md:mt-0">
								<Image
									src={item.image}
									alt={item.title}
									width={500}
									height={500}
									className="w-108 h-72 rounded-xl bg-white/5 object-cover shadow-lg sm:h-40 sm:w-[32.4rem] md:h-48 md:w-[36rem]"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
