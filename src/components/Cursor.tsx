"use client";
import React, { useEffect, useRef } from "react";

export default function Cursor() {
    const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = "none";

        // Default system cursor hiding for interactive elements
        const style = document.createElement('style');
        style.innerHTML = `
      * { cursor: none !important; }
    `;
        document.head.appendChild(style);

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
                // Using a slightly tighter factor for the head and looser for the tail could be good, 
                // but a constant 0.25 provides that specific "snake" feel.
                trailX[index] += (prevX - trailX[index]) * 0.25;
                trailY[index] += (prevY - trailY[index]) * 0.25;

                // Apply position
                trail.style.transform = `translate(${trailX[index]}px, ${trailY[index]}px) translate(-50%, -50%) scale(${1 - index / trailLength})`; // Tapering scale
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            document.body.style.cursor = "auto";
            document.head.removeChild(style);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div className={`pointer-events-none fixed inset-0 z-[99999999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { trailsRef.current[i] = el; }}
                    className="fixed top-0 left-0 bg-white rounded-full bg-blend-normal"
                    style={{
                        width: '24px',
                        height: '24px',
                        pointerEvents: 'none',
                        // We handle scale in the animation loop for performance
                    }}
                />
            ))}
        </div>
    );
}
