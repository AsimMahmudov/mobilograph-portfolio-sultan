"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Counter } from "./Counter"; // Путь к вашему компоненту

const services = [
  {
    id: "01",
    title: "Reels Production",
    price: 200, // Изменили на число
    tags: ["Viral Concepts", "4K Filming", "Sound Design"],
  },
  {
    id: "02",
    title: "Full Content Day",
    price: 500, // Изменили на число
    tags: ["Monthly Strategy", "8-12 Videos", "Props & Style"],
  },
  {
    id: "03",
    title: "Elite Editing",
    price: 50, // Изменили на число
    tags: ["Cinematic Color", "Fast-cut Montage", "Subtitles"],
  },
];

const Services = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="bg-black py-32 px-6 md:px-12 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-20 opacity-40 group cursor-default">
          <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em]">
            Investment & Value
          </span>
        </div>

        <div className="flex flex-col">
          {services.map((service) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative border-b border-white/10 py-12 md:py-20 transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between group
                ${
                  hovered && hovered !== service.id
                    ? "opacity-20 blur-[2px]"
                    : "opacity-100 blur-0"
                }
              `}>
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-mono text-blue-500 text-sm md:text-base">
                  {service.id}
                </span>
                <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                  {service.title.split(" ")[0]} <br className="md:hidden" />
                  <span className="text-zinc-800 group-hover:text-white transition-colors duration-700">
                    {service.title.split(" ")[1]}
                  </span>
                </h3>
              </div>

              <div className="mt-8 md:mt-0 flex flex-col md:items-end gap-6 md:text-right">
                <div className="flex flex-wrap md:justify-end gap-3">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-3 py-1 pt-[6px] rounded-full group-hover:border-blue-500/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center md:justify-end gap-6">
                  <div className="text-4xl md:text-6xl font-light tracking-tighter italic">
                    from{" "}
                    <Counter 
                      value={service.price} 
                      prefix="$" 
                      className="font-black text-blue-500"
                      duration={1.5}
                    />
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 -rotate-45 group-hover:rotate-0">
                    <FiArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;