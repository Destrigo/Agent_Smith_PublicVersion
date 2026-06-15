import { useEffect, useRef, useState } from 'react';
import { agentTrace } from '../data/benchmarkData';

const toolColor: Record<string, string> = {
  grep_context: 'text-zinc-400',
  read_file:    'text-zinc-400',
  edit_file:    'text-primary',
  run_command:  'text-success',
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
    <section id="trace" ref={ref} className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">

        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Live run</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Agent trace</h2>
          <hr className="rule-amber w-12 mb-6" />
          <p className="text-sm text-zinc-400 mb-2">
            Real execution on{' '}
            <code className="font-mono text-primary text-xs">{agentTrace.taskId}</code>.
            Solved in <strong className="text-white">{agentTrace.iterations} iterations</strong>,{' '}
            <strong className="text-white">{agentTrace.inputTokens.toLocaleString()} tokens</strong>,{' '}
            <strong className="text-white">{agentTrace.totalTimeSec}s</strong>.
          </p>
        </div>

        {/* Issue block */}
        <div className={`mt-8 mb-6 border-l-2 border-zinc-700 pl-4 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div className="font-mono text-xs text-muted uppercase tracking-wider mb-1">Issue</div>
          <p className="text-sm text-zinc-300 leading-relaxed">{agentTrace.issue}</p>
        </div>

        {/* Step tabs */}
        <div className={`flex flex-wrap gap-2 mb-5 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          {agentTrace.steps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => { setActiveStep(i); setShowPatch(false); }}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all ${
                activeStep === i && !showPatch
                  ? 'bg-primary text-black border-primary font-semibold'
                  : 'text-muted border-border hover:border-zinc-500 hover:text-white'
              }`}
            >
              {s.step}. {s.label}
            </button>
          ))}
          <button
            onClick={() => setShowPatch(true)}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-all ${
              showPatch
                ? 'bg-success text-black border-success font-semibold'
                : 'text-muted border-border hover:border-success/50 hover:text-success'
            }`}
          >
            ✓ patch
          </button>
        </div>

        {!showPatch ? (
          <div className={`grid md:grid-cols-2 gap-4 section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>

            {/* Thought + Code */}
            <div className="space-y-3">
              <div className="border border-border rounded-lg p-4">
                <div className="font-mono text-xs text-muted uppercase tracking-wider mb-3">Thought</div>
                <p className="text-sm text-zinc-300 leading-relaxed">{step.thought}</p>
              </div>
              <div className="bg-[#0d1117] border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="font-mono text-xs text-muted">code → sandbox</span>
                  <code className={`font-mono text-xs ${toolColor[step.tool] ?? 'text-zinc-400'}`}>{step.tool}()</code>
                </div>
                <pre className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">{step.code}</pre>
              </div>
            </div>

            {/* Observation */}
            <div className="bg-[#0d1117] border border-border rounded-lg overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <span className="font-mono text-xs text-muted">observation</span>
                <span className="font-mono text-xs text-success">● ok</span>
              </div>
              <pre className="p-4 font-mono text-xs text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre flex-1">{step.observation}</pre>
            </div>

          </div>
        ) : (
          <div className={`bg-[#0d1117] border border-border rounded-lg overflow-hidden section-reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
              <span className="font-mono text-xs text-success">✓ patch — tests pass</span>
              <span className="font-mono text-xs text-muted">git diff HEAD</span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed space-y-0.5">
              {agentTrace.patch.split('\n').map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('+') && !line.startsWith('+++') ? 'diff-add rounded px-1' :
                    line.startsWith('-') && !line.startsWith('---') ? 'diff-remove rounded px-1' :
                    line.startsWith('@@') || line.startsWith('diff') || line.startsWith('index') || line.startsWith('---') || line.startsWith('+++')
                      ? 'diff-meta' : 'text-zinc-500'
                  }
                >
                  {line || ' '}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border bg-success/5 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-zinc-500">
              <span className="text-success">● passed</span>
              <span>{agentTrace.iterations} iterations</span>
              <span>{agentTrace.inputTokens.toLocaleString()} input tokens</span>
              <span>{agentTrace.totalTimeSec}s wall clock</span>
              <span>1 line changed</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AgentTrace;
