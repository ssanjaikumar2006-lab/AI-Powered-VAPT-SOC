import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LuBrainCircuit, LuSend, LuSparkles, LuGitBranch, LuListChecks, LuTarget } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import GaugeChart from "../components/charts/GaugeChart";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip, CartesianGrid, YAxis } from "recharts";
import { aiInsights, chatSeed } from "../utils/mockData";

function RiskTrendMini({ data }) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
        <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis hide domain={[60, 90]} />
        <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 10, fontSize: 12 }} />
        <Line type="monotone" dataKey="score" stroke="#A78BFA" strokeWidth={2} dot={{ r: 3, fill: "#A78BFA" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function AIAnalysis() {
  const [messages, setMessages] = useState(chatSeed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, {
        role: "ai",
        text: "Based on current telemetry, prioritize patching VULN-1042 (SQL Injection, CVSS 9.8) — it's the most likely entry point given the active C2 beaconing pattern on the finance subnet.",
      }]);
    }, 1400);
  };

  return (
    <div>
      <PageHeader title="AI Security Analysis" description="AI-generated risk scoring, root cause, and attack path reconstruction." />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="panel p-5 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-white text-sm mb-3 self-start">AI Risk Score</h3>
          <GaugeChart value={aiInsights.riskScore} />
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>Confidence: <span className="text-white font-medium">{aiInsights.confidence}%</span></p>
        </div>
        <div className="panel p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <LuSparkles className="text-lg" style={{ color: "var(--color-violet)" }} />
            <h3 className="font-semibold text-white text-sm">Executive Summary</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{aiInsights.executiveSummary}</p>
          <div className="mt-4">
            <p className="text-xs font-medium text-white mb-1">Risk Trend (7 days)</p>
            <RiskTrendMini data={aiInsights.riskTrend} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <LuGitBranch className="text-lg" style={{ color: "var(--color-primary)" }} />
            <h3 className="font-semibold text-white text-sm">Reconstructed Attack Path</h3>
          </div>
          <div className="space-y-0">
            {aiInsights.attackPath.map((step, i) => (
              <div key={i} className="flex gap-3 pb-5 last:pb-0 relative">
                {i < aiInsights.attackPath.length - 1 && (
                  <span className="absolute left-[11px] top-6 bottom-0 w-px" style={{ backgroundColor: "var(--color-border)" }} />
                )}
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10" style={{ backgroundColor: "var(--color-primary)", color: "white" }}>
                  {i + 1}
                </div>
                <p className="text-sm pt-0.5" style={{ color: "var(--color-muted)" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <LuTarget className="text-lg" style={{ color: "var(--color-danger)" }} />
            <h3 className="font-semibold text-white text-sm">Root Cause Analysis</h3>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>{aiInsights.rootCause}</p>
          <div className="flex items-center gap-2 mb-3">
            <LuListChecks className="text-lg" style={{ color: "var(--color-warning)" }} />
            <h3 className="font-semibold text-white text-sm">Patch Priority</h3>
          </div>
          <div className="space-y-2">
            {aiInsights.patchPriority.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{p.title}</p>
                  <p className="text-[11px] mono" style={{ color: "var(--color-muted)" }}>{p.id}</p>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-md" style={{
                  backgroundColor: p.priority === "Immediate" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)",
                  color: p.priority === "Immediate" ? "var(--color-danger)" : "var(--color-warning)",
                }}>{p.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Panel */}
      <div className="panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <LuBrainCircuit className="text-lg" style={{ color: "var(--color-violet)" }} />
          <h3 className="font-semibold text-white text-sm">Ask Sentinel AI</h3>
        </div>
        <div ref={scrollRef} className="h-72 overflow-y-auto space-y-3 mb-4 pr-1">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm"
                style={{
                  backgroundColor: m.role === "user" ? "var(--color-primary)" : "var(--color-surface-2)",
                  color: m.role === "user" ? "white" : "var(--color-muted)",
                }}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-2.5 text-sm flex gap-1" style={{ backgroundColor: "var(--color-surface-2)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-muted)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }} />
                ))}
              </div>
            </div>
          )}
        </div>
        <form onSubmit={send} className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about risk posture, a CVE, or remediation steps..." className="input-field flex-1" />
          <button type="submit" className="btn-primary flex items-center gap-2"><LuSend /></button>
        </form>
      </div>
    </div>
  );
}
