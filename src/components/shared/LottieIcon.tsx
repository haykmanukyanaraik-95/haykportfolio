// LottieIcon — иконка с Lottie-анимацией для секции Expertise.
//
// Pre-baked цвета (генерируются Python-скриптом в public/images/expertise/):
//   - {name}.dark.json   — black-stroke → brand red,  teal-accent → #F2EFE9 (off-white)
//   - {name}.light.json  — black-stroke → brand red,  teal-accent → #1F1B19 (warm dark)
// (По запросу пользователя цвета REVERSED от исходных Flaticon: было чёрный + бирюза,
//  стало брендовый красный + текстовый цвет.)
//
// Воспроизведение:
//   - Ожидание 'load' события — без него play() может быть проигнорирован, если data
//     ещё не успела распарситься (канонический паттерн @lottiefiles/dotlottie-react).
//   - isActive=true:    setFrame(0) + play() — запуск с начала
//   - isActive=false:   pause() — без сброса кадра
//   - staticFrame=true: игнорируем isActive (статика для мобильной карусели)
//   - onAnimationEnd:   эмитится на event 'complete'
"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "@/lib/useTheme";

type DotLottiePlayer = {
  setFrame: (frame: number) => void;
  play: () => void;
  pause: () => void;
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};

interface LottieIconProps {
  src: string;
  isActive?: boolean;
  onAnimationEnd?: () => void;
  staticFrame?: boolean;
  size?: number;
  /** Бесконечный цикл без интеракции. Если true — isActive игнорируется,
      иконка автоматически проигрывается в loop с момента load. */
  loop?: boolean;
  /** Пауза между прогонами в loop-режиме (мс). 0 = без паузы (плотный loop).
      При loopDelay > 0 используется DotLottie loop=false + restart через setTimeout. */
  loopDelay?: number;
}

// Cache-bust версия: меняй число чтобы заставить браузер/DotLottie повторно
// загрузить JSON после правки цветов. JSON-файлы агрессивно кэшируются,
// hard refresh иногда не помогает — query string гарантирует свежий запрос.
const CACHE_BUST = "5";

function themedSrc(src: string, theme: "dark" | "light"): string {
  // URL-encode каждый сегмент пути. Без этого имена с пробелами
  // ("AI Driven Practice.json") не доходят до dev server (HTTP 000),
  // и DotLottie молча показывает fallback / старый кэш.
  const themed = src.replace(/\.json$/, `.${theme}.json`);
  const encodedPath = themed.split("/").map(encodeURIComponent).join("/");
  return `${encodedPath}?v=${CACHE_BUST}`;
}

export default function LottieIcon({
  src,
  isActive = false,
  onAnimationEnd,
  staticFrame = false,
  size = 60,
  loop = false,
  loopDelay = 0,
}: LottieIconProps) {
  const theme = useTheme();
  const [player, setPlayer] = useState<DotLottiePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Используем DotLottie internal loop только если loopDelay=0.
  // При loopDelay>0 управляем рестартом сами через 'complete' event + setTimeout.
  const useNativeLoop = loop && loopDelay === 0;

  // Подписка на 'load' — флаг готовности к play.
  // setIsReady в эффекте — намеренный pattern: ready-state управляется событием
  // от внешнего источника (DotLottie player). При смене player сбрасываем флаг.
  useEffect(() => {
    if (!player) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(false);
      return;
    }
    setIsReady(false);
    const onLoad = () => setIsReady(true);
    player.addEventListener("load", onLoad);
    return () => player.removeEventListener("load", onLoad);
  }, [player]);

  // Воспроизведение — только когда player готов (data загружена).
  useEffect(() => {
    if (!player || !isReady || staticFrame) return;
    if (loop) {
      // Loop-режим: запускаем (если useNativeLoop=true, DotLottie сам зациклит;
      // если loopDelay>0 — используем 'complete' event ниже для повтора с задержкой).
      player.play();
      return;
    }
    if (isActive) {
      player.setFrame(0);
      player.play();
    } else {
      player.pause();
    }
  }, [player, isReady, isActive, staticFrame, loop]);

  // Loop с задержкой: подписываемся на 'complete', через loopDelay рестартим.
  useEffect(() => {
    if (!player || !isReady || staticFrame || !loop || loopDelay === 0) return;
    const onComplete = () => {
      loopTimeoutRef.current = setTimeout(() => {
        player.setFrame(0);
        player.play();
      }, loopDelay);
    };
    player.addEventListener("complete", onComplete);
    return () => {
      player.removeEventListener("complete", onComplete);
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
    };
  }, [player, isReady, staticFrame, loop, loopDelay]);

  // Complete для сиквенции в родителе.
  useEffect(() => {
    if (!player || !onAnimationEnd) return;
    player.addEventListener("complete", onAnimationEnd);
    return () => {
      player.removeEventListener("complete", onAnimationEnd);
    };
  }, [player, onAnimationEnd]);

  return (
    <DotLottieReact
      // key — themed URL включает CACHE_BUST, чтобы при его смене DotLottieReact
      // полностью пересоздавался и грузил новый JSON. Без cache-bust в key
      // React переиспользует mounted player с уже загруженной (старой) data.
      key={themedSrc(src, theme)}
      src={themedSrc(src, theme)}
      loop={useNativeLoop}
      autoplay={false}
      dotLottieRefCallback={(ref) => {
        setPlayer(ref as DotLottiePlayer | null);
      }}
      // width/height — HTML-атрибуты canvas. Без них canvas использует intrinsic
      // 300×150 (non-square), и CSS-style масштабирует неравномерно → сжатие/растяжение.
      width={size}
      height={size}
      // flexShrink: 0 — защита от сжатия в flex-контейнере (карточка Expertise = flex-col).
      // display: block — гарантирует что canvas рендерится квадратно, без inline-baseline сдвигов.
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
    />
  );
}
