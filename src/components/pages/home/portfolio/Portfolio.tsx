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
    title: "Kyrgyz Boxing",
    video: "/box.mp4",
    link: "https://www.instagram.com/reel/DSCnlsgjYq9/",
  },

  {
    id: 2,
    title: "Gangsta car",
    video: "/car.mp4",
    link: "https://www.instagram.com/reel/DUeBbI7CNsZ/",
  },
  {
    id: 3,
    title: "AI video",
    video: "/woman.mp4",
    link: "https://www.instagram.com/reel/DVZRJmUjmCL/",
  },

  {
    id: 4,
    title: "Sony Corporation",
    video: "/car2.mp4",
    link: "https://www.instagram.com/reel/DEu2B_VoufD/",
  },

  {
    id: 5,
    title: "rpfitness.rolando",
    video: "/v5.mp4",
    link: "https://www.instagram.com/reels/DP1EH5JCLFr/",
  },
];

const ProjectCard = ({ project, isActive, isMobile, onPlay, onClose }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        if (isMobile) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }
  }, [isActive, isMobile]);

  return (
    <div
      className={`group relative h-[55vh] md:h-[65vh] transition-all duration-700 ease-out flex-shrink-0 overflow-hidden rounded-sm bg-zinc-900 border border-white/5 
        ${isActive ? "w-[85vw] md:w-[35vw] z-50" : "w-[85vw] md:w-[35vw] z-10"}`}
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={project.video}
          loop
          playsInline
          autoPlay={!isMobile}
          preload={isMobile ? "metadata" : "auto"}
          muted={isMobile ? !isActive : true}
          className={`h-full w-full object-cover transition-all duration-1000 
            ${isActive ? "grayscale-0 scale-100" : "md:grayscale group-hover:grayscale-0 group-hover:scale-105"}`}
        />
      </div>

      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onPlay}
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent cursor-pointer z-10"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                <FiPlay fill="white" size={24} />
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl md:text-5xl text-white font-black uppercase italic tracking-tighter leading-tight">
                {project.title}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isActive && (
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-30 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
        >
          <FiX size={20} />
        </button>
      )}

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute top-6 right-6 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-500
          ${isActive ? "bg-[red] border-none" : "hover:bg-white hover:text-black"}`}
      >
        <FiArrowUpRight className="text-xl" />
      </a>
    </div>
  );
};

const Portfolio = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      id="portfolio"
      ref={targetRef}
      className={`relative bg-[#030303] ${isMobile ? "h-auto py-20" : "h-[400vh]"}`}
    >
      <div
        className={`${isMobile ? "relative" : "sticky top-0 h-screen flex flex-col justify-center"} overflow-hidden`}
      >
        {/* HEADER */}
        <div className="px-6 md:px-12 mb-8 flex justify-between items-end w-full max-w-7xl mx-auto lg:mx-0 z-20">
          <div className="relative">
            <span className="text-[red] font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
              Archive
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">
              Selected
            </h2>
          </div>
          <div className="hidden md:block text-right text-zinc-500 font-mono text-[9px] uppercase tracking-widest leading-loose">
            {playingId ? "Now Playing" : "Tap to play with sound"} /{" "}
            {projects.length}
          </div>
        </div>

        <div
          className={`${isMobile ? "overflow-x-auto overflow-y-hidden no-scrollbar" : ""}`}
        >
          <motion.div
            ref={scrollRef}
            style={{ x: isMobile ? 0 : x }}
            className="flex gap-4 md:gap-8 px-6 md:px-12 z-10 w-max"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isMobile={isMobile}
                isActive={playingId === project.id}
                onPlay={() => setPlayingId(project.id)}
                onClose={() => setPlayingId(null)}
              />
            ))}
            <div className={`${isMobile ? "w-6" : "w-[10vw]"} flex-shrink-0`} />
          </motion.div>
        </div>

        <div className="absolute md:bottom-[-30px] bottom-[20px] left-12 text-[15vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic leading-none z-0">
          Portfolio
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
