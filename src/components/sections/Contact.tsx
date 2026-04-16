// Секция 5: Let's Talk — электрическая анимация логотипа слева + форма справа
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AnimatedContent from "@/components/shared/AnimatedContent";
import ShinyText from "@/components/shared/ShinyText";
import GlareHover from "@/components/shared/GlareHover";

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
    <section id="contact" className="py-[92px] lg:py-[161px]">
      <div className="mx-auto max-w-[1280px] px-6">

        <AnimatedContent distance={40} duration={0.8} delay={0} revealOverlay>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[28px] lg:gap-16 items-center">

          {/* Левая колонка — электрический логотип (2x меньше + центр на мобилке) */}
            <div className="flex justify-center lg:justify-start items-center">
              {/* Мобилка: 210x200, десктоп: 420x400 */}
              <div className="lg:hidden">
                <ElectricLogo
                  logoSrc="/images/logo.svg"
                  width={210}
                  height={200}
                  color="#F23F3B"
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
                  color="#F23F3B"
                  speed={1}
                  chaos={0.12}
                  thickness={2}
                />
              </div>
            </div>

          {/* Правая колонка — glass-карточка (p-4 на мобилке как Expertise, p-6 на десктопе) */}
            <div
              className="bg-white/[0.015] backdrop-blur-[20px] border border-white/10 rounded-lg p-4 lg:p-6"
            >
              {/* Заголовок и подзаголовок формы — статические, без анимации */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
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
                  <GlareHover
                    width="auto"
                    height="auto"
                    background="#F23F3B"
                    borderRadius="8px"
                    borderColor="transparent"
                    glareColor="#ffa8a8"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={275}
                    transitionDuration={800}
                  >
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group/btn inline-flex items-center justify-center text-white text-base font-medium px-5 py-3 w-full disabled:opacity-60"
                    >
                      <i
                        className="fi fi-rr-paper-plane text-sm leading-[1] flex items-center overflow-hidden opacity-0 max-w-0 mr-0 group-hover/btn:opacity-100 group-hover/btn:max-w-[18px] group-hover/btn:mr-2 transition-all duration-300 ease-out"
                        aria-hidden="true"
                      />
                      <ShinyText
                        text={status === "sending" ? "Sending..." : "Send Message"}
                        speed={3.5}
                        delay={3}
                        color="#ffffff"
                        shineColor="#ffffff80"
                        className="leading-[1]"
                        pauseOnHover
                      />
                    </button>
                  </GlareHover>
                </div>

                {/* Статус отправки */}
                {status === "sent" && (
                  <p className="text-sm text-green-400 text-center">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>

        </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
