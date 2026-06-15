export interface ModelResult {
  name: string;
  shortName: string;
  provider: string;
  mbppPassed: number;
  mbppTotal: number;
  mbppPct: number;
  sweBenchPool: number;
  sweBenchTotal: number;
  swePct: number;
  avgIter: number | null;
  avgTimeSec: number | null;
  cost: string;
}

export const models: ModelResult[] = [
  {
    name: 'mistral-medium-latest',
    shortName: 'medium',
    provider: 'Mistral',
    mbppPassed: 232, mbppTotal: 257, mbppPct: 90,
    sweBenchPool: 6, sweBenchTotal: 8, swePct: 100,
    avgIter: 5.5, avgTimeSec: 19.1, cost: '$0',
  },
  {
    name: 'mistral-large-latest',
    shortName: 'large',
    provider: 'Mistral',
    mbppPassed: 233, mbppTotal: 257, mbppPct: 91,
    sweBenchPool: 6, sweBenchTotal: 7, swePct: 100,
    avgIter: 5.8, avgTimeSec: 64.1, cost: '$0',
  },
  {
    name: 'ministral-8b-latest',
    shortName: '8B',
    provider: 'Mistral',
    mbppPassed: 217, mbppTotal: 257, mbppPct: 84,
    sweBenchPool: 4, sweBenchTotal: 5, swePct: 67,
    avgIter: 12.3, avgTimeSec: 42.8, cost: '$0',
  },
  {
    name: 'codestral-latest',
    shortName: 'codestral',
    provider: 'Mistral',
    mbppPassed: 225, mbppTotal: 257, mbppPct: 88,
    sweBenchPool: 3, sweBenchTotal: 3, swePct: 50,
    avgIter: 7.8, avgTimeSec: 19.4, cost: '$0',
  },
  {
    name: 'mistral-small-latest',
    shortName: 'small',
    provider: 'Mistral',
    mbppPassed: 232, mbppTotal: 257, mbppPct: 90,
    sweBenchPool: 3, sweBenchTotal: 3, swePct: 50,
    avgIter: 14.2, avgTimeSec: 437.6, cost: '$0',
  },
  {
    name: 'devstral-medium-latest',
    shortName: 'devstral-m',
    provider: 'Mistral',
    mbppPassed: 221, mbppTotal: 257, mbppPct: 86,
    sweBenchPool: 3, sweBenchTotal: 3, swePct: 50,
    avgIter: 22.5, avgTimeSec: 184.1, cost: '$0',
  },
  {
    name: 'openai/gpt-oss-120b:free',
    shortName: 'GPT-120B',
    provider: 'OpenRouter',
    mbppPassed: 238, mbppTotal: 257, mbppPct: 93,
    sweBenchPool: 2, sweBenchTotal: 3, swePct: 33,
    avgIter: 18.5, avgTimeSec: 154.4, cost: '$0',
  },
  {
    name: 'devstral-latest',
    shortName: 'devstral',
    provider: 'Mistral',
    mbppPassed: 232, mbppTotal: 257, mbppPct: 90,
    sweBenchPool: 2, sweBenchTotal: 2, swePct: 33,
    avgIter: 21.2, avgTimeSec: 34.0, cost: '$0',
  },
  {
    name: 'ministral-3b-latest',
    shortName: '3B',
    provider: 'Mistral',
    mbppPassed: 109, mbppTotal: 257, mbppPct: 42,
    sweBenchPool: 1, sweBenchTotal: 1, swePct: 17,
    avgIter: 11.2, avgTimeSec: 28.3, cost: '$0',
  },
  {
    name: 'open-mistral-nemo',
    shortName: 'nemo',
    provider: 'Mistral',
    mbppPassed: 15, mbppTotal: 257, mbppPct: 6,
    sweBenchPool: 0, sweBenchTotal: 0, swePct: 0,
    avgIter: null, avgTimeSec: null, cost: '$0',
  },
  {
    name: 'mistral-tiny-latest',
    shortName: 'tiny',
    provider: 'Mistral',
    mbppPassed: 11, mbppTotal: 257, mbppPct: 4,
    sweBenchPool: 0, sweBenchTotal: 0, swePct: 0,
    avgIter: null, avgTimeSec: null, cost: '$0',
  },
];

