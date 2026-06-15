import { Github, ArrowDown, Terminal } from 'lucide-react';

const stats = [
  { value: '7/8', label: 'SWE-bench tasks' },
  { value: '91%', label: 'MBPP accuracy' },
  { value: '11', label: 'models benchmarked' },
  { value: '$0', label: 'API cost' },
];

const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-14">
    {/* Background blobs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-xs font-mono mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        42 School — AI Agents project
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        <span className="gradient-text">Agent Smith</span>
      </h1>

      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
        An autonomous coding agent that reads a GitHub issue, navigates the codebase,
        applies a patch, and verifies it — all inside a secure Docker sandbox.
      </p>

      <div className="flex items-center justify-center gap-2 text-sm font-mono text-slate-500 mb-12">
        <Terminal size={14} />
        <span>Thought → Code → Observation → repeat</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map(s => (
          <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
            <div className="text-2xl font-bold gradient-text mb-1">{s.value}</div>
            <div className="text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a
          href="https://github.com/Destrigo/Agent_Smith_PublicVersion"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-all glow-primary"
        >
          <Github size={18} />
          View on GitHub
        </a>
        <a
          href="#trace"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/50 hover:text-primary-light text-slate-300 font-medium transition-all"
        >
          See it in action
          <ArrowDown size={16} />
        </a>
      </div>

      <a href="#how-it-works" className="text-muted hover:text-white transition-colors text-sm flex flex-col items-center gap-2">
        <span>Scroll to explore</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </div>
  </section>
);

export default Hero;
