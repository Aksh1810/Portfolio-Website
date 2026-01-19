"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiMongodb, SiPostgresql, SiPython,
    SiGit, SiDocker, SiAmazonwebservices, SiFigma
} from 'react-icons/si';

const skills = [
    {
        category: "Frontend Development",
        items: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        ]
    },
    {
        category: "Backend & Database",
        items: [
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        ]
    },
    {
        category: "DevOps & Design",
        items: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
            { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        ]
    }
];

export default function Skills() {
    return (
        <section className="relative w-full py-24 px-6 bg-black text-white overflow-hidden" id="skills">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                        Technical Arsenal
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        A curated list of technologies I use to build robust and scalable digital solutions.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {skills.map((category, catIndex) => (
                        <div key={catIndex}>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="text-2xl md:text-3xl font-semibold mb-10 pl-4 border-l-4 border-blue-500 text-gray-200"
                            >
                                {category.category}
                            </motion.h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {category.items.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="group relative p-6 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 cursor-pointer overflow-hidden"
                                    >
                                        {/* Hover Glow Effect */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        />

                                        <div className="flex flex-col items-center gap-5 relative z-10">
                                            <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                                <skill.icon size={48} style={{ color: skill.color }} className="filter drop-shadow-lg transition-transform group-hover:scale-110 duration-300" />
                                            </div>
                                            <span className="font-medium text-lg text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
