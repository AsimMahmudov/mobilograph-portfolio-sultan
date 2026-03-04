"use client";

import React, { useRef, useEffect, useState } from "react";
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import { FiArrowUpRight, FiPlay, FiX } from "react-icons/fi";

const projects = [
	{
		id: 1,
		title: "Kyrgyz Boxing 🥊",
		video: "/video.mp4",
		cat: "Motion Design",
		link: "https://www.instagram.com/reel/DSCnlsgjYq9/",
	},
	{
		id: 2,
		title: "Kyrgyz Boxing 🥊",
		video: "/video2.mp4",
		cat: "Motion Design",
		link: "https://www.instagram.com/reel/DSCnlsgjYq9/",
	},
	{
		id: 3,
		title: "Kyrgyz Boxing 🥊",
		video: "/video3.mp4",
		cat: "Motion Design",
		link: "https://www.instagram.com/reel/DSCnlsgjYq9/",
	},
];

const Portfolio = () => {
	const targetRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollRange, setScrollRange] = useState(0);
	const [playingId, setPlayingId] = useState<number | null>(null);

	useEffect(() => {
		const updateScrollRange = () => {
			if (scrollRef.current) {
				setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
			}
		};
		updateScrollRange();
		window.addEventListener("resize", updateScrollRange);
		return () => window.removeEventListener("resize", updateScrollRange);
	}, []);

	const { scrollYProgress } = useScroll({ target: targetRef });
	const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

	return (
		<section id="portfolio" ref={targetRef} className="relative h-[400vh] bg-[#030303]">
			<div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
			 
				<div className="px-6 md:px-12 mb-8 flex justify-between items-end w-full max-w-7xl mx-auto lg:mx-0 z-20">
					<div className="relative">
						<span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
							Archive
						</span>
						<h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
							Selected
						</h2>
					</div>
					<div className="hidden md:block text-right text-zinc-500 font-mono text-[9px] uppercase tracking-widest leading-loose">
						{playingId ? "Now Playing" : "Tap to play with sound"} /{" "}
						{projects.length}
					</div>
				</div>

			 
				<motion.div
					ref={scrollRef}
					style={{ x }}
					className="flex gap-4 md:gap-8 px-6 md:px-12 z-10">
					{projects.map((project) => {
						const isActive = playingId === project.id;

						return (
							<div
								key={project.id}
								className={`group relative h-[60vh] md:h-[65vh] transition-all duration-700 ease-out flex-shrink-0 overflow-hidden rounded-sm bg-zinc-900 border border-white/5 
                  ${
										isActive
											? "w-[85vw] md:w-[35vw] z-10"
											: "w-[85vw] md:w-[35vw] z-10"
									}`}>
							 
								<div className="absolute inset-0">
									<video
										src={project.video}
										autoPlay
										loop
										playsInline
										muted={!isActive}  
										controls={isActive}  
										className={`h-full w-full object-cover transition-all duration-1000 
                      ${
												isActive
													? "grayscale-0 scale-100"
													: "grayscale group-hover:grayscale-0 group-hover:scale-105"
											}`}
									/>
								</div>
 
								<AnimatePresence>
									{!isActive && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											onClick={() => setPlayingId(project.id)}
											className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent cursor-pointer z-10">
											 
											<div className="absolute inset-0 flex items-center justify-center">
												<div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
													<FiPlay fill="white" size={24} />
												</div>
											</div>
 
											<div className="absolute bottom-8 left-8 right-8">
												<div className="flex items-center gap-2 mb-3">
													<div className="w-4 h-[1px] bg-blue-500" />
													<span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">
														{project.cat}
													</span>
												</div>
												<h3 className="text-3xl md:text-5xl text-white font-black uppercase italic tracking-tighter">
													{project.title}
												</h3>
											</div>
										</motion.div>
									)}
								</AnimatePresence>

							 
								{isActive && (
									<button
										onClick={() => setPlayingId(null)}
										className="absolute top-6 left-6 z-30 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
										<FiX size={20} />
									</button>
								)}

								 
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className={`absolute top-6 right-6 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-500
                    ${
											isActive
												? "bg-blue-600 border-none"
												: "hover:bg-white hover:text-black"
										}`}>
									<FiArrowUpRight className="text-xl" />
								</a>
							</div>
						);
					})}
					<div className="w-[10vw] flex-shrink-0" />
				</motion.div>

				 
				<div className="absolute md:bottom-[-30px] bottom-[100px] left-12 text-[15vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic leading-none z-0">
					Portfolio
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
