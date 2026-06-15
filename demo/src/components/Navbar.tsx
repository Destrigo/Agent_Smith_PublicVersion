import { Github } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 backdrop-blur-sm bg-bg/90">
    <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
      <span className="font-mono text-sm tracking-widest text-zinc-400 uppercase">
        Agent<span className="text-primary">_</span>Smith
      </span>
      <div className="flex items-center gap-6">
        <a href="#how-it-works" className="text-xs text-muted hover:text-white transition-colors hidden sm:block tracking-wide">
          Architecture
        </a>
        <a href="#trace" className="text-xs text-muted hover:text-white transition-colors hidden sm:block tracking-wide">
          Demo
        </a>
        <a href="#benchmark" className="text-xs text-muted hover:text-white transition-colors hidden sm:block tracking-wide">
          Benchmark
        </a>
        <a
          href="https://github.com/Destrigo/Agent_Smith_PublicVersion"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border text-muted hover:text-white hover:border-zinc-500 transition-all font-mono"
        >
          <Github size={13} />
          GitHub
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
