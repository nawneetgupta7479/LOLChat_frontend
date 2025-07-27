"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, MessageCircle } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const steps = [
	{
		icon: <UserPlus className="text-primary w-10 h-10 mb-2" />,
		title: "Sign Up",
		desc: "Create your LOLChat account in seconds. It’s quick, easy, and totally free!",
		img: "/home/how2.jpg",
	},
	{
		icon: <Users className="text-primary w-10 h-10 mb-2" />,
		title: "Add Friends",
		desc: "Find your friends or invite new ones. Building your comedy crew is just a click away.",
		img: "/home/how3.jpg",
	},
	{
		icon: <MessageCircle className="text-primary w-10 h-10 mb-2" />,
		title: "Start Chatting or Calling",
		desc: "Jump into real-time chats or calls. Share laughs, memes, and moments instantly!",
		img: "/home/calling.jpg",
	},
];

const container = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.22,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 60, scale: 0.95 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 120, damping: 16 },
	},
};

export default function HowItWorks() {
	return (
		<section className="relative py-24 px-4 md:px-20 bg-background overflow-hidden">
			<motion.h2
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, type: "spring" }}
				viewport={{ once: true }}
				className="text-center text-3xl md:text-5xl font-extrabold text-foreground mb-16"
			>
				<span className="text-primary">Getting Started is Easy!</span>
			</motion.h2>
			<motion.div
				className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.3 }}
			>
				{steps.map((step, idx) => (
					<motion.div
						key={step.title}
						variants={item}
						className="flex justify-center"
					>
						<CardContainer containerClassName="">
							<CardBody className="relative bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
								{/* Step number badge */}
								<span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm font-bold shadow-lg border-2 border-white dark:border-neutral-900 z-10">
									{idx + 1}
								</span>
								<CardItem translateZ={40} className="flex flex-col items-center mb-4">
									{step.icon}
									<span className="mt-1 text-lg md:text-xl font-bold text-primary text-center">
										{step.title}
									</span>
								</CardItem>
								<CardItem
									as="p"
									translateZ={60}
									className="text-muted-foreground text-center text-base md:text-lg mb-4"
								>
									{step.desc}
								</CardItem>
								<CardItem translateZ={80} className="w-full mt-2 mb-0">
									<img
										src={step.img}
										alt={step.title}
										width={240}
										height={120}
										className="h-32 w-full object-cover rounded-xl shadow-lg border border-primary/20"
									/>
								</CardItem>
							</CardBody>
						</CardContainer>
					</motion.div>
				))}
			</motion.div>
			{/* Decorative blurred spot */}
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[480px] h-[180px] rounded-full bg-primary/20 blur-3xl opacity-60 dark:bg-primary/30"
			/>
		</section>
	);
}