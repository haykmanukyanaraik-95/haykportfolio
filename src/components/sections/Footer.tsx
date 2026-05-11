// Секция 8: Footer — копирайт (лево) + цитата (центр) + подпись SVG (право)
import Section from "@/components/primitives/Section";

export default function Footer() {
  return (
    <Section as="footer" variant="footer">
        {/* Разделительная линия */}
        <div className="h-px bg-border-divider mb-10" />

        {/* Мобилка: вертикально по центру */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <p className="text-text-muted text-sm">Live Love Laugh</p>
          <p className="text-text-muted text-xs">&copy; 2026 Hayk Manukyan. All rights reserved.</p>
          <img
            src="/images/Signature.svg"
            alt="Hayk Manukyan signature"
            className="h-10 w-auto opacity-30"
          />
        </div>

        {/* Десктоп: горизонтально — копирайт | цитата | подпись */}
        <div className="hidden sm:flex relative items-center justify-between">
          <p className="text-text-muted text-xs">
            &copy; 2026 Hayk Manukyan. All rights reserved.
          </p>
          <p className="text-text-muted text-sm absolute left-1/2 -translate-x-1/2">
            Live Love Laugh
          </p>
          <img
            src="/images/Signature.svg"
            alt="Hayk Manukyan signature"
            className="h-10 w-auto opacity-30"
          />
        </div>
    </Section>
  );
}
