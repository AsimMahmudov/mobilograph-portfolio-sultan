"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiInstagram,
} from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { EMAIL_ADDRESS, EMAIL_ADDRESS_LINK, INSTAGRAM_LINK, TELEGRAM_LINK, WHATSAPP_LINK } from "@/constants/admin";

const Contact = () => {
  // Состояния для формы
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const token = process.env.NEXT_PUBLIC_TG_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID;

    const text = `
<b>🚀 Новая заявка</b>
<b>Имя:</b> ${formData.name}
<b>Телефон:</b> ${formData.phone}
<b>Сообщение:</b> ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "" });
        // Убираем уведомление через 5 секунд
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-black py-32 px-6 md:px-12 text-white relative overflow-hidden border-t border-white/5">
      
      <div className="absolute -bottom-10 left-0 text-[20vw] font-black uppercase italic text-white/[0.02] leading-none select-none pointer-events-none">
        Connect
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* LEFT COLUMN */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">
                Available for booking
              </span>
              <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
                Let's make <br />
                <span className="text-zinc-800 hover:text-white transition-colors duration-700">
                  Impact.
                </span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-light max-w-sm leading-relaxed">
                Ready to elevate your visual identity? <br /> Drop a message or
                find me on socials.
              </p>
            </motion.div>

            <div className="space-y-8">
              <Link href={EMAIL_ADDRESS_LINK} className="group flex flex-col gap-1">
                <span className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Email me</span>
                <span className="text-[20px] md:text-4xl font-black italic group-hover:text-blue-500 transition-colors">
                  {EMAIL_ADDRESS}
                </span>
              </Link>

              <div className="flex gap-10 pt-4">
                {[
                  { name: "Telegram", icon: <FaTelegramPlane />, link: TELEGRAM_LINK },
                  { name: "WhatsApp", icon: <FaWhatsapp />, link: WHATSAPP_LINK },
                  { name: "Instagram", icon: <FiInstagram />, link: INSTAGRAM_LINK },
                ].map((social, i) => (
                  <Link
                    target="_blank"
                    key={i}
                    href={social.link}
                    className="flex items-center gap-2 group text-zinc-500 hover:text-white transition-all">
                    <span className="text-xl group-hover:scale-110 group-hover:text-blue-500 transition-transform">
                      {social.icon}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] hidden md:block">
                      {social.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative">
            
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 transition-colors">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-500 transition-all font-light text-xl placeholder:text-zinc-800"
                    placeholder="Enter your name"
                  />
                </div>
                
                {/* ИЗМЕНЕНО: PHONE ВМЕСТО HANDLE */}
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 transition-colors">
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-500 transition-all font-light text-xl placeholder:text-zinc-800"
                    placeholder="+7 "
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-700 group-focus-within:text-blue-500 transition-colors">
                  Message
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-500 transition-all font-light text-xl placeholder:text-zinc-800 resize-none"
                  placeholder="What's your vision?"
                />
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  disabled={status === "sending"}
                  className="relative overflow-hidden group w-full md:w-auto px-12 py-6 border border-white/20 hover:border-blue-500 transition-all duration-500 disabled:opacity-50">
                  <div className="relative z-10 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[10px]">
                    {status === "sending" ? "Sending..." : "Send Request"}
                    <FiSend className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

                {/* ALERT STATUS */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                      ✓ Message sent successfully! I'll contact you soon.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                      ✕ Error sending message. Please try again or use direct links.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase italic tracking-tighter">
          <p>Developed by <span className="text-blue-500">TwinCore</span></p>
          <p>© 2026 <span className="text-blue-500">Sultan</span></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;