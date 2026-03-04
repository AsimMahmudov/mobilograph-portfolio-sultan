"use client";
import {
	animate,
	useInView,
	useMotionValue,
	useTransform,
	motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
	value: number;
	suffix?: string;
	duration?: number;
}

export const Counter: React.FC<CounterProps> = ({
	value,
	suffix = "",
	duration = 2,
}) => {
	const ref = useRef<HTMLParagraphElement>(null);
	const isInView = useInView(ref, { once: true });
	const count = useMotionValue(0);

	const rounded = useTransform(
		count,
		(latest: number) => Math.round(latest).toLocaleString() + suffix
	);

	useEffect(() => {
		if (isInView) {
			const controls = animate(count, value, {
				duration: duration,
				ease: [0.16, 1, 0.3, 1],
			});
			return controls.stop;
		}
	}, [isInView, count, value, duration]);

	return (
		<motion.p
			ref={ref}
			className="text-white text-3xl md:text-4xl font-black italic tracking-tighter">
			{rounded}
		</motion.p>
	);
};
