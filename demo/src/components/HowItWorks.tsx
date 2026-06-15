import { useEffect, useRef, useState } from 'react';
import { Brain, Code2, Eye, CheckCircle, Shield, Wrench } from 'lucide-react';
import { tools } from '../data/benchmarkData';

const loopSteps = [
  {
    icon: <Brain size={20} />,
    label: 'Thought',
    color: 'text-primary-light border-primary/40 bg-primary/10',
    desc: 'The LLM reads the issue and the tool manual, then reasons about which file to look at first.',
  },
  {
    icon: <Code2 size={20} />,
    label: 'Code',
    color: 'text-accent border-accent/40 bg-accent/10',
    desc: 'It emits a Python code block calling MCP tools: read_file, grep, edit_file, run_command…',
  },
  {
    icon: <Eye size={20} />,
    label: 'Observation',
    color: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    desc: 'The sandbox executes the code and returns real stdout/stderr. The LLM sees actual results — no hallucination possible.',
  },
  {
    icon: <CheckCircle size={20} />,
    label: 'final_answer()',
    color: 'text-success border-success/40 bg-success/10',
    desc: 'When tests pass, the agent calls final_answer() with the patch. The loop exits.',
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted mb-16 max-w-xl">
            A tight agentic loop runs inside a Docker container. Each iteration the LLM reasons,
            writes code, and gets back the real execution result before the next step.
          </p>
        </div>

        {/* Loop diagram */}
        <div className={`grid md:grid-cols-4 gap-0 mb-20 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          {loopSteps.map((s, i) => (
            <div key={s.label} className="flex flex-col md:flex-row items-center">
              <div className="flex-1 flex flex-col items-center text-center p-6">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}>
                  {s.icon}
                </div>
                <div className="font-mono font-semibold text-sm mb-2">{s.label}</div>
                <div className="text-xs text-muted leading-relaxed">{s.desc}</div>
              </div>
              {i < loopSteps.length - 1 && (
                <div className="text-border text-xl font-light md:mb-12 mb-2 rotate-90 md:rotate-0">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Two-column: security + tools */}
        <div className={`grid md:grid-cols-2 gap-8 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          {/* Sandbox security */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary-light">
                <Shield size={20} />
              </div>
              <h3 className="font-semibold text-lg">Sandbox Security</h3>
            </div>
            <div className="space-y-3">
              {[
                ['Import firewall', 'Allowlist-only imports — os, socket, subprocess blocked'],
                ['Filesystem guard', 'open() patched to check against allowed_directories'],
                ['Network blocked', 'urllib, http, ssl, requests blocked at import level'],
                ['CPU timeout', 'Daemon thread killed after N seconds'],
                ['Memory cap', 'resource.setrlimit(RLIMIT_AS) on Linux'],
                ['Builtins removed', 'eval, exec, compile, input stripped from namespace'],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-3">
                  <span className="text-success mt-0.5 shrink-0">✓</span>
                  <div>
                    <span className="font-mono text-xs text-primary-light">{name}</span>
                    <span className="text-muted text-xs ml-2">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MCP Tools */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Wrench size={20} />
              </div>
              <h3 className="font-semibold text-lg">MCP Tool Server</h3>
            </div>
            <div className="space-y-2.5">
              {tools.map(t => (
                <div key={t.name} className="flex gap-3 items-start">
                  <code className="text-xs font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded shrink-0">{t.name}</code>
                  <span className="text-muted text-xs">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
