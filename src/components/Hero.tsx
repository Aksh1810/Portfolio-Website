"use client";
import React from "react";
import Particles from "./Particles";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Particles */}
            <Particles />

            {/* Hero Content */}
            <div className="z-10 text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg md:text-xl text-blue-400 mb-4 tracking-[0.2em] uppercase font-light"
                >
                    Welcome to my digital space
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter"
                >
                    <span className="block text-white mix-blend-overlay">HI, I'M</span>
                    <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.7)] hover:text-white transition-colors duration-700 cursor-default select-none">
                        AKSH PATEL
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Building <span className="text-white font-semibold">premium</span> web experiences with modern technologies.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium tracking-wide flex items-center gap-2 transition-all hover:border-white/50"
                    >
                        Explore Portfolio
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}
