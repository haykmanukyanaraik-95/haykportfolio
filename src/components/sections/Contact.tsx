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

export default function Contact() {
  // Состояние полей формы
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Левая колонка — электрический логотип (2x меньше + центр на мобилке) */}
            <div className="flex justify-center lg:justify-start items-center">
              {/* Мобилка: 210x200, десктоп: 420x400 */}
              <div className="lg:hidden">
                <ElectricLogo
                  logoSrc="/images/logo.svg"
                  width={210}
                  height={200}
                  color="var(--color-brand)"
                  speed={1}
                  chaos={0.12}
                  thickness={1.5}
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
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Let&apos;s Create Something Together
              </h2>
              <p className="text-sm text-text-secondary mb-8">
                Drop me a line — I reply within a day.
              </p>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Линия 1: Name + Email в одной горизонтальной линии */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-xs font-medium text-text-secondary">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted outline-none transition-colors focus:border-brand focus:bg-white/[0.06]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-xs font-medium text-text-secondary">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted outline-none transition-colors focus:border-brand focus:bg-white/[0.06]"
                    />
                  </div>
                </div>

                {/* Поле Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-xs font-medium text-text-secondary">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Tell me about your project…"
                    className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted outline-none resize-none transition-colors focus:border-brand focus:bg-white/[0.06]"
                  />
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