export const agentTrace = {
  taskId: 'sympy__sympy-13480',
  repo: 'sympy/sympy',
  issue: 'NameError: name `cotm` is not defined in `coth.eval()`. The expression `coth(log(tan(x))).subs(x, 2)` raises a NameError instead of evaluating. The variable `cotm` at line 590 of `hyperbolic.py` should be `cothm`.',
  model: 'mistral-large-latest',
  iterations: 4,
  totalTimeSec: 10.4,
  inputTokens: 14775,
  steps: [
    {
      step: 1,
      label: 'Search',
      tool: 'grep_context',
      thought: 'The issue is clear: in sympy/functions/elementary/hyperbolic.py at line 590, there\'s a NameError because `cotm` is used but not defined. The hint says it should be `cothm`. Let me first locate the relevant code to confirm the context.',
      code: 'result = grep_context(\n    "cotm is S.ComplexInfinity",\n    context_lines=10,\n    file_pattern="hyperbolic.py"\n)\nprint(result)',
      observation: '/testbed/sympy/functions/elementary/hyperbolic.py-587:                 x, m = _peeloff_ipi(arg)\n/testbed/sympy/functions/elementary/hyperbolic.py-588:                 if m:\n/testbed/sympy/functions/elementary/hyperbolic.py-589:                     cothm = coth(m)\n/testbed/sympy/functions/elementary/hyperbolic.py-590:                     if cotm is S.ComplexInfinity:  # ← BUG: cotm undefined\n/testbed/sympy/functions/elementary/hyperbolic.py-591:                         return coth(x)\n/testbed/sympy/functions/elementary/hyperbolic.py-592:                     else: # cothm == 0\n/testbed/sympy/functions/elementary/hyperbolic.py-593:                         return tanh(x)',
      status: 'ok',
    },
    {
      step: 2,
      label: 'Read',
      tool: 'read_file',
      thought: 'Bug confirmed. At line 589, `cothm = coth(m)` is defined, but line 590 uses `cotm` — a typo. Let me read the full context before editing to make sure the replacement is exact.',
      code: 'result = read_file(\n    "/testbed/sympy/functions/elementary/hyperbolic.py",\n    start_line=585,\n    end_line=600\n)\nprint(result)',
      observation: '585:         elif arg.is_Add:\n586:             x, m = _peeloff_ipi(arg)\n587:             if m:\n588:                 x, m = _peeloff_ipi(arg)\n589:                 if m:\n590:                     cothm = coth(m)\n591:                     if cotm is S.ComplexInfinity:\n592:                         return coth(x)\n593:                     else: # cothm == 0\n594:                         return tanh(x)',
      status: 'ok',
    },
    {
      step: 3,
      label: 'Edit',
      tool: 'edit_file',
      thought: 'Context confirmed. The fix is a one-character rename: `cotm` → `cothm` at line 591. Applying the exact-string replacement.',
      code: 'result = edit_file(\n    filepath="/testbed/sympy/functions/elementary/hyperbolic.py",\n    old_str="                    if cotm is S.ComplexInfinity:",\n    new_str="                    if cothm is S.ComplexInfinity:"\n)\nprint(result)',
      observation: 'OK: replaced in /testbed/sympy/functions/elementary/hyperbolic.py',
      status: 'ok',
    },
    {
      step: 4,
      label: 'Verify',
      tool: 'run_command',
      thought: 'Fix applied. Let me verify by running the exact failing expression from the issue.',
      code: 'result = run_command(\n    \'python -c "from sympy import *; x=Symbol(\'x\'); \'\n    \'print(coth(log(tan(x))).subs(x, 2))"\'\n)\nprint(result)',
      observation: '{"stdout": "coth(log(-tan(2)))\\n", "returncode": 0}\n\n✓ No NameError — expression evaluates correctly.',
      status: 'ok',
    },
  ],
  patch: `diff --git a/sympy/functions/elementary/hyperbolic.py b/sympy/functions/elementary/hyperbolic.py
index 2a4555d91..5fbb73c78 100644
--- a/sympy/functions/elementary/hyperbolic.py
+++ b/sympy/functions/elementary/hyperbolic.py
@@ -587,7 +587,7 @@ def eval(cls, arg):
                 x, m = _peeloff_ipi(arg)
                 if m:
                     cothm = coth(m)
-                    if cotm is S.ComplexInfinity:
+                    if cothm is S.ComplexInfinity:
                         return coth(x)
                     else: # cothm == 0
                         return tanh(x)`,
};

export const tools = [
  { name: 'read_file', desc: 'Read a file with line numbers. Supports start/end line ranges.' },
  { name: 'edit_file', desc: 'Exact-string replacement. Fails clearly if old_str not found.' },
  { name: 'write_file', desc: 'Write a new file to the filesystem.' },
  { name: 'list_files', desc: 'List directory contents with optional glob pattern.' },
  { name: 'search_code', desc: 'Grep with context lines across the repository.' },
  { name: 'find_definition', desc: 'Locate a function or class definition by name.' },
  { name: 'find_references', desc: 'Find all call sites of a symbol.' },
  { name: 'run_tests', desc: 'Run the benchmark eval script inside the Docker container.' },
  { name: 'get_patch', desc: 'Generate the final git diff from /testbed.' },
  { name: 'run_command', desc: 'Execute a shell command in the sandbox.' },
];
