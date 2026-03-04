"use client";

import React, { useState, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	useSpring,
	useMotionValue,
} from "framer-motion";
import { FiArrowUpRight, FiInstagram } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { Counter } from "./Counter";
import Link from "next/link";
import { INSTAGRAM_LINK } from "@/constants/admin";
import { PAGE } from "@/config/pages/public-page.config";

const content = [
	{ text: "Aesthetic", video: "/video.mp4", label: "Visual Identity" },
	{ text: "Motion", video: "/video2.mp4", label: "Dynamic Edit" },
	{ text: "Impact", video: "/video3.mp4", label: "Business Growth" },
];

const Hero = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		if (isHovering) return;
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % content.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [isHovering]);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const handleMouseMove = (e: React.MouseEvent) => {
		mouseX.set(e.clientX);
		mouseY.set(e.clientY);
	};

	return (
		<section
			onMouseMove={handleMouseMove}
			className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col justify-between p-6 md:p-12 text-white">
			<div className="absolute inset-0 z-0">
				<AnimatePresence mode="wait">
					<motion.video
						key={activeIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.35 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1.2 }}
						autoPlay
						muted
						loop
						playsInline
						className="h-full w-full object-cover">
						<source src={content[activeIndex].video} type="video/mp4" />
					</motion.video>
				</AnimatePresence>
				<div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
			</div>

			<div className="relative z-10 flex justify-between items-start">
				<div className="font-black text-2xl tracking-tighter uppercase italic">
					Directed <span className="text-blue-500">Suli</span>
				</div>
			</div>

			<div className="relative z-10">
				<h1 className="flex flex-col select-none">
					{content.map((item, index) => {
						const isActive = index === activeIndex;
						return (
							<motion.span
								key={index}
								onMouseEnter={() => {
									setActiveIndex(index);
									setIsHovering(true);
								}}
								onMouseLeave={() => setIsHovering(false)}
								className="relative w-fit group"
								animate={{ x: isActive ? 20 : 0 }}
								transition={{ duration: 0.5 }}>
								<span
									className={`text-[12vw] font-black uppercase leading-[0.8] tracking-tighter transition-all duration-1000 ${
										isActive ? "text-white" : "text-transparent"
									}`}
									style={{
										WebkitTextStroke: isActive
											? "1px white"
											: "1px rgba(255,255,255,0.1)",
										textShadow: isActive
											? "0 0 40px rgba(59,130,246,0.3)"
											: "none",
									}}>
									{item.text}
								</span>

								{isActive && (
									<motion.div
										layoutId="underline"
										className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
									/>
								)}
							</motion.span>
						);
					})}
				</h1>
			</div>

			<div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
				<div className="flex gap-12 border-l border-white/10 pl-8">
					<div>
						<Counter value={200} suffix="k +" />
						<p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-none">
							Global Reach
						</p>
					</div>
					<div>
						<Counter value={4} suffix="K" />
						<p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-none">
							Mobile Mastery
						</p>
					</div>
				</div>

				<div className="flex gap-4">
					<Link href={PAGE.CONTACT}>
						<button className="group relative bg-white text-black md:px-12 px-8 py-6 rounded-full font-black uppercase text-[11px] tracking-[0.2em] overflow-hidden transition-transform active:scale-95 shadow-2xl">
							<span className="relative z-10 flex items-center gap-3">
								<HiOutlineVideoCamera size={18} />
								Let's Shoot
								<FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
							</span>
							<motion.div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
						</button>
					</Link>

					<Link href={INSTAGRAM_LINK} target={"_blank"}>
						<button className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md">
							<FiInstagram size={24} />
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Hero;
