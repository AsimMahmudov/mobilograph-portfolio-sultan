"use client";

import { navbar } from "@/lib/navbar";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const panelVariants: Variants = {
		initial: {
			y: "-100%",
		},
		animate: (i: number) => ({
			y: "0%",
			transition: {
				duration: 0.8,
				delay: i * 0.1,
				ease: [0.65, 0, 0.35, 1],
			},
		}),
		exit: (i: number) => ({
			y: "-100%",
			transition: {
				duration: 0.8,
				delay: i * 0.05,
				ease: [0.65, 0, 0.35, 1],
			},
		}),
	};

	return (
		<>
			<header className="fixed top-0 left-0 w-full z-[200] p-6 md:p-6 flex justify-end items-center pointer-events-none">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="pointer-events-auto group relative w-16 h-16 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
					<motion.div
						className="relative z-10 space-y-1.5"
						animate={isOpen ? { rotate: 90 } : { rotate: 0 }}>
						<span
							className={`block w-6 h-[2px] bg-white transition-transform duration-500 ${
								isOpen ? "rotate-45 translate-y-[4px]" : ""
							}`}
						/>
						<span
							className={`block w-6 h-[2px] bg-white transition-transform duration-500 ${
								isOpen ? "-rotate-45 -translate-y-[4px]" : ""
							}`}
						/>
					</motion.div>
					<div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
				</button>
			</header>

			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-[150] pointer-events-none">
						{[0, 1, 2].map((i) => (
							<motion.div
								key={i}
								custom={i}
								variants={panelVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="absolute top-0 h-full bg-black border-r border-white/5 shadow-2xl"
								style={{
									left: `${(100 / 3) * i}%`,
									width: `${103 / 3}%`,
									zIndex: 150 + i,
								}}
							/>
						))}

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 0.4 }}
							className="absolute inset-0 z-[180] pointer-events-auto flex flex-col justify-center px-8 md:px-24">
							<nav className="space-y-4 md:space-y-6">
								{navbar.map((item, i) => (
									<motion.div
										key={item.id}
										initial={{ x: -100, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.5 + i * 0.1,
											duration: 0.8,
											ease: "easeOut",
										}}>
										<a
											href={item.href}
											onClick={() => setIsOpen(false)}
											className="group flex items-baseline gap-6 text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none transition-all hover:pl-8">
											<span className="text-sm md:text-xl font-mono text-blue-500 not-italic">
												0 {i + 1} .
											</span>
											<span className="text-white group-hover:text-blue-500 transition-colors">
												{item.name}
											</span>
										</a>
									</motion.div>
								))}
							</nav>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;
