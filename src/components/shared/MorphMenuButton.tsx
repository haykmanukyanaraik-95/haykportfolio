// MorphMenuButton — CSS-кнопка переключатель бургер↔X.
// 3 горизонтальные линии трансформируются в X через CSS transitions:
//   - top:    translateY(центр) + rotate(45deg)
//   - middle: scaleX(0) + opacity:0
//   - bottom: translateY(-центр) + rotate(-45deg)
//
// Цвет линий — var(--text-primary) → автоматически адаптируется к теме
// (warm off-white в dark, warm dark в light). Никаких внешних файлов и Lottie.
"use client";

interface MorphMenuButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
  size?: number;
}

export default function MorphMenuButton({
  open,
  onClick,
  className,
  size = 24,
}: MorphMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-pressed={open}
      // outline-none — убираем глобальный focus-ring; cursor-pointer применяется через global
      className={`morph-burger ${open ? "is-open" : ""} outline-none focus:outline-none focus-visible:outline-none ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <span className="morph-burger__line" aria-hidden="true" />
      <span className="morph-burger__line" aria-hidden="true" />
      <span className="morph-burger__line" aria-hidden="true" />
    </button>
  );
}
