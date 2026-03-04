"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import ava from "@/assets/images/sultan_new.jpg";
import Link from "next/link";
import { INSTAGRAM_LINK } from "@/constants/admin";

const skills = [
	{
		num: "01",
		title: "Visual Mastery",
		desc: "Using flagship mobile sensors to create depth that rivals traditional cinema cameras.",
	},
	{
		num: "02",
		title: "Viral Dynamics",
		desc: "Editing techniques focused on high retention and psychological triggers for engagement.",
	},
	{
		num: "03",
		title: "Sound Design",
		desc: "Immersive audio layers that make the viewer feel every frame of the story.",
	},
];

const SkillItem = ({
	item,
	index,
}: {
	item: (typeof skills)[0];
	index: number;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			className="group flex gap-8 md:gap-12 items-start relative">
			<div className="relative flex-shrink-0 mt-1">
				<span className="relative z-10 font-mono text-[red] text-xs flex items-center justify-center w-10 h-10 transition-colors duration-500 group-hover:text-white">
					{item.num}
				</span>

				<svg className="absolute top-0 left-0 w-10 h-10 -rotate-90">
					<circle
						cx="20"
						cy="20"
						r="18"
						stroke="currentColor"
						strokeWidth="1"
						fill="transparent"
						className="text-white/10"
					/>
					<motion.circle
						cx="20"
						cy="20"
						r="18"
						stroke="currentColor"
						strokeWidth="2"
						fill="transparent"
						className="text-[red]"
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					/>
				</svg>

				{index !== skills.length - 1 && (
					<div className="absolute top-10 left-[19px] w-[1px] h-40 bg-gradient-to-b from-red-500/30 to-transparent" />
				)}
			</div>

			<div className="pb-32">
				{" "}
				<motion.h4
					className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 transition-colors duration-500"
					whileInView={{ color: "red" }}
					viewport={{ once: false, margin: "-30% 0px -30% 0px" }}>
					{item.title}
				</motion.h4>
				<p className="text-zinc-500 max-w-sm text-base md:text-lg font-light leading-relaxed">
					{item.desc}
				</p>
			</div>
		</motion.div>
	);
};

const About = () => {
	const sectionRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

	return (
		<section
			ref={sectionRef}
			id="about"
			className="bg-black py-24 md:py-40 px-6 md:px-12 text-white relative">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
					<div className="lg:col-span-5 md:sticky relative md:top-24 top-0">
						<motion.div
							/* Заменил grayscale на md:grayscale */
							className="relative aspect-[3/4] overflow-hidden rounded-sm md:grayscale hover:grayscale-0 transition-all duration-1000 group shadow-2xl">
							<Image
								src={ava}
								alt="Director Portrait"
								fill
								priority
								className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
							/>

							<div className="absolute bottom-0 right-0 bg-[red] p-6 md:p-6 z-20">
								<p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1 text-red-200 opacity-70">
									Equipment
								</p>
								<h4 className="text-lg md:text-xl font-black uppercase italic leading-none text-white">
									SONY A7 M4 (full frame) <br /> IPHONE 17 PRO
								</h4>
							</div>
						</motion.div>
					</div>

					<div className="lg:col-span-7 space-y-22">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}>
							<h2 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tighter mb-12">
								Elevating <br />
								<span className="text-white hover:text-white transition-colors duration-500">
									Digital
								</span>{" "}
								<br />
								Aesthetics.
							</h2>

							<p className="max-w-xl text-zinc-400 text-xl md:text-3xl font-light leading-snug">
								I bridge the gap between{" "}
								<span className="text-white italic font-medium">
									cinema quality
								</span>{" "}
								and social media speed.
							</p>
						</motion.div>

						<div className="pt-32">
							{skills.map((item, i) => (
								<SkillItem key={i} item={item} index={i} />
							))}
						</div>
						<Link href={INSTAGRAM_LINK} target={"_blank"}>
							<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
								<div className="flex items-center gap-6 group cursor-pointer">
									<div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[red] group-hover:border-[red] transition-all duration-500">
										<FiArrowUpRight size={28} />
									</div>
									<span className="text-xl font-black uppercase tracking-widest italic">
										View Full Showreel
									</span>
								</div>
							</motion.div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
