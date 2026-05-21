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

        {/* Мобилка — горизонтальный layout: copyright слева, цитата центр, подпись справа.
            При узких ширинах (< 480px) copyright переносится в 2 строки через max-w-[100px].
            На ≥ 480px (есть запас места) max-w снимается — copyright помещается в одну строку. */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          <p className="text-text-muted text-[10px] leading-tight max-w-[100px] min-[480px]:max-w-none">
            &copy; 2026 Hayk Manukyan. All rights reserved.
          </p>
          <p className="text-text-muted text-xs whitespace-nowrap">Live Love Laugh</p>
          <span
            role="img"
            aria-label="Hayk Manukyan signature"
            className="block h-7 aspect-[92/55] bg-text-muted shrink-0"
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
    </Section>
  );
}
