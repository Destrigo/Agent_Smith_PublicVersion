import { Github } from 'lucide-react';

const terminalLines = [
  { prompt: true,  text: 'make run-swebench MODEL=mistral-large-latest' },
  { prompt: false, text: 'Task  sympy__sympy-13480  ── NameError in hyperbolic.py', dim: true },
  { prompt: false, text: '' },
  { prompt: false, text: 'iter 1  grep_context("cotm is S.ComplexInfinity")', amber: true },
  { prompt: false, text: '        → found line 590: `if cotm is S.ComplexInfinity:`', dim: true },
  { prompt: false, text: 'iter 2  read_file(hyperbolic.py, 585:600)', amber: true },
  { prompt: false, text: '        → context loaded, bug confirmed', dim: true },
  { prompt: false, text: 'iter 3  edit_file(cotm → cothm)', amber: true },
  { prompt: false, text: '        → OK: replaced', dim: true },
  { prompt: false, text: 'iter 4  run_command(python -c "coth(log(tan(x))).subs(x, 2)")', amber: true },
  { prompt: false, text: '        → coth(log(-tan(2)))  [no NameError]', dim: true },
  { prompt: false, text: '' },
  { prompt: false, text: '✓  PASS  4 iterations · 14,775 tokens · 10.4 s · 1 line changed', green: true },
];

const stats = [
  { value: '7/8',  label: 'SWE-bench' },
  { value: '91%',  label: 'MBPP' },
  { value: '11',   label: 'models' },
  { value: '$0',   label: 'API cost' },
];

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center pt-14 pb-20">
    <div className="max-w-5xl mx-auto px-6 w-full">

      {/* Top label */}
      <div className="font-mono text-xs text-muted mb-10 tracking-wider">
        git@github.com:Destrigo/Agent_Smith_PublicVersion
      </div>

      {/* Two-column: title + terminal */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

        {/* Left: text */}
        <div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none mb-6">
            Agent<br />
            <span className="text-primary">Smith</span>
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed mb-10 max-w-sm">
            Autonomous SWE-bench agent. Reads a GitHub issue,
            navigates the codebase, applies a patch, passes the tests.
          </p>

          {/* Stats — raw numbers, no cards */}
          <div className="flex gap-10 mb-10">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-mono font-bold text-white">{s.value}</div>
                <div className="text-xs text-muted mt-0.5 font-mono">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://github.com/Destrigo/Agent_Smith_PublicVersion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-black text-sm font-semibold hover:bg-primary-light transition-colors"
            >
              <Github size={16} />
              View on GitHub
            </a>
            <a
              href="#trace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-border text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors font-mono"
            >
              see the demo ↓
            </a>
          </div>
        </div>

        {/* Right: terminal window */}
        <div className="bg-[#0d1117] border border-border rounded-lg overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-[#0a0a0c]">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-3 font-mono text-xs text-zinc-600">bash</span>
          </div>
          {/* Output */}
          <div className="p-4 font-mono text-xs space-y-0.5 leading-relaxed">
            {terminalLines.map((line, i) => (
              <div key={i} className={
                line.green ? 'text-success' :
                line.amber ? 'text-primary' :
                line.dim   ? 'text-zinc-600' :
                             'text-zinc-300'
              }>
                {line.prompt && <span className="text-zinc-600 select-none">$ </span>}
                {line.text}
                {i === terminalLines.length - 1 && <span className="cursor-blink" />}
              </div>
            ))}
          </div>
        </div>

      </div>

      <hr className="rule-amber" />
    </div>
  </section>
);

export default Hero;
