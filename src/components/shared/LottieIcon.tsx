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

import { useEffect, useState } from "react";
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
  isActive: boolean;
  onAnimationEnd?: () => void;
  staticFrame?: boolean;
  size?: number;
}

function themedSrc(src: string, theme: "dark" | "light"): string {
  return src.replace(/\.json$/, `.${theme}.json`);
}

export default function LottieIcon({
  src,
  isActive,
  onAnimationEnd,
  staticFrame = false,
  size = 60,
}: LottieIconProps) {
  const theme = useTheme();
  const [player, setPlayer] = useState<DotLottiePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);

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
    if (isActive) {
      player.setFrame(0);
      player.play();
    } else {
      player.pause();
    }
  }, [player, isReady, isActive, staticFrame]);

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
      // key с темой — при смене темы DotLottieReact полностью пересоздаётся
      key={`${src}::${theme}`}
      src={themedSrc(src, theme)}
      loop={false}
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
