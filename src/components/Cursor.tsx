"use client";
import React, { useEffect, useRef } from "react";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = "none";

        // Add hover states for clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
        clickables.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (cursorRef.current) {
                    cursorRef.current.classList.add('scale-[2.5]', 'opacity-50');
                    cursorRef.current.classList.remove('bg-white');
                    cursorRef.current.classList.add('bg-blue-400');
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursorRef.current) {
                    cursorRef.current.classList.remove('scale-[2.5]', 'opacity-50');
                    cursorRef.current.classList.remove('bg-blue-400');
                    cursorRef.current.classList.add('bg-white');
                }
            });
        });

        let mouseX = -100;
        let mouseY = -100;

        // Arrays to store position history for the snake effect
        const trailLength = 20;
        const trailX: number[] = new Array(trailLength).fill(0);
        const trailY: number[] = new Array(trailLength).fill(0);

        const onMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediate update for the main cursor
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            }
        };

        window.addEventListener("mousemove", onMouseMove);

        const animate = () => {
            // Update first trail point to follow mouse
            let targetX = mouseX;
            let targetY = mouseY;

            trailsRef.current.forEach((trail, index) => {
                if (!trail) return;

                // The first segment follows the mouse, others follow the previous segment
                const prevX = index === 0 ? mouseX : trailX[index - 1];
                const prevY = index === 0 ? mouseY : trailY[index - 1];

                // Smooth follow logic (LERP)
                trailX[index] += (prevX - trailX[index]) * 0.2;
                trailY[index] += (prevY - trailY[index]) * 0.2;

                // Apply position
                trail.style.transform = `translate(${trailX[index]}px, ${trailY[index]}px) translate(-50%, -50%)`;
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, [isVisible]);

    return (
        <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-transform duration-100"
            />
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { trailsRef.current[i] = el; }}
                    className="fixed top-0 left-0 rounded-full bg-white/40"
                    style={{
                        width: `${8 - i * 0.3}px`,
                        height: `${8 - i * 0.3}px`,
                        transition: 'opacity 0.2s',
                    }}
                />
            ))}
        </div>
    );
}
