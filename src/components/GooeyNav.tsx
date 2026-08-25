import React, { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

export interface GooeyNavItem {
  id?: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number] | number[];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onSelect?: (index: number, item: GooeyNavItem) => void;
}

export const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 550,
  particleCount = 14,
  particleDistances = [75, 12],
  particleR = 90,
  timeVariance = 250,
  colors = [1, 2, 3, 1, 2, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onSelect
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLUListElement | null>(null);
  const filterRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const prevActiveIndexRef = useRef<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number] | number[], r: number) => {
    const rotate = noise(r / 10);
    const d0 = d[0] ?? 75;
    const d1 = d[1] ?? 12;
    return {
      start: getXY(d0, particleCount - i, particleCount),
      end: getXY(d1 + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Particle removed already
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const triggerTransition = (targetIndex: number) => {
    if (!navRef.current || !containerRef.current) return;
    const listItems = navRef.current.querySelectorAll('li');
    const targetLi = listItems[targetIndex] as HTMLElement | undefined;
    if (!targetLi) return;

    setActiveIndex(targetIndex);
    updateEffectPosition(targetLi);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current?.removeChild(p));
      makeParticles(filterRef.current);
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  // Sync when controlledActiveIndex changes (e.g. from scrolling)
  useEffect(() => {
    if (
      controlledActiveIndex !== undefined &&
      controlledActiveIndex >= 0 &&
      controlledActiveIndex < items.length &&
      controlledActiveIndex !== prevActiveIndexRef.current
    ) {
      prevActiveIndexRef.current = controlledActiveIndex;
      triggerTransition(controlledActiveIndex);
    }
  }, [controlledActiveIndex, items.length]);

  const handleItemClick = (index: number) => {
    prevActiveIndexRef.current = index;
    triggerTransition(index);
    items[index]?.onClick?.();
    onSelect?.(index, items[index]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(index);
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement | undefined;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement | undefined;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, items]);

  return (
    <div className="gooey-nav-container relative" ref={containerRef}>
      {/* Invisible SVG Filter for Clean Alpha Gooey Effect without Black Box */}
      <svg className="fixed w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li 
              key={item.id || index} 
              className={activeIndex === index ? 'active' : ''}
            >
              <button 
                type="button"
                id={`gooey-nav-btn-${index}`}
                onClick={() => handleItemClick(index)} 
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
