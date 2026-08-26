import React, { useEffect, useRef } from 'react';
import './ParticleText.css';

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const resolveFontSize = (value: string | number, container: HTMLElement, fontWeight: string | number, fontFamily: string) => {
  if (typeof value === 'number') return value;

  const probe = document.createElement('span');
  probe.textContent = 'M';
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style.fontSize = value;
  probe.style.fontWeight = String(fontWeight);
  probe.style.fontFamily = fontFamily;
  container.appendChild(probe);
  const size = parseFloat(window.getComputedStyle(probe).fontSize) || 96;
  probe.remove();
  return size;
};

const waitForFonts = async (font: string) => {
  if (!('fonts' in document)) return;

  try {
    await document.fonts.load(font);
  } catch {}

  await document.fonts.ready;
};

export interface ParticleTextPart {
  text: string;
  fontSizeMultiplier?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  fontFamily?: string;
  letterSpacing?: string;
}

export interface ParticleTextProps {
  text?: string;
  parts?: ParticleTextPart[];
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  enableGather?: boolean;
  trigger?: 'mount' | 'hover' | 'click' | 'none';
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ParticleText: React.FC<ParticleTextProps> = ({
  text = 'Jatin Kumar',
  parts,
  particleSize = 2,
  density = 3.5,
  color = '#ffffff',
  highlightColor = '#ffffff',
  scatter = 40,
  gatherDuration = 1.4,
  stagger = 0,
  pointerRepel = 45,
  repelRadius = 130,
  idleDrift = 0.5,
  enableGather = true,
  trigger = 'mount',
  fontSize = 'clamp(2.5rem, 7vw, 5.5rem)',
  fontWeight = 700,
  fontFamily = 'inherit',
  glow = true,
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    interface Particle {
      x: number;
      y: number;
      startX: number;
      startY: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      seed: number;
      depth: number;
      alpha: number;
    }

    let particles: Particle[] = [];
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let buildId = 0;
    let reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let startTime: number | null = null;

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0
    };

    const drawParticle = (particle: Particle, globalAlpha: number = 1) => {
      const size = particle.size;
      const effectiveAlpha = particle.alpha * globalAlpha;
      if (effectiveAlpha <= 0.01) return;

      ctx.fillStyle = particle.color;
      ctx.globalAlpha = effectiveAlpha;

      if (size <= 2.1) {
        ctx.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
        ctx.globalAlpha = 1;
        return;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const render = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const introProgress = gatherDuration > 0 ? Math.min(1, elapsed / gatherDuration) : 1;
      // Smooth cubic easing for particle intro assemble
      const easeIntro = 1 - Math.pow(1 - introProgress, 3);

      ctx.clearRect(0, 0, width, height);

      if (glow && !reducedMotion) {
        ctx.shadowBlur = particleSize * 2.8 * easeIntro;
        ctx.shadowColor = highlightColor;
      } else {
        ctx.shadowBlur = 0;
      }

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.2;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.2;

      particles.forEach(particle => {
        let currentTargetX = particle.targetX;
        let currentTargetY = particle.targetY;

        if (enableGather && introProgress < 1) {
          currentTargetX = particle.startX + (particle.targetX - particle.startX) * easeIntro;
          currentTargetY = particle.startY + (particle.targetY - particle.startY) * easeIntro;
        }

        let baseX = currentTargetX;
        let baseY = currentTargetY;

        if (!reducedMotion && idleDrift > 0 && introProgress > 0.6) {
          const driftTime = now * 0.0012;
          const driftMul = Math.min(1, (introProgress - 0.6) / 0.4);
          baseX += Math.sin(driftTime * 0.8 + particle.seed * 8) * idleDrift * particle.depth * driftMul;
          baseY += Math.cos(driftTime * 0.65 + particle.depth * 8) * idleDrift * particle.depth * driftMul;
        }

        if (pointer.active && !reducedMotion && pointerRepel > 0 && repelRadius > 0 && introProgress > 0.8) {
          const dx = baseX - pointer.smoothX;
          const dy = baseY - pointer.smoothY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < repelRadius) {
            const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const follow = reducedMotion ? 1 : 0.24;
        particle.x += (baseX - particle.x) * follow;
        particle.y += (baseY - particle.y) * follow;

        drawParticle(particle, easeIntro);
      });

      ctx.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(render);
    };

    const ensureRenderLoop = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const sampleText = async () => {
      const currentBuild = ++buildId;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const computed = window.getComputedStyle(container);
      const resolvedFamily = fontFamily === 'inherit' ? computed.fontFamily || 'sans-serif' : fontFamily;
      let resolvedSize = resolveFontSize(fontSize, container, fontWeight, resolvedFamily);

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const padding = 40;
      const maxTextWidth = width * 0.94;

      if (parts && parts.length > 0) {
        // Pre-measure all parts
        let totalWidthEstimate = 0;
        for (const p of parts) {
          const pSize = resolvedSize * (p.fontSizeMultiplier || 1);
          const pWeight = p.fontWeight || fontWeight;
          const pStyle = p.fontStyle || 'normal';
          const pFamily = p.fontFamily || resolvedFamily;
          const fontString = `${pStyle} ${pWeight} ${pSize}px ${pFamily}`;
          await waitForFonts(fontString);
          if (currentBuild !== buildId) return;

          offCtx.font = fontString;
          const m = offCtx.measureText(p.text);
          totalWidthEstimate += m.width + pSize * 0.28;
        }

        if (totalWidthEstimate > maxTextWidth) {
          resolvedSize = Math.max(18, resolvedSize * (maxTextWidth / totalWidthEstimate));
        }

        offscreen.width = Math.max(1, Math.floor(width * 1.5));
        offscreen.height = Math.max(1, Math.floor(resolvedSize * 3 + padding * 2));
        offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
        offCtx.textAlign = 'left';
        offCtx.textBaseline = 'alphabetic';
        offCtx.fillStyle = '#ffffff';

        let currentX = padding;
        const baseY = offscreen.height / 2 + resolvedSize * 0.32;

        for (const p of parts) {
          const pSize = resolvedSize * (p.fontSizeMultiplier || 1);
          const pWeight = p.fontWeight || fontWeight;
          const pStyle = p.fontStyle || 'normal';
          const pFamily = p.fontFamily || resolvedFamily;
          const fontString = `${pStyle} ${pWeight} ${pSize}px ${pFamily}`;
          offCtx.font = fontString;
          offCtx.fillText(p.text, currentX, baseY);
          const m = offCtx.measureText(p.text);
          currentX += m.width + pSize * 0.28;
        }
      } else {
        const content = String(text || ' ');
        let font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
        await waitForFonts(font);
        if (currentBuild !== buildId) return;

        offCtx.font = font;
        let metrics = offCtx.measureText(content);
        if (metrics.width > maxTextWidth) {
          resolvedSize = Math.max(18, resolvedSize * (maxTextWidth / metrics.width));
          font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
          await waitForFonts(font);
          if (currentBuild !== buildId) return;
          offCtx.font = font;
        }

        offscreen.width = Math.max(1, Math.floor(width * 1.5));
        offscreen.height = Math.max(1, Math.floor(resolvedSize * 3 + padding * 2));
        offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
        offCtx.font = font;
        offCtx.textAlign = 'left';
        offCtx.textBaseline = 'alphabetic';
        offCtx.fillStyle = '#ffffff';
        offCtx.fillText(content, padding, offscreen.height / 2 + resolvedSize * 0.32);
      }

      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const rawPoints: { x: number; y: number; alpha: number }[] = [];
      const step = Math.max(2, Math.floor(density));

      let minX = offscreen.width;
      let maxX = 0;
      let minY = offscreen.height;
      let maxY = 0;

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
          if (alpha > 45) {
            rawPoints.push({ x, y, alpha: alpha / 255 });
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (rawPoints.length === 0) return;

      // Mathematical visual center of the rasterized text
      const glyphCenterX = (minX + maxX) / 2;
      const glyphCenterY = (minY + maxY) / 2;

      const stageCenterX = width / 2;
      const stageCenterY = height / 2;

      const targets = rawPoints.map(pt => ({
        x: stageCenterX + (pt.x - glyphCenterX),
        y: stageCenterY + (pt.y - glyphCenterY),
        alpha: pt.alpha
      }));

      const maxParticles = Math.max(900, Math.min(5000, Math.floor((width * height) / 80)));
      const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
      const selected = targets.filter((_, index) => index % stride === 0);

      particles = selected.map((target, index) => {
        const seed = ((index * 9301 + 49297) % 233280) / 233280;
        const depth = 0.5 + (((index * 233 + 97) % 1000) / 1000) * 0.8;

        const scatterRadius = Math.max(25, scatter);
        const angle = seed * Math.PI * 2;
        const dist = (0.3 + depth * 0.7) * scatterRadius;
        const startX = target.x + Math.cos(angle) * dist;
        const startY = target.y + Math.sin(angle) * dist;

        return {
          x: enableGather ? startX : target.x,
          y: enableGather ? startY : target.y,
          startX,
          startY,
          targetX: target.x,
          targetY: target.y,
          size: Math.max(0.7, particleSize * (0.8 + target.alpha * 0.4)),
          color: '#ffffff',
          seed,
          depth,
          alpha: target.alpha
        };
      });

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;

      ensureRenderLoop();
    };

    const queueSample = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(sampleText);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handlePointerEnter = (event: PointerEvent) => {
      handlePointerMove(event);
    };

    const reduceMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const handleReduceMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      sampleText();
    };

    reduceMotionQuery?.addEventListener('change', handleReduceMotionChange);
    canvas.addEventListener('pointerenter', handlePointerEnter);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(queueSample);
    resizeObserver.observe(container);
    sampleText();

    return () => {
      buildId += 1;
      resizeObserver.disconnect();
      reduceMotionQuery?.removeEventListener('change', handleReduceMotionChange);
      canvas.removeEventListener('pointerenter', handlePointerEnter);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
    };
  }, [
    text,
    parts,
    particleSize,
    density,
    color,
    highlightColor,
    pointerRepel,
    repelRadius,
    idleDrift,
    fontSize,
    fontWeight,
    fontFamily,
    glow
  ]);

  const accessibilityText = parts ? parts.map(p => p.text).join(' ') : text;

  return (
    <div ref={containerRef} className={`particle-text ${className}`.trim()} style={style} aria-label={accessibilityText}>
      <canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" />
      <span className="particle-text__sr">{accessibilityText}</span>
    </div>
  );
};

export default ParticleText;
