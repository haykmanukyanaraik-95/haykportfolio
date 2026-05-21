// Секция 5: Let's Talk — электрическая анимация логотипа слева + форма справа
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AnimatedContent from "@/components/shared/AnimatedContent";
import Section from "@/components/primitives/Section";
import Card from "@/components/primitives/Card";
import Button from "@/components/primitives/Button";

// ElectricLogo — canvas-анимация по контуру SVG-логотипа, только клиент
const ElectricLogo = dynamic(() => import("@/components/shared/ElectricLogo"), {
  ssr: false,
  loading: () => null,
});

type Field = "name" | "email" | "message";

export default function Contact() {
  // Состояние полей формы
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<Field | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Возвращает класс цвета иконки в зависимости от состояния поля:
  // — focused: brand-red
  // — filled (but not focused): text-primary (тёмный)
  // — default: text-muted С opacity 60% (чуть светлее placeholder-текста)
  const fieldColor = (field: Field, value: string) => {
    if (focused === field) return "text-brand";
    if (value) return "text-text-primary";
    return "text-text-muted opacity-60";
  };

  // Капитализирует первую букву строки. Применяется к onChange всех инпутов.
  const capitalize = (s: string) => (s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  // Отправка формы через Formspree
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mlgajler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" variant="standard">

        <AnimatedContent distance={40} duration={0.8} delay={0} revealOverlay>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 md:gap-8 lg:gap-16 items-center">

          {/* Левая колонка — электрический логотип. Четыре варианта по диапазонам
              для плавного масштабирования с шириной экрана:
              < 640 (мобилка): 320x305 — крупный, занимает почти всю ширину viewport
              640-767 (маленький планшет): 280x265 — половина контейнера ~284-347px
              768-1023 (большой планшет): 360x340 — половина контейнера ~324-451px
              ≥ 1024 (десктоп): 420x400 — крупный, симметрия с формой */}
            <div className="flex justify-center sm:justify-start items-center">
              <div className="sm:hidden">
                <ElectricLogo
                  logoSrc="/images/logo.svg"
                  width={320}
                  height={305}
                  color="var(--color-brand)"
                  speed={1}
                  chaos={0.12}
                  thickness={2}
                />
              </div>
              <div className="hidden sm:block md:hidden">
                <ElectricLogo
                  logoSrc="/images/logo.svg"
                  width={280}
                  height={265}
                  color="var(--color-brand)"
                  speed={1}
                  chaos={0.12}
                  thickness={2}
                />
              </div>
              <div className="hidden md:block lg:hidden">
                <ElectricLogo
                  logoSrc="/images/logo.svg"
                  width={360}
                  height={340}
                  color="var(--color-brand)"
                  speed={1}
                  chaos={0.12}
                  thickness={2}
                />
              </div>
              <div className="hidden lg:block">
                <ElectricLogo
                  logoSrc="/images/logo.svg"
                  width={420}
                  height={400}
                  color="var(--color-brand)"
                  speed={1}
                  chaos={0.12}
                  thickness={2}
                />
              </div>
            </div>

          {/* Правая колонка — glass-карточка (p-4 на мобилке как Expertise, p-6 на десктопе) */}
            <Card className="p-4 lg:p-6">
              {/* Заголовок и подзаголовок формы — статические, без анимации */}
              <h2 className="text-lg lg:text-xl font-bold text-text-primary mb-2">
                Let&apos;s Create Something Together
              </h2>
              <p className="text-sm text-text-secondary mb-8">
                Drop me a line — I reply within a day.
              </p>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Линия 1: Name + Email.
                    Иконка в left-3 (12px), text в pl-9 (36px) → ~6px зазор. Цвет иконки
                    меняется по состоянию: default=muted, focus=brand-red, filled=text-primary.
                    Border поля тоже становится красным при фокусе через focus:border-brand. */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-name" className="text-xs font-medium text-text-secondary">
                      Name
                    </label>
                    <div className="relative">
                      {/* Иконка: top-0 bottom-0 + flex items-center → надёжное вертикальное центрирование
                          без сабпиксельных смещений от translate(-50%). Wrapper тянется на всю высоту
                          инпута, иконка сидит ровно по центру. */}
                      <span
                        className={`absolute left-3 top-0 bottom-0 inline-flex items-center justify-center w-4 pointer-events-none transition-colors ${fieldColor("name", name)}`}
                      >
                        <i className="fi fi-rc-portrait text-sm leading-none translate-y-[1px]" aria-hidden="true" />
                      </span>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(capitalize(e.target.value))}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="Your name"
                        className="w-full bg-surface-input border border-border-subtle rounded-md pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand focus:bg-surface-input-focus"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-email" className="text-xs font-medium text-text-secondary">
                      Email
                    </label>
                    <div className="relative">
                      <span
                        className={`absolute left-3 top-0 bottom-0 inline-flex items-center justify-center w-4 pointer-events-none transition-colors ${fieldColor("email", email)}`}
                      >
                        <i className="fi fi-rc-envelope text-sm leading-none translate-y-[1px]" aria-hidden="true" />
                      </span>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(capitalize(e.target.value))}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="You@example.com"
                        className="w-full bg-surface-input border border-border-subtle rounded-md pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand focus:bg-surface-input-focus"
                      />
                    </div>
                  </div>
                </div>

                {/* Поле Message — иконка top-3 (textarea многострочный, не центрируем) */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-message" className="text-xs font-medium text-text-secondary">
                    Message
                  </label>
                  <div className="relative">
                    <span
                      className={`absolute left-3 top-[11px] inline-flex items-center justify-center w-4 h-4 pointer-events-none transition-colors ${fieldColor("message", message)}`}
                    >
                      <i className="fi fi-rc-pencil text-sm leading-none translate-y-[1px]" aria-hidden="true" />
                    </span>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(capitalize(e.target.value))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      rows={4}
                      placeholder="Tell me about your project…"
                      className="w-full bg-surface-input border border-border-subtle rounded-md pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none resize-none transition-colors focus:border-brand focus:bg-surface-input-focus"
                    />
                  </div>
                </div>

                {/* Кнопка отправки — primary стиль (как View Work) */}
                <div className="mt-2">
                  <Button
                    variant="primary"
                    type="submit"
                    icon="paper-plane"
                    disabled={status === "sending"}
                    fullWidth
                    centered
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </Button>
                </div>

                {/* Статус отправки */}
                {status === "sent" && (
                  <p className="text-sm text-green-400 text-center">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            </Card>

        </div>
        </AnimatedContent>
    </Section>
  );
}
