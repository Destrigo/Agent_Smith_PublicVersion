import { Github } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-bg/80">
    <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <span className="font-mono font-medium text-primary-light tracking-wide">
        agent<span className="text-white">_smith</span>
      </span>
      <div className="flex items-center gap-6">
        <a href="#how-it-works" className="text-sm text-muted hover:text-white transition-colors hidden sm:block">
          Architecture
        </a>
        <a href="#trace" className="text-sm text-muted hover:text-white transition-colors hidden sm:block">
          Demo
        </a>
        <a href="#benchmark" className="text-sm text-muted hover:text-white transition-colors hidden sm:block">
          Benchmark
        </a>
        <a
          href="https://github.com/Destrigo/Agent_Smith_PublicVersion"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary/50 hover:text-primary-light transition-all"
        >
          <Github size={15} />
          GitHub
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
