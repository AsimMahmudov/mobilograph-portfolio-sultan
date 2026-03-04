"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiX, FiSend } from "react-icons/fi";
import { Counter } from "./Counter";

const services = [
  {
    id: "01",
    title: "Reels Production",
    price: 200,
    tags: ["Viral Concepts", "4K Filming", "Sound Design"],
  },
  {
    id: "02",
    title: "Full Content Day",
    price: 500,
    tags: ["Monthly Strategy", "8-12 Videos", "Props & Style"],
  },
  {
    id: "03",
    title: "Elite Editing",
    price: 50,
    tags: ["Cinematic Color", "Fast-cut Montage", "Subtitles"],
  },
];

const Services = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="pricing" className="bg-black py-32 px-6 md:px-12 text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-20 opacity-40 group cursor-default">
          <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em]">Investment & Value</span>
        </div>

        <div className="flex flex-col">
          {services.map((service) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => !isMobile && setHovered(service.id)}
              onMouseLeave={() => !isMobile && setHovered(null)}
              onClick={() => setSelectedService(service.title)}
              className={`relative border-b border-white/10 py-12 md:py-20 transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer
                ${!isMobile && hovered && hovered !== service.id ? "opacity-20 blur-[2px]" : "opacity-100 blur-0"}`}
            >
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-mono text-blue-500 text-sm md:text-base">{service.id}</span>
                <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter transition-transform duration-500 md:group-hover:translate-x-4 text-white">
                  {service.title.split(" ")[0]} <br className="md:hidden" />
                  <span className={`${isMobile ? 'text-white' : 'text-zinc-800 md:group-hover:text-white'} transition-colors duration-700`}>
                    {service.title.split(" ").slice(1).join(" ")}
                  </span>
                </h3>
              </div>

              <div className="mt-8 md:mt-0 flex flex-col md:items-end gap-6 md:text-right">
                <div className="flex flex-wrap md:justify-end gap-3">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-3 py-1 pt-[6px] rounded-full md:group-hover:border-blue-500/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center md:justify-end gap-6">
                  <div className="text-4xl md:text-6xl font-light tracking-tighter italic">
                    from <Counter value={service.price} prefix="$" className="font-black text-blue-500" duration={1.5} />
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center md:group-hover:bg-white md:group-hover:text-black transition-all duration-500 -rotate-45 md:group-hover:rotate-0">
                    <FiArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <BookingModal 
            serviceTitle={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Внутренний компонент модального окна ---
const BookingModal = ({ serviceTitle, onClose }: { serviceTitle: string; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const token = process.env.NEXT_PUBLIC_TG_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID;

    const text = `
<b>🔥 NEW BOOKING: ${serviceTitle.toUpperCase()}</b>
<b>Name:</b> ${formData.name}
<b>Phone:</b> ${formData.phone}
<b>Message:</b> ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(onClose, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
          <FiX size={24} />
        </button>

        <div className="mb-10">
          <span className="text-blue-500 font-mono text-[9px] uppercase tracking-[0.5em] mb-2 block">Booking Service</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">{serviceTitle}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative text-left">
              <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 block mb-1">Name</label>
              <input
                required type="text" value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all font-light text-lg"
                placeholder="Your Name"
              />
            </div>
            <div className="group relative text-left">
              <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 block mb-1">Phone</label>
              <input
                required type="tel" value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all font-light text-lg"
                placeholder="+7 "
              />
            </div>
          </div>

          <div className="group relative text-left">
            <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 block mb-1">Message</label>
            <textarea
              required rows={2} value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all font-light text-lg resize-none"
              placeholder="Any specific wishes?"
            />
          </div>

          <button 
            disabled={status === "sending"}
            className="relative overflow-hidden group w-full py-5 border border-white/10 hover:border-blue-500 transition-all duration-500"
          >
            <div className="relative z-10 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[10px]">
              {status === "sending" ? "Sending..." : status === "success" ? "Success!" : "Confirm Booking"}
              <FiSend />
            </div>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Services;