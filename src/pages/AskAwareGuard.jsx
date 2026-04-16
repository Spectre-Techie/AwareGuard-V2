import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShieldCheck, Sparkles, Bot, User, AlertCircle, MessageSquare, Lightbulb, Shield, Search } from "lucide-react";

const baseURL = "https://awareguard-backend.onrender.com";

const suggestions = [
  { text: "How can I verify if a job offer is real?", icon: Search },
  { text: "What are common signs of a loan app scam?", icon: Shield },
  { text: "How do I check if a message is phishing?", icon: MessageSquare },
  { text: "What should I do after paying a scammer?", icon: Lightbulb },
];

const cannedResponses = [
  {
    patterns: ["hi", "hello", "hey", "hi.", "hello.", "hey."],
    answer:
      "Hi! I'm AwareGuard, your scam-awareness assistant.\n\n" +
      "You can ask me things like:\n" +
      "- How to verify a job offer\n" +
      "- How to check if a message is phishing\n" +
      "- What to do after sending money to a scammer\n\n" +
      "Type your question or tap one of the suggestions.",
  },
  {
    patterns: [
      "who are you", "what are you", "what are you built for",
      "what do you do", "what is awareguard", "tell me about yourself",
    ],
    answer:
      "I'm AwareGuard - an AI assistant focused entirely on online safety and scam awareness.\n\n" +
      "I help you:\n" +
      "- Understand common scam tricks\n" +
      "- Analyse suspicious messages, links, job offers, or loan apps\n" +
      "- Suggest what to do next if you think you've been scammed\n\n" +
      "Share any situation that feels unusual, and I'll help you break it down.",
  },
];

const getCannedResponse = (text) => {
  const normalized = text.trim().toLowerCase();
  for (const item of cannedResponses) {
    if (item.patterns.some((p) => normalized === p || normalized.includes(p))) {
      return item.answer;
    }
  }
  return null;
};

const formatAIText = (text) => {
  const html = marked(text);
  return DOMPurify.sanitize(html);
};

const AskAwareGuard = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversations, setConversations] = useState([]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll chat container to bottom (keeps input visible)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversations, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [userInput]);

  const sendPrompt = async (prompt, { allowCanned = true } = {}) => {
    const question = prompt.trim();
    if (!question) return;

    setError("");

    if (allowCanned) {
      const canned = getCannedResponse(question);
      if (canned) {
        setConversations((prev) => [
          ...prev,
          { question, answer: formatAIText(canned) },
        ]);
        setUserInput("");
        textareaRef.current?.focus();

        (async () => {
          try {
            await fetch(`${baseURL}/api/ask`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: "Warm up.", messages: [] }),
            });
          } catch (err) {
            console.warn("Warm-up failed - safe to ignore.");
          }
        })();
        return;
      }
    }

    setLoading(true);
    setConversations((prev) => [...prev, { question, answer: null }]);

    const messages = [
      ...conversations.flatMap((c) => [
        { role: "user", content: c.question },
        ...(c.answer ? [{ role: "assistant", content: c.answer }] : []),
      ]),
      { role: "user", content: question },
    ];

    try {
      const res = await fetch(`${baseURL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question, messages }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Unexpected server response. Try again.");
      }

      if (!res.ok) throw new Error(data.error || "Server error");

      setConversations((prev) =>
        prev.map((c, i) =>
          i === prev.length - 1 ? { ...c, answer: formatAIText(data.answer) } : c
        )
      );
      setUserInput("");
    } catch (err) {
      setError(err.message);
      setConversations((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || loading) return;
    sendPrompt(userInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const hasMessages = conversations.length > 0;

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              AwareGuard AI
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Online
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI-powered scam detection assistant</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {!hasMessages ? (
            /* Welcome State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full min-h-[50vh]"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">How can I help you stay safe?</h2>
              <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
                Paste a suspicious message, describe a situation, or ask about common scam tactics. I'm here to help.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => sendPrompt(s.text)}
                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all text-left group"
                  >
                    <s.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{s.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Messages */
            <div className="space-y-6">
              <AnimatePresence>
                {conversations.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm">
                          <p className="text-sm leading-relaxed">{msg.question}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </div>
                        {msg.answer ? (
                          <div
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm prose prose-sm dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: msg.answer }}
                          />
                        ) : (
                          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                              </div>
                              <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">Thinking...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex-shrink-0 px-4"
          >
            <div className="max-w-3xl mx-auto mb-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors shadow-sm">
            <textarea
              ref={textareaRef}
              className="flex-1 bg-transparent border-0 outline-none ring-0 resize-none appearance-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm py-2 px-2 min-h-[40px] max-h-[160px] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              placeholder="Ask about a suspicious message, link, or situation..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-2">
            AwareGuard AI provides safety guidance. Always verify with official sources.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AskAwareGuard;
