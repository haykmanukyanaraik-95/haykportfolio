'use client';

// Электрическая обводка по реальному контуру SVG-логотипа
// (портирован из ElectricBorder — заменена rect-геометрия на SVG path sampling)

import { useEffect, useRef, useState, useCallback } from 'react';

interface ElectricLogoProps {
  logoSrc: string; // URL к SVG
  width: number;
  height: number;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
}

export default function ElectricLogo({
  logoSrc,
  width,
  height,
  color = '#F23F3B',
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  className = '',
}: ElectricLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const viewBoxRef = useRef<{ x: number; y: number; w: number; h: number }>({
    x: 0,
    y: 0,
    w: 100,
    h: 100,
  });
  const [svgLoaded, setSvgLoaded] = useState(false);
  const isVisibleRef = useRef(true);

  // --- шумовые функции (идентичны ElectricBorder) ---
  const random = useCallback((x: number) => (Math.sin(x * 12.9898) * 43758.5453) % 1, []);

  const noise2D = useCallback(
    (x: number, y: number) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    [random],
  );

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseAmplitude: number,
      baseFrequency: number,
      time: number,
      seed: number,
      baseFlatness: number,
    ) => {
      let y = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;
      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) octaveAmplitude *= baseFlatness;
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }
      return y;
    },
    [noise2D],
  );

  // --- загрузка SVG: fetch + парсинг ---
  useEffect(() => {
    let cancelled = false;
    fetch(logoSrc)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled || !containerRef.current) return;

        // Парсим SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');
        if (!svgEl) return;

        // Извлекаем viewBox
        const vb = svgEl.getAttribute('viewBox');
        if (vb) {
          const [x, y, w, h] = vb.split(/\s+/).map(Number);
          viewBoxRef.current = { x, y, w, h };
        } else {
          const w = parseFloat(svgEl.getAttribute('width') || '100');
          const h = parseFloat(svgEl.getAttribute('height') || '100');
          viewBoxRef.current = { x: 0, y: 0, w, h };
        }

        // Собираем все d-атрибуты из <path>, разбиваем на subpaths (каждый M...Z)
        const paths = Array.from(doc.querySelectorAll('path'));
        const subpaths: string[] = [];
        paths.forEach((p) => {
          const d = p.getAttribute('d') || '';
          // Разбиваем строку d на куски по M (начало нового subpath)
          const matches = d.match(/M[^M]+/g);
          if (matches) subpaths.push(...matches.map((s) => s.trim()));
        });

        // Создаём скрытый SVG с отдельными <path> для каждого subpath (чтобы getPointAtLength не "прыгал" между ними)
        const hiddenSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        hiddenSvg.setAttribute('width', '0');
        hiddenSvg.setAttribute('height', '0');
        hiddenSvg.style.position = 'absolute';
        hiddenSvg.style.visibility = 'hidden';
        hiddenSvg.style.pointerEvents = 'none';

        const pathEls: SVGPathElement[] = [];
        subpaths.forEach((d) => {
          const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          pathEl.setAttribute('d', d);
          hiddenSvg.appendChild(pathEl);
          pathEls.push(pathEl);
        });

        document.body.appendChild(hiddenSvg);
        pathsRef.current = pathEls;
        setSvgLoaded(true);

        return () => {
          if (hiddenSvg.parentNode) hiddenSvg.parentNode.removeChild(hiddenSvg);
        };
      });
    return () => {
      cancelled = true;
    };
  }, [logoSrc]);

  // --- анимация на canvas ---
  useEffect(() => {
    if (!svgLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // DPI-масштаб
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Масштаб viewBox → canvas с сохранением пропорций (object-fit: contain)
    // Учитываем padding, чтобы молния не обрезалась по краям canvas
    const padding = 40; // запас под displacement (20) + glow blur (16)
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;
    const vb = viewBoxRef.current;
    const scaleX = innerW / vb.w;
    const scaleY = innerH / vb.h;
    const s = Math.min(scaleX, scaleY);
    const offsetX = (width - vb.w * s) / 2 - vb.x * s;
    const offsetY = (height - vb.h * s) / 2 - vb.y * s;

    // Параметры шума (как в ElectricBorder)
    const octaves = 10;
    const lacunarity = 1.6;
    const gain = 0.7;
    const amplitude = chaos;
    const frequency = 10;
    const baseFlatness = 0;
    const displacement = 20; // меньше чем в ElectricBorder (60) — иначе молнии улетают далеко от логотипа

    // Сэмплируем точки каждого subpath один раз
    type Sampled = { points: { x: number; y: number }[] };
    const sampled: Sampled[] = pathsRef.current.map((pathEl) => {
      const len = pathEl.getTotalLength();
      const sampleCount = Math.max(20, Math.floor(len / 1.5));
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= sampleCount; i++) {
        const t = (i / sampleCount) * len;
        const p = pathEl.getPointAtLength(t);
        // Переводим в canvas-координаты
        points.push({ x: p.x * s + offsetX, y: p.y * s + offsetY });
      }
      return { points };
    });

    // IntersectionObserver — пауза когда не видим (экономия CPU)
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const draw = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Рисуем каждый subpath тремя слоями: широкий размытый glow + средний + тонкая линия
      const layers = [
        { width: thickness * 8, alpha: 0.12, blur: 16 },
        { width: thickness * 3, alpha: 0.4, blur: 6 },
        { width: thickness, alpha: 1, blur: 0 },
      ];

      for (const layer of layers) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = layer.alpha;
        ctx.lineWidth = layer.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = layer.blur;

        for (let pi = 0; pi < sampled.length; pi++) {
          const { points } = sampled[pi];
          ctx.beginPath();
          for (let i = 0; i < points.length; i++) {
            const progress = i / (points.length - 1);
            const xNoise = octavedNoise(
              progress * 8 + pi * 17,
              octaves,
              lacunarity,
              gain,
              amplitude,
              frequency,
              timeRef.current,
              pi * 2,
              baseFlatness,
            );
            const yNoise = octavedNoise(
              progress * 8 + pi * 17,
              octaves,
              lacunarity,
              gain,
              amplitude,
              frequency,
              timeRef.current,
              pi * 2 + 1,
              baseFlatness,
            );
            const x = points[i].x + xNoise * displacement;
            const y = points[i].y + yNoise * displacement;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [svgLoaded, width, height, color, speed, chaos, thickness, octavedNoise]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width, height }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
