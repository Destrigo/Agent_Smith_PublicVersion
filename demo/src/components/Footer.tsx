import { Github } from 'lucide-react';

const Footer = () => (
  <footer className="py-8 border-t border-border mt-8">
    <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="text-xs text-zinc-600 font-mono">
        Agent Smith — 42 School project by{' '}
        <a href="https://github.com/Destrigo" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
          mtaranti
        </a>{' '}
        &amp; jiezhang
      </p>
      <a
        href="https://github.com/Destrigo/Agent_Smith_PublicVersion"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-white transition-colors font-mono"
      >
        <Github size={13} />
        Agent_Smith_PublicVersion
      </a>
    </div>
  </footer>
);

export default Footer;
