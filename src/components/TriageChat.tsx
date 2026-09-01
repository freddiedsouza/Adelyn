"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Role = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
}

const QUICK_QUESTIONS = [
  "What should I wear for my first session?",
  "Do I need to bring my MRI or scan reports?",
  "What happens during the first appointment?",
  "How should I prepare for a virtual consultation?",
  "How do I reschedule or cancel?",
];

interface ResponseRule {
  keywords: string[];
  answer: string;
}

const RESPONSE_RULES: ResponseRule[] = [
  {
    keywords: ["wear", "clothing", "clothes", "dress", "outfit"],
    answer:
      "Wear loose, comfortable clothing you can move freely in — shorts or leggings with a t-shirt work well. For a shoulder or neck assessment, a vest top is helpful. Avoid stiff jeans.",
  },
  {
    keywords: ["mri", "scan", "x-ray", "xray", "ultrasound", "report", "imaging", "ct"],
    answer:
      "Yes, please bring any recent MRI, X-ray, ultrasound, or CT reports, and the images themselves if you have them on disc or a hospital portal. They help Dr. Adelyn target your assessment.",
  },
  {
    keywords: ["first", "expect", "happen", "what will", "initial"],
    answer:
      "Your first appointment runs 45–60 minutes: a detailed history, a physical assessment, a working diagnosis, and the start of your treatment plan. You will leave with initial exercises to begin at home.",
  },
  {
    keywords: ["virtual", "telehealth", "video", "online", "remote"],
    answer:
      "For a virtual consultation you will receive a secure video link by email. Join from a quiet room with space to move, wear clothing suitable for movement, and keep a chair and a resistance band or towel nearby.",
  },
  {
    keywords: ["reschedule", "cancel", "change", "move my", "postpone"],
    answer:
      "You can reschedule or cancel free of charge up to 24 hours before your appointment. Within 24 hours a fee may apply. Reply to your confirmation email quoting your AP- booking reference.",
  },
  {
    keywords: ["pain", "sore", "hurt", "ache", "after treatment"],
    answer:
      "Mild soreness for 24–48 hours after treatment or new exercises is common and settles. Sharp, worsening, or spreading pain is not expected — pause the exercise and contact the clinic.",
  },
  {
    keywords: ["referral", "gp", "doctor's note", "doctors note", "prescription"],
    answer:
      "You do not need a GP referral to book physiotherapy directly. If you plan to claim through insurance, check whether your provider requires a referral first.",
  },
  {
    keywords: ["cost", "price", "fee", "payment", "pay", "insurance", "invoice"],
    answer:
      "Fees are listed on each service in the catalogue. Payment is taken after the session, and we can provide an itemised invoice for insurance reimbursement.",
  },
  {
    keywords: ["how long", "how many", "sessions", "recovery time", "take to"],
    answer:
      "It depends on the condition, but many patients notice meaningful change within 4–6 sessions. Dr. Adelyn will give you an estimated timeline after the first assessment.",
  },
  {
    keywords: ["late", "arrive", "early", "parking", "directions"],
    answer:
      "Please arrive 10 minutes early; there is step-free access and on-site parking. If you are running late, call the clinic — sessions cannot always be extended if another patient follows.",
  },
];

const FALLBACK_ANSWER =
  "Thanks for your question. For anything clinical or urgent, please call the clinic directly. Otherwise, Dr. Adelyn will go through this with you at your appointment — you can also add details in the medical intake when booking.";

function getSimulatedReply(input: string): string {
  const normalised = input.toLowerCase();
  const match = RESPONSE_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalised.includes(keyword)),
  );
  return match ? match.answer : FALLBACK_ANSWER;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hi, I'm the pre-consultation assistant for Dr. Adelyn Pereira's clinic. Ask me anything about preparing for your visit. Pick a question below or type your own.",
};

export default function TriageChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const replyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(
    () => () => {
      if (replyTimeout.current) clearTimeout(replyTimeout.current);
    },
    [],
  );

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    replyTimeout.current = setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        text: getSimulatedReply(trimmed),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <section className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white md:h-[640px] dark:border-zinc-800 dark:bg-zinc-900">
      <header className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Pre-consultation chat
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          General preparation guidance only — not medical advice.
        </p>
      </header>

      {/* Message list */}
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <div
              className={[
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6",
                message.role === "user"
                  ? "bg-teal-700 text-white"
                  : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
              ].join(" ")}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping ? (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
              <span className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
              </span>
            </div>
          </div>
        ) : null}

        <div ref={scrollAnchorRef} />
      </div>

      {/* Quick questions */}
      <div className="border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => sendMessage(question)}
              disabled={isTyping}
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-teal-400"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 flex items-center gap-2 border-t border-zinc-200 bg-white px-5 py-3 md:static dark:border-zinc-800 dark:bg-zinc-900"
      >
        <label htmlFor="triage-input" className="sr-only">
          Type your question
        </label>
        <input
          id="triage-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your question…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  );
}
