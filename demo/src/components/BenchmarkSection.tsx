import { useEffect, useRef, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { models } from '../data/benchmarkData';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg p-3 text-xs font-mono shadow-xl">
      <div className="text-white font-semibold mb-1">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="text-muted">
          {p.name}: <span className="text-accent">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

const findings = [
  {
    icon: '⚡',
    title: 'Scale is the dominant factor',
    body: 'Models above ~70B parameters achieve 100% on SWE-bench pool tasks. Below that, accuracy degrades sharply regardless of specialisation.',
  },
  {
    icon: '🧠',
    title: 'Specialisation ≠ better SWE',
    body: 'codestral (code-specialist) scores 50% on SWE-bench while general-purpose mistral-large scores 100%. Multi-step reasoning matters more than code generation.',
  },
  {
    icon: '💡',
    title: 'Agentic fine-tuning backfired',
    body: 'devstral models used 21+ iterations vs 5.8 for general mistral-large, without better results. Fine-tuning at sub-70B scale may over-explore.',
  },
  {
    icon: '💰',
    title: 'Everything at $0',
    body: 'All 11 models were evaluated exclusively on free-tier quotas — no paid plans or credits.',
  },
];

const BenchmarkSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<'mbpp' | 'swe'>('swe');

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const sweSorted = [...models].sort((a, b) => b.swePct - a.swePct);
  const mbppSorted = [...models].sort((a, b) => b.mbppPct - a.mbppPct);

  const chartData = tab === 'swe'
    ? sweSorted.map(m => ({ name: m.shortName, 'SWE-bench (pool %)': m.swePct, model: m.name }))
    : mbppSorted.map(m => ({ name: m.shortName, 'MBPP %': m.mbppPct, model: m.name }));

  const barKey = tab === 'swe' ? 'SWE-bench (pool %)' : 'MBPP %';
  const topModels = tab === 'swe' ? ['medium', 'large'] : ['GPT-120B', 'large'];

  return (
    <section id="benchmark" ref={ref} className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Benchmark <span className="gradient-text">Results</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted mb-10 max-w-xl">
            11 models evaluated across MBPP (257 algorithmic tasks) and SWE-bench (8 real GitHub bugs).
          </p>
        </div>

        {/* Tab */}
        <div className={`flex gap-2 mb-8 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <button
            onClick={() => setTab('swe')}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all border ${tab === 'swe' ? 'bg-primary text-white border-primary' : 'text-muted border-border hover:border-primary/50'}`}
          >
            SWE-bench
          </button>
          <button
            onClick={() => setTab('mbpp')}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all border ${tab === 'mbpp' ? 'bg-primary text-white border-primary' : 'text-muted border-border hover:border-primary/50'}`}
          >
            MBPP
          </button>
        </div>

        {/* Chart */}
        <div className={`bg-surface border border-border rounded-2xl p-6 mb-10 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="text-xs font-mono text-muted mb-4">
            {tab === 'swe' ? 'SWE-bench pool pass rate (6 tasks) — higher is better' : 'MBPP accuracy (257 tasks) — higher is better'}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f35" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={barKey} radius={[4, 4, 0, 0]}>
                {chartData.map(entry => (
                  <Cell
                    key={entry.name}
                    fill={topModels.includes(entry.name) ? '#7c3aed' : '#1e2135'}
                    stroke={topModels.includes(entry.name) ? '#a78bfa' : '#1a1f35'}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className={`bg-surface border border-border rounded-2xl overflow-hidden mb-12 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-mono text-muted">model</th>
                  <th className="text-right px-4 py-3 text-xs font-mono text-muted">MBPP</th>
                  <th className="text-right px-4 py-3 text-xs font-mono text-muted">SWE (pool)</th>
                  <th className="text-right px-4 py-3 text-xs font-mono text-muted hidden md:table-cell">avg iter</th>
                  <th className="text-right px-4 py-3 text-xs font-mono text-muted hidden md:table-cell">avg time</th>
                </tr>
              </thead>
              <tbody>
                {sweSorted.map((m, i) => (
                  <tr key={m.name} className={`border-b border-border/50 hover:bg-primary/5 transition-colors ${i < 2 ? 'bg-primary/5' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs">
                      {i < 2 && <span className="text-primary-light mr-2">★</span>}
                      <span className={i < 2 ? 'text-white' : 'text-muted'}>{m.name}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      <span className={m.mbppPct >= 90 ? 'text-success' : m.mbppPct >= 80 ? 'text-accent' : 'text-muted'}>
                        {m.mbppPct}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      <span className={m.swePct === 100 ? 'text-success' : m.swePct >= 50 ? 'text-accent' : m.swePct > 0 ? 'text-amber-400' : 'text-muted'}>
                        {m.sweBenchPool}/6 ({m.swePct}%)
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-muted hidden md:table-cell">
                      {m.avgIter ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-muted hidden md:table-cell">
                      {m.avgTimeSec != null ? `${m.avgTimeSec}s` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key findings */}
        <div className={`grid sm:grid-cols-2 gap-4 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          {findings.map(f => (
            <div key={f.title} className="bg-surface border border-border rounded-xl p-5">
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-semibold text-sm mb-2">{f.title}</div>
              <div className="text-muted text-xs leading-relaxed">{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenchmarkSection;
