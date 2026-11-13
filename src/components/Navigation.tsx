import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { profile } from '../data/portfolio';
import { sections } from '../hooks/useSections';
import { Icon } from './Icon';

interface NavigationProps {
  active: string;
  onNavigate: (id: string) => void;
}

export function Navigation({ active, onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      navigationRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    });
    const desktop = window.matchMedia('(min-width: 960px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    onNavigate(id);
    // Let the native anchor update history and scroll; focus the destination
    // without a second scroll so keyboard users can continue in that section.
    window.requestAnimationFrame(() => {
      const destination = document.getElementById(id);
      if (!destination) return;
      if (!destination.hasAttribute('tabindex')) destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    });
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-width header-inner">
        <a className="wordmark" href="#home" aria-label="Alexandros Phardis, home" onClick={(event) => navigate(event, 'home')}>AP<span>.</span></a>
        <button
          className="menu-toggle"
          type="button"
          ref={buttonRef}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
        <nav id="main-navigation" className={`main-nav${open ? ' is-open' : ''}`} ref={navigationRef} aria-label="Main navigation">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : undefined}
              aria-current={active === id ? 'location' : undefined}
              onClick={(event) => navigate(event, id)}
            >
              {label}
            </a>
          ))}
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Résumé <Icon name="arrow" size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
