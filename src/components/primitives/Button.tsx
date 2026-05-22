// Button — кнопка дизайн-системы.
//
// Варианты:
//   primary   — GlareHover (красная заливка + блик при наведении), белый текст
//   secondary — StarBorder (анимированная обводка), серый текст
//
// Контент: иконка fade-in при hover + ShinyText (переливающийся текст).
// Иконка указывается коротким именем из Flaticon (без префикса "fi-rr-"), напр. "briefcase".
//
// Если передан href → рендерится <a>. Иначе <button type="...">.

"use client";

import GlareHover from "@/components/shared/GlareHover";
import StarBorder from "@/components/shared/StarBorder";
import ShinyText from "@/components/shared/ShinyText";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant: "primary" | "secondary";
  icon: string;
  children: string;

  // Якорь
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;

  // Кнопка
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;

  // Доп. контроль внешнего вида
  fullWidth?: boolean;
  centered?: boolean;
  className?: string;

  // Короткий лейбл для мобилки (< sm = 640px). Если задан — показывается вместо children.
  // Используется только для secondary-кнопок (у primary через ShinyText не работает с двумя текстами).
  mobileLabel?: string;
}

export default function Button({
  variant,
  icon,
  children,
  href,
  download,
  target,
  rel,
  type = "button",
  onClick,
  disabled,
  fullWidth,
  centered,
  className,
  mobileLabel,
}: ButtonProps) {
  // Primary — текст белый, иконка через currentColor = белая.
  // Secondary — текст серый (text-secondary), иконка отдельно brand-red.
  //            Обёртывается в StarBorder → анимированная красная обводка по периметру,
  //            а статичный 1px серый border + белая заливка живут в .inner-content (StarBorder.css).
  const innerClasses = cn(
    "group/btn inline-flex items-center text-base font-medium pl-4 pr-5 py-3",
    variant === "primary" ? "text-text-on-brand" : "text-text-secondary",
    centered && "justify-center",
    fullWidth && "w-full",
    disabled && "disabled:opacity-60",
    className
  );

  // Иконка изначально схлопнута (max-w-0, mr-0, opacity-0). На hover расширяется.
  // На мобилке + планшетах (< lg = 1024px) иконка ВСЕГДА видна —
  // hover на тач-устройстве не работает (iPad и подобные тоже в этом диапазоне).
  // Для secondary иконка покрашена в brand-red отдельно от цвета текста.
  // Primary получает ShinyText (переливание), secondary — просто <span>.
  const iconColorClass = variant === "secondary" ? "text-brand" : "";
  const inner = (
    <>
      <i
        className={`fi fi-rr-${icon} ${iconColorClass} text-sm leading-[1] flex items-center overflow-hidden opacity-0 max-w-0 mr-0 max-lg:opacity-100 max-lg:max-w-[18px] max-lg:mr-2 group-hover/btn:opacity-100 group-hover/btn:max-w-[18px] group-hover/btn:mr-2 transition-all duration-300 ease-out`}
        aria-hidden="true"
      />
      {variant === "primary" ? (
        <ShinyText
          text={children}
          speed={3.5}
          delay={3}
          color="var(--text-on-brand)"
          shineColor="color-mix(in srgb, var(--text-on-brand) 50%, transparent)"
          className="leading-[1] whitespace-nowrap"
          pauseOnHover
        />
      ) : (
        <span className="leading-[1] whitespace-nowrap">
          {mobileLabel ? (
            <>
              <span className="sm:hidden">{mobileLabel}</span>
              <span className="hidden sm:inline">{children}</span>
            </>
          ) : (
            children
          )}
        </span>
      )}
    </>
  );

  const element = href ? (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={innerClasses}
    >
      {inner}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={innerClasses}
    >
      {inner}
    </button>
  );

  // fullWidth=true → внешняя обёртка тоже растягивается до 100% родителя
  // (нужно когда Button сидит во flex-1 контейнере и должен заполнить пространство)
  const wrapperClass = fullWidth ? "w-full" : "";

  if (variant === "primary") {
    return (
      <GlareHover
        width="auto"
        height="auto"
        background="var(--color-brand)"
        borderRadius="8px"
        borderColor="transparent"
        glareColor="#ffa8a8"
        glareOpacity={0.3}
        glareAngle={-30}
        glareSize={275}
        transitionDuration={800}
        className={wrapperClass}
      >
        {element}
      </GlareHover>
    );
  }

  // Secondary — StarBorder даёт анимированную красную обводку по периметру.
  // Статичная серая 1px рамка + белая заливка живут в .inner-content (StarBorder.css).
  return (
    <StarBorder color="var(--color-brand)" speed="6s" className={wrapperClass}>
      {element}
    </StarBorder>
  );
}
