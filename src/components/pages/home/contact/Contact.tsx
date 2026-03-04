'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiSend, FiInstagram, FiMessageCircle } from 'react-icons/fi';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="bg-black py-32 px-6 md:px-12 text-white relative overflow-hidden border-t border-white/5">
      
      {/* BACKGROUND DECOR - Огромный текст на фоне */}
      <div className="absolute -bottom-10 left-0 text-[20vw] font-black uppercase italic text-white/[0.02] leading-none select-none pointer-events-none">
        Connect
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* LEFT: THE HOOK */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Available for booking</span>
              <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
                Let's make <br />
                <span className="text-zinc-800 hover:text-white transition-colors duration-700">Impact.</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-light max-w-sm leading-relaxed">
                Ready to elevate your visual identity? <br /> Drop a message or find me on socials.
              </p>
            </motion.div>

            {/* DIRECT LINKS */}
            <div className="space-y-8">
              <a href="mailto:hello@suli.com" className="group flex flex-col gap-1">
                <span className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Email me</span>
                <span className="text-2xl md:text-4xl font-black italic group-hover:text-blue-500 transition-colors">hello@yourname.com</span>
              </a>

              <div className="flex gap-10 pt-4">
                {[
                  { name: "Telegram", icon: <FaTelegramPlane />, link: "#" },
                  { name: "WhatsApp", icon: <FaWhatsapp />, link: "#" },
                  { name: "Instagram", icon: <FiInstagram />, link: "#" },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link}
                    className="flex items-center gap-2 group text-zinc-500 hover:text-white transition-all"
                  >
                    <span className="text-xl group-hover:scale-110 group-hover:text-blue-500 transition-transform">{social.icon}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] hidden md:block">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: THE FORM (Ultra Clean) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 transition-colors">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-blue-500 transition-all font-light text-xl placeholder:text-zinc-800"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 transition-colors">Handle</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-blue-500 transition-all font-light text-xl placeholder:text-zinc-800"
                    placeholder="@telegram_nick"
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 transition-colors">Message</label>
                <textarea 
                  rows={2}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-blue-500 transition-all font-light text-xl placeholder:text-zinc-800 resize-none"
                  placeholder="What's your vision?"
                />
              </div>

              <button className="relative overflow-hidden group w-full md:w-auto px-12 py-6 border border-white/20 hover:border-blue-500 transition-all duration-500">
                <div className="relative z-10 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[10px]">
                  Send Request <FiSend className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>

            </form>
          </motion.div>

        </div>

        {/* FOOTER INFO */}
        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700">
            <span className="hover:text-white cursor-pointer transition-colors">Legal</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          </div>
          
          <div className="text-center">
             <p className="text-[10px] font-black uppercase italic tracking-tighter text-white">
                © 2026 <span className="text-blue-500">Your_Name</span> — Directed with Mobile.
             </p>
          </div>

          <div className="flex gap-4">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
             <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Status: Booking Open</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;