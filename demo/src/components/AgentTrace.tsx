import { useEffect, useRef, useState } from 'react';
import { Brain, Code2, Eye, Search, FileText, Edit3, Play } from 'lucide-react';
import { agentTrace } from '../data/benchmarkData';

const toolIcons: Record<string, React.ReactNode> = {
  grep_context: <Search size={14} />,
  read_file: <FileText size={14} />,
  edit_file: <Edit3 size={14} />,
  run_command: <Play size={14} />,
};

const AgentTrace = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showPatch, setShowPatch] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const step = agentTrace.steps[activeStep];

  return (
    <section id="trace" ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Live <span className="gradient-text">Agent Trace</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted mb-2 max-w-xl">
            Real run on <code className="text-accent text-sm font-mono">sympy__sympy-13480</code> — a NameError bug in SymPy's hyperbolic functions.
            Solved in <strong className="text-white">4 iterations</strong>, <strong className="text-white">14k tokens</strong>, <strong className="text-white">10 seconds</strong>.
          </p>
        </div>

        {/* Issue banner */}
        <div className={`mt-8 mb-8 p-4 rounded-xl border border-amber-400/20 bg-amber-400/5 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div className="text-xs font-mono text-amber-400 mb-2">ISSUE</div>
          <p className="text-sm text-slate-300 leading-relaxed">{agentTrace.issue}</p>
        </div>

        {/* Step selector */}
        <div className={`flex flex-wrap gap-2 mb-6 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {agentTrace.steps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => { setActiveStep(i); setShowPatch(false); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all border ${
                activeStep === i && !showPatch
                  ? 'bg-primary text-white border-primary glow-primary'
                  : 'text-muted border-border hover:border-primary/50 hover:text-white'
              }`}
            >
              {toolIcons[s.tool]}
              Step {s.step}: {s.label}
            </button>
          ))}
          <button
            onClick={() => setShowPatch(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all border ${
              showPatch
                ? 'bg-success text-white border-success'
                : 'text-muted border-border hover:border-success/50 hover:text-success'
            }`}
          >
            ✓ Final Patch
          </button>
        </div>

        {/* Content */}
        {!showPatch ? (
          <div className={`grid md:grid-cols-2 gap-4 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            {/* Left: Thought */}
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3 text-primary-light">
                  <Brain size={15} />
                  <span className="text-xs font-mono uppercase tracking-wider">Thought</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{step.thought}</p>
              </div>

              {/* Tool badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 w-fit">
                <span className="text-accent">{toolIcons[step.tool]}</span>
                <code className="text-xs font-mono text-accent">{step.tool}()</code>
              </div>

              {/* Code */}
              <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-[#0d1117]">
                  <Code2 size={13} className="text-muted" />
                  <span className="text-xs font-mono text-muted">sandbox input</span>
                </div>
                <pre className="code-block border-0 rounded-none text-xs">{step.code}</pre>
              </div>
            </div>

            {/* Right: Observation */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-[#0d1117]">
                <Eye size={13} className="text-muted" />
                <span className="text-xs font-mono text-muted">observation</span>
                {step.status === 'ok' && (
                  <span className="ml-auto text-xs text-success font-mono">● ok</span>
                )}
              </div>
              <pre className="code-block border-0 rounded-none text-xs h-full min-h-[200px]">{step.observation}</pre>
            </div>
          </div>
        ) : (
          <div className={`bg-surface border border-border rounded-xl overflow-hidden section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-[#0d1117]">
              <span className="text-xs font-mono text-success">✓ patch applied — tests pass</span>
              <span className="ml-auto text-xs text-muted font-mono">git diff HEAD</span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed">
              {agentTrace.patch.split('\n').map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('+') && !line.startsWith('+++') ? 'diff-add px-2 rounded' :
                    line.startsWith('-') && !line.startsWith('---') ? 'diff-remove px-2 rounded' :
                    line.startsWith('@@') || line.startsWith('diff') || line.startsWith('index') || line.startsWith('---') || line.startsWith('+++') ? 'diff-meta' :
                    'text-slate-400'
                  }
                >
                  {line || ' '}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border bg-success/5 flex items-center gap-4 text-xs text-muted font-mono">
              <span className="text-success">● passed</span>
              <span>{agentTrace.iterations} iterations</span>
              <span>{agentTrace.inputTokens.toLocaleString()} input tokens</span>
              <span>{agentTrace.totalTimeSec}s wall clock</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentTrace;
