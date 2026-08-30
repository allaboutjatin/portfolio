"use client";

import React, { useState, useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

interface MeshGradientSVGProps {
  className?: string;
  colors?: string[];
  size?: number;
  interactive?: boolean;
  thinking?: boolean;
}

export function MeshGradientSVG({
  className = "",
  colors = [
    "#FFB3D9", // Pastel pink
    "#87CEEB", // Sky blue
    "#4A90E2", // Medium blue
    "#2C3E50", // Dark blue-gray
    "#1A1A2E", // Very dark blue
  ],
  size,
  interactive = true,
  thinking = false,
}: MeshGradientSVGProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  useEffect(() => {
    if (thinking) {
      // While thinking, eyes gaze gently upward and wander slightly
      setEyeOffset({ x: 1.5, y: -7 });
      return;
    }

    if (!interactive) return;

    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (mousePosition.x - centerX) * 0.075;
      const deltaY = (mousePosition.y - centerY) * 0.075;

      const maxOffset = 9;
      setEyeOffset({
        x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
      });
    }
  }, [mousePosition, interactive, thinking]);

  return (
    <motion.div
      className={`relative select-none ${className}`}
      animate={{
        y: [0, -7, 0],
        scaleY: [1, 1.04, 1],
      }}
      transition={{
        duration: 2.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "top center" }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="231"
        height="260"
        viewBox="0 0 231 260"
        className="w-full h-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
      >
        <defs>
          <clipPath id="dudduShapeClip">
            <path d="M 0, 115.5 A 115.5, 115.5 0 0, 1 231, 115.5 L 231, 214 C 231, 236 215, 252 192.5, 252 C 170, 252 160, 234 154, 234 C 148, 234 138, 252 115.5, 252 C 93, 252 83, 234 77, 234 C 71, 234 61, 252 38.5, 252 C 16, 252 0, 236 0, 214 Z" />
          </clipPath>
        </defs>

        {/* Ghost Body Shader Canvas clipped to wavy skirt shape */}
        <foreignObject width="231" height="260" clipPath="url(#dudduShapeClip)">
          <div className="w-full h-full bg-gradient-to-br from-[#FFB3D9] via-[#4A90E2] to-[#1A1A2E]">
            {typeof window !== 'undefined' && window.innerWidth >= 768 && (
              <MeshGradient colors={colors} className="w-full h-full opacity-90" speed={0.6} />
            )}
          </div>
        </foreignObject>

        {/* Ghost Eyes with Interactive Cursor Tracking and Synchronized Blink (Base + White Highlights Blink Together) */}
        <motion.g
          animate={{
            x: eyeOffset.x,
            y: eyeOffset.y,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          {/* Left Eye Group (Dark Base + White Highlights together in blink) */}
          <g
            className="duddu-eye-blink"
            style={{ transformOrigin: "78px 118px" }}
          >
            {/* Dark Eye Base */}
            <ellipse
              cx="78"
              cy="118"
              rx="18"
              ry="28"
              fill="#12121d"
            />
            {/* Primary White Catchlight */}
            <ellipse
              cx="73"
              cy="110"
              rx="6"
              ry="9"
              fill="#ffffff"
            />
            {/* Secondary Small Catchlight */}
            <ellipse
              cx="83"
              cy="123"
              rx="3"
              ry="4"
              fill="#ffffff"
              opacity="0.85"
            />
          </g>

          {/* Right Eye Group (Dark Base + White Highlights together in blink) */}
          <g
            className="duddu-eye-blink"
            style={{ transformOrigin: "153px 118px" }}
          >
            {/* Dark Eye Base */}
            <ellipse
              cx="153"
              cy="118"
              rx="18"
              ry="28"
              fill="#12121d"
            />
            {/* Primary White Catchlight */}
            <ellipse
              cx="148"
              cy="110"
              rx="6"
              ry="9"
              fill="#ffffff"
            />
            {/* Secondary Small Catchlight */}
            <ellipse
              cx="158"
              cy="123"
              rx="3"
              ry="4"
              fill="#ffffff"
              opacity="0.85"
            />
          </g>
        </motion.g>

        {/* Animated Thinking Sparkles / Thought Indicator */}
        {thinking && (
          <g className="duddu-thinking-nodes">
            {/* Thought particle 1 */}
            <circle cx="185" cy="55" r="5" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '1.4s' }} />
            <circle cx="185" cy="55" r="4.5" fill="#67e8f9" />
            {/* Thought particle 2 */}
            <circle cx="205" cy="35" r="7" fill="#c084fc" className="animate-pulse" style={{ animationDuration: '1.2s' }} />
            <circle cx="205" cy="35" r="6" fill="#e879f9" />
            {/* Thought particle 3 with sparkle */}
            <path
              d="M 215 15 L 217 22 L 224 24 L 217 26 L 215 33 L 213 26 L 206 24 L 213 22 Z"
              fill="#fef08a"
              className="animate-spin"
              style={{ transformOrigin: '215px 24px', animationDuration: '3s' }}
            />
          </g>
        )}
      </svg>

      <style>{`
        .duddu-eye-blink {
          animation: dudduBlink 3.6s infinite ease-in-out;
        }

        @keyframes dudduBlink {
          0%,
          88%,
          100% {
            transform: scaleY(1);
          }
          92%,
          94% {
            transform: scaleY(0.06);
          }
        }
      `}</style>
    </motion.div>
  );
}

export default MeshGradientSVG;
