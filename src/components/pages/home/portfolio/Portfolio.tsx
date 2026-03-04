"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";

const projects = [
	{
		id: 1,
		title: "Night City",
		cat: "Lifestyle",
		img: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1000",
	},
	{
		id: 2,
		title: "Vogue Edit",
		cat: "Fashion",
		img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
	},
	{
		id: 3,
		title: "Cyber Punk",
		cat: "Creative",
		img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
	},
	{
		id: 4,
		title: "Night City",
		cat: "Lifestyle",
		img: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1000",
	},
	{
		id: 5,
		title: "Vogue Edit",
		cat: "Fashion",
		img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
	},
	{
		id: 6,
		title: "Cyber Punk",
		cat: "Creative",
		img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
	},
	{
		id: 7,
		title: "Night City",
		cat: "Lifestyle",
		img: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1000",
	},
	{
		id: 8,
		title: "Vogue Edit",
		cat: "Fashion",
		img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
	},
	{
		id: 9,
		title: "Cyber Punk",
		cat: "Creative",
		img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
	},
];

const Portfolio = () => {
	const targetRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollRange, setScrollRange] = useState(0);

	// Считаем реальную ширину всей ленты при загрузке
	useEffect(() => {
		if (scrollRef.current) {
			// Ширина всей ленты минус ширина экрана = расстояние, которое нужно проехать
			setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
		}
	}, []);

	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	// Теперь x двигается ровно на ширину ленты: от 0 до -scrollRange
	const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

	return (
		<section ref={targetRef} className="relative h-[400vh] bg-[#030303]">
			<div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
				{/* HEADER */}
				<div className="px-6 md:px-12 mb-8 flex justify-between items-end w-full max-w-7xl mx-auto lg:mx-0">
					<div className="relative">
						<span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
							Archive
						</span>
						<h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
							Selected
						</h2>
					</div>
					<div className="hidden md:block text-right">
						<p className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest leading-loose">
							Scroll down to explore <br /> / {projects.length} case studies
						</p>
					</div>
				</div>

				{/* ГОРИЗОНТАЛЬНАЯ ЛЕНТА */}
				<motion.div
					ref={scrollRef}
					style={{ x }}
					className="flex gap-4 md:gap-8 px-6 md:px-12">
					{projects.map((project) => (
						<div
							key={project.id}
							className="group relative h-[55vh] md:h-[60vh] w-[85vw] md:w-[35vw] flex-shrink-0 overflow-hidden rounded-sm bg-zinc-900 border border-white/5">
							{/* IMAGE */}
							<img
								src={project.img}
								alt={project.title}
								className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
							/>

							{/* CONTENT OVERLAY */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

							<div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
								<div className="flex items-center gap-2 mb-3">
									<div className="w-4 h-[1px] bg-blue-500" />
									<span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">
										{project.cat}
									</span>
								</div>
								<h3 className="text-3xl md:text-5xl text-white font-black uppercase italic tracking-tighter mb-6">
									{project.title}
								</h3>

								<div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
									<span>View Details</span>
									<FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
								</div>
							</div>

							{/* FLOATING ICON */}
							<div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity">
								<div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center">
									<FiPlus className="text-xl" />
								</div>
							</div>
						</div>
					))}

					{/* Дополнительный отступ в конце, чтобы последняя карточка не прилипала к краю */}
					<div className="w-[10vw] flex-shrink-0" />
				</motion.div>

				{/* BACKGROUND DECOR */}
				<div className="absolute md:bottom-[-30px] bottom-[100px] left-12 text-[15vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic leading-none">
					Portfolio
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
