import { Github } from 'lucide-react';

const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted">
        Built at <span className="text-white">42 School</span> by{' '}
        <a href="https://github.com/Destrigo" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
          mtaranti
        </a>{' '}
        &amp; jiezhang — all models evaluated at $0 cost on free-tier APIs.
      </div>
      <a
        href="https://github.com/Destrigo/Agent_Smith_PublicVersion"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
      >
        <Github size={16} />
        Agent_Smith_PublicVersion
      </a>
    </div>
  </footer>
);

export default Footer;
