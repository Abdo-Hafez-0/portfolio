"use client";

import { useEffect, useRef } from "react";

type Particle = {
  opacity: number;
  radius: number;
  speed: number;
  x: number;
  y: number;
};

const MAX_PIXEL_RATIO = 1.5;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(parallaxX, parallaxY);

      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = `rgba(164, 225, 255, ${particle.opacity})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const isCompact = width < 768;
      const count = reduceMotion.matches ? 18 : isCompact ? 28 : 56;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.1 + 0.35,
        opacity: Math.random() * 0.35 + 0.1,
        speed: Math.random() * 0.08 + 0.02,
      }));
      draw();
    };

    const animate = () => {
      for (const particle of particles) {
        particle.y -= particle.speed;
        if (particle.y < -4) {
          particle.y = height + 4;
          particle.x = Math.random() * width;
        }
      }

      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reduceMotion.matches) return;

      parallaxX = (event.clientX / width - 0.5) * -8;
      parallaxY = (event.clientY / height - 0.5) * -8;
    };

    const handleMotionPreference = () => {
      window.cancelAnimationFrame(animationFrame);
      resize();
      if (!reduceMotion.matches) animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    if (!reduceMotion.matches) animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    reduceMotion.addEventListener("change", handleMotionPreference);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      reduceMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="particle-field" />;
}
