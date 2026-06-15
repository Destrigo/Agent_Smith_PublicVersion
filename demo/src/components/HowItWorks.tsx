import { useEffect, useRef, useState } from 'react';
import { tools } from '../data/benchmarkData';

const loopSteps = [
  {
    label: 'Thought',
    color: 'text-zinc-200',
    border: 'border-zinc-700',
    desc: 'LLM reads the issue and the tool manual. Reasons about which file to look at and what to call.',
  },
  {
    label: 'Code',
    color: 'text-primary',
    border: 'border-primary/40',
    desc: 'Emits a Python code block: read_file, grep_context, edit_file, run_command — real tool calls, not pseudocode.',
  },
  {
    label: 'Observation',
    color: 'text-zinc-400',
    border: 'border-zinc-600',
    desc: 'Sandbox executes the code and returns real stdout/stderr. The LLM sees actual results — no hallucinated output.',
  },
  {
    label: 'final_answer()',
    color: 'text-success',
    border: 'border-success/40',
    desc: 'When tests pass, the agent calls final_answer() with the patch diff. Loop exits.',
  },
];

const securityRows = [
  ['Import firewall', 'Allowlist-only — os, socket, subprocess blocked'],
  ['Filesystem guard', 'open() patched against allowed_directories'],
  ['Network blocked', 'urllib, http, ssl, requests blocked at import'],
  ['CPU timeout', 'Daemon thread killed after N seconds'],
  ['Memory cap', 'resource.setrlimit(RLIMIT_AS) on Linux'],
  ['Builtins removed', 'eval, exec, compile, input stripped'],
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
    <section id="how-it-works" ref={ref} className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            How it works
          </h2>
          <hr className="rule-amber w-12 mb-12" />
        </div>

        {/* The loop — vertical list, not cards */}
        <div className={`mb-16 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div className="relative pl-6 border-l border-border space-y-8">
            {loopSteps.map((s, i) => (
              <div key={s.label} className="relative">
                {/* Dot on the line */}
                <div className={`absolute -left-[25px] w-3 h-3 rounded-full border-2 bg-bg ${s.border}`} />
                <div className="flex items-baseline gap-4">
                  <span className={`font-mono text-sm font-semibold ${s.color} w-32 shrink-0`}>
                    {String(i + 1).padStart(2, '0')} {s.label}
                  </span>
                  <span className="text-sm text-zinc-400 leading-relaxed">{s.desc}</span>
                </div>
              </div>
            ))}
            {/* Loop back arrow */}
            <div className="relative">
              <div className="absolute -left-[25px] w-3 h-3 flex items-center justify-center">
                <span className="text-zinc-600 text-xs">↺</span>
              </div>
              <span className="font-mono text-xs text-zinc-600">repeats until final_answer() or limit reached</span>
            </div>
          </div>
        </div>

        {/* Two-column: security + tools */}
        <div className={`grid md:grid-cols-2 gap-6 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>

          {/* Sandbox */}
          <div className="border border-border rounded-lg p-5">
            <div className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Sandbox isolation</div>
            <table className="w-full text-xs">
              <tbody>
                {securityRows.map(([name, desc]) => (
                  <tr key={name} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-3 font-mono text-primary-light whitespace-nowrap">{name}</td>
                    <td className="py-2 text-zinc-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tools */}
          <div className="border border-border rounded-lg p-5">
            <div className="font-mono text-xs text-muted tracking-widest uppercase mb-4">MCP tools</div>
            <div className="space-y-2">
              {tools.map(t => (
                <div key={t.name} className="flex gap-3 text-xs">
                  <code className="text-primary font-mono shrink-0 w-36">{t.name}()</code>
                  <span className="text-zinc-500">{t.desc}</span>
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
