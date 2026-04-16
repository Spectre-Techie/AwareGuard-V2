/**
 * @file LearningAI.jsx
 * @description AI tutor integrated into learning modules
 * Provides personalized explanations, clarifications, and quiz help
 * Uses existing AskAwareGuard AI API for consistency
 * Full dark mode support
 */

import React, { useState, useRef, useEffect } from "react";
import { Bot, X } from "lucide-react";
import DOMPurify from "dompurify";
import { marked } from "marked";

const baseURL = "https://awareguard-backend.onrender.com";

/**
 * LearningAI Component
 * Context-aware AI tutor for learning modules
 */
const LearningAI = ({
  module,
  lesson,
  lessonIndex = 0,
  quiz = null,
  isCompact = false,
  onClose = () => {},
}) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isOpen, setIsOpen] = useState(isCompact);

  const answerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    answerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const formatAIText = (text) => {
    const html = marked(text);
    return DOMPurify.sanitize(html);
  };

  const buildContextualPrompt = (userQuestion) => {
    return `
You are a helpful tutor assisting a student learning about: "${module?.title || "Cybersecurity"}"

Current Lesson: "${lesson?.title || "General"}"
Module Description: ${module?.description || ""}

Lesson Content Preview:
${lesson?.content?.substring(0, 500) || ""}

Student Question: ${userQuestion}

Please provide:
1. A clear, helpful answer in 2-3 sentences
2. Any relevant tips or examples
3. Links to further resources if applicable

Keep responses concise and educational. Focus on practical cybersecurity knowledge.
    `.trim();
  };

  const sendQuestion = async (e) => {
    e.preventDefault();
    const question = userInput.trim();
    if (!question) return;

    setError("");
    setLoading(true);

    const messages = [
      {
        role: "system",
        content: `You are an expert cybersecurity tutor helping someone learn about ${module?.title}. Be encouraging, clear, and practical.`,
      },
      ...conversations.flatMap((c) => [
        { role: "user", content: c.question },
        { role: "assistant", content: c.answer },
      ]),
      { role: "user", content: question },
    ];

    try {
      const contextualPrompt = buildContextualPrompt(question);

      const response = await fetch(`${baseURL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: contextualPrompt,
          messages,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      setConversations((prev) => [
        ...prev,
        {
          question,
          answer: formatAIText(data.answer),
          timestamp: new Date(),
        },
      ]);

      setUserInput("");
      inputRef.current?.focus();
    } catch (err) {
      console.error("AI Error:", err);
      setError(err.message || "Failed to get AI response. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Closed state — floating button
  if (!isOpen) {
    if (isCompact) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
          title="Open AI Tutor"
        >
          <Bot className="w-5 h-5" />
          Open AI Tutor
        </button>
      );
    }

    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-bold flex items-center gap-2 z-50 text-sm sm:text-base"
        title="Open AI Tutor"
      >
        <Bot className="w-5 h-5" />
        AI Tutor
      </button>
    );
  }

  const panelClassName = isCompact
    ? "w-full max-h-[75vh] sm:max-h-[32rem] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 overflow-hidden"
    : "fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 bg-white dark:bg-slate-900 rounded-xl shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 w-auto sm:w-96 max-h-[78vh] sm:max-h-96 flex flex-col z-50 overflow-hidden";

  return (
    <div className={panelClassName}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-bold text-sm sm:text-base">Learning AI Tutor</h3>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
          className="text-white hover:bg-white/20 rounded px-2 py-1 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Current Lesson Context */}
      <div className="bg-blue-50 dark:bg-blue-500/10 px-4 py-2 border-b border-slate-200 dark:border-slate-700 text-xs">
        <p className="font-semibold text-slate-700 dark:text-slate-200">
          {module?.title} - Lesson {lessonIndex + 1}
        </p>
        <p className="text-slate-500 dark:text-slate-400">{lesson?.title}</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {conversations.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
              Hi! I&apos;m your learning tutor. Ask me anything about this lesson.
            </p>
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Quick questions:</p>
              <div className="space-y-1">
                {[
                  "Can you explain this more simply?",
                  "Give me a real-world example",
                  "How do I apply this?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setUserInput(q)}
                    className="block w-full text-left px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {conversations.map((conv, idx) => (
              <div key={idx} className="space-y-2">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-lg max-w-[85%] sm:max-w-xs text-sm break-words">
                    {conv.question}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 px-3 py-2 rounded-lg max-w-[85%] sm:max-w-xs text-sm break-words">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none break-words [&_pre]:whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: conv.answer }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={answerRef} />
          </>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-3 py-2 rounded text-xs">
            {error}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3">
        <form onSubmit={sendQuestion} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 min-w-0 px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !userInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 shrink-0"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LearningAI;
