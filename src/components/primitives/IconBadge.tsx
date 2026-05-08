// IconBadge — квадратная иконка с заливкой через mask-image.
// Используется для SVG-иконок с фиксированной формой, которые надо окрасить в произвольный цвет
// (например, brand-red в Expertise — независимо от исходного fill в SVG).
//
// URL оборачиваем в кавычки + encodeURI — пробелы в имени файла иначе ломают парсинг CSS.
//
// Параметры:
//   src   — путь к SVG-иконке
//   size  — сторона квадрата в px (default 36)
//   color — цвет заливки (default brand)

interface IconBadgeProps {
  src: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function IconBadge({
  src,
  size = 36,
  color = "var(--color-brand)",
  className,
}: IconBadgeProps) {
  const url = `url("${encodeURI(src)}")`;
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
