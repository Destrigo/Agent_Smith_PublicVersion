import { useEffect, useRef, useState } from 'react';
import { models } from '../data/benchmarkData';

const findings = [
  { label: 'Scale beats specialisation', body: 'mistral-large (general) passes 6/6 SWE tasks. codestral (code-specialist) passes 3/6. Multi-step reasoning matters more than code generation quality.' },
  { label: 'Hard cliff below 70B', body: 'Below ~70B parameters, SWE-bench accuracy degrades sharply. The 3B→8B jump is the biggest single gain; 8B→22B actually regresses.' },
  { label: 'Agentic fine-tuning backfired', body: 'devstral used 21+ iterations vs 5.8 for mistral-large, without better results. Fine-tuning at sub-70B scale over-explores without improving accuracy.' },
  { label: '$0 total cost', body: 'All 11 models were evaluated on free-tier API quotas only. mistral-large runs ~0.08 RPS on the Mistral free tier with zero rate-limit hits.' },
];

const InlineBar = ({ pct, color = 'bg-primary' }: { pct: number; color?: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
    <span className="font-mono text-xs w-8 text-right">{pct}%</span>
  </div>
);

const BenchmarkSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<'swe' | 'mbpp'>('swe');

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const sorted = tab === 'swe'
    ? [...models].sort((a, b) => b.swePct - a.swePct)
    : [...models].sort((a, b) => b.mbppPct - a.mbppPct);

  return (
    <section id="benchmark" ref={ref} className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">

        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Results</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Benchmark</h2>
          <hr className="rule-amber w-12 mb-4" />
          <p className="text-sm text-zinc-400 mb-10">
            11 models · 257 MBPP tasks · 8 SWE-bench real bugs · all on free-tier APIs
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 mb-6 p-1 bg-surface border border-border rounded-lg w-fit section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          {(['swe', 'mbpp'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-xs px-4 py-1.5 rounded transition-all ${
                tab === t ? 'bg-primary text-black font-semibold' : 'text-muted hover:text-white'
              }`}
            >
              {t === 'swe' ? 'SWE-bench' : 'MBPP'}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className={`border border-border rounded-lg overflow-hidden mb-12 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-4 py-2.5 font-mono text-muted font-normal">#</th>
                <th className="text-left px-4 py-2.5 font-mono text-muted font-normal">model</th>
                <th className="text-left px-4 py-2.5 font-mono text-muted font-normal hidden md:table-cell">provider</th>
                <th className="text-left px-4 py-2.5 font-mono text-muted font-normal">
                  {tab === 'swe' ? 'SWE-bench (pool 6)' : 'MBPP (257 tasks)'}
                </th>
                <th className="text-right px-4 py-2.5 font-mono text-muted font-normal hidden sm:table-cell">
                  {tab === 'swe' ? 'avg iter' : 'passed'}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => {
                const pct = tab === 'swe' ? m.swePct : m.mbppPct;
                const barColor = pct === 100 ? 'bg-success' : pct >= 80 ? 'bg-primary' : pct >= 50 ? 'bg-zinc-500' : 'bg-zinc-700';
                const isTop = i < 2;
                return (
                  <tr key={m.name} className={`border-b border-border/50 last:border-0 ${isTop ? 'bg-primary/5' : 'hover:bg-zinc-900'} transition-colors`}>
                    <td className="px-4 py-2.5 font-mono text-muted">{i + 1}</td>
                    <td className="px-4 py-2.5 font-mono">
                      <span className={isTop ? 'text-white' : 'text-zinc-400'}>{m.name}</span>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-600 hidden md:table-cell">{m.provider}</td>
                    <td className="px-4 py-2.5">
                      <InlineBar pct={pct} color={barColor} />
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-zinc-500 hidden sm:table-cell">
                      {tab === 'swe'
                        ? (m.avgIter != null ? m.avgIter : '—')
                        : m.mbppPassed
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Findings */}
        <div className={`grid sm:grid-cols-2 gap-4 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          {findings.map(f => (
            <div key={f.label} className="border-l-2 border-primary/40 pl-4 py-1">
              <div className="text-sm font-semibold mb-1">{f.label}</div>
              <div className="text-xs text-zinc-400 leading-relaxed">{f.body}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenchmarkSection;
