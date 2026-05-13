// Секция 8: Footer — копирайт (лево) + цитата (центр) + подпись SVG (право)
import Section from "@/components/primitives/Section";

export default function Footer() {
  return (
    <Section as="footer" variant="footer">
        {/* Разделительная линия */}
        <div className="h-px bg-border-divider mb-10" />

        {/* Десктоп: copyright слева, signature справа, quote АБСОЛЮТНО по центру.
            Геометрический центр контейнера, не зависит от ширины боковых элементов.
            Мобилка: вертикальный стек. */}
        <div className="hidden sm:flex relative items-center justify-between">
          <p className="text-text-muted text-xs">&copy; 2026 Hayk Manukyan. All rights reserved.</p>
          <p className="text-text-muted text-lg absolute left-1/2 -translate-x-1/2">Live Love Laugh</p>
          <span
            role="img"
            aria-label="Hayk Manukyan signature"
            className="block h-10 aspect-[92/55] bg-text-muted"
            style={{
              maskImage: "url(/images/Signature.svg)",
              WebkitMaskImage: "url(/images/Signature.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Мобилка — вертикальный стек */}
        <div className="flex flex-col sm:hidden items-center gap-5">
          <p className="text-text-muted text-lg">Live Love Laugh</p>
          <span
            role="img"
            aria-label="Hayk Manukyan signature"
            className="block h-10 aspect-[92/55] bg-text-muted"
            style={{
              maskImage: "url(/images/Signature.svg)",
              WebkitMaskImage: "url(/images/Signature.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <p className="text-text-muted text-xs">&copy; 2026 Hayk Manukyan. All rights reserved.</p>
        </div>
    </Section>
  );
}
