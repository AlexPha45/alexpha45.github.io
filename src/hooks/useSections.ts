import { useEffect, useState } from 'react';

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'contact', label: 'Contact' },
] as const;

export function useSections() {
  const [active, setActive] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    return sections.some((section) => section.id === hash) ? hash : 'home';
  });

  useEffect(() => {
    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const revealElements = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let navigationObserver: IntersectionObserver | undefined;
    let revealObserver: IntersectionObserver | undefined;
    let cancelled = false;
    let initialScrollFrame = 0;

    // The browser cannot resolve an incoming fragment while React's root is
    // empty. Resolve it once after mounting and font layout, without changing
    // history or overriding a scroll the visitor has already started.
    const initialHash = window.location.hash.slice(1);
    if (sections.some((section) => section.id === initialHash)) {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        initialScrollFrame = window.requestAnimationFrame(() => {
          if (window.location.hash.slice(1) !== initialHash || window.scrollY > 1) return;
          const destination = document.getElementById(initialHash);
          destination?.scrollIntoView({ behavior: 'instant', block: 'start' });
          destination?.focus({ preventScroll: true });
          setActive(initialHash);
        });
      });
    }

    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      if (sections.some((section) => section.id === hash)) setActive(hash);
    };

    const resetReveals = () => {
      revealObserver?.disconnect();
      revealElements.forEach((element) => element.classList.remove('will-reveal', 'is-visible'));
    };

    const setupReveals = () => {
      resetReveals();
      if (motionPreference.matches || !('IntersectionObserver' in window)) return;

      try {
        revealObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver?.unobserve(entry.target);
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

        // Hide only content below the viewport, after the observer is available.
        // In-view content and browsers without observers remain fully readable.
        revealElements.forEach((element) => {
          if (element.getBoundingClientRect().top >= window.innerHeight) {
            revealObserver?.observe(element);
            element.classList.add('will-reveal');
          }
        });
      } catch {
        resetReveals();
      }
    };

    if ('IntersectionObserver' in window) {
      const visibleSections = new Set<Element>();
      navigationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        });
        const nearest = [...visibleSections].sort((a, b) => (
          Math.abs(a.getBoundingClientRect().top - window.innerHeight * 0.25)
          - Math.abs(b.getBoundingClientRect().top - window.innerHeight * 0.25)
        ))[0];
        if (nearest) setActive(nearest.id);
      }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
      sectionElements.forEach((element) => navigationObserver?.observe(element));
    }

    setupReveals();
    motionPreference.addEventListener('change', setupReveals);
    window.addEventListener('hashchange', syncHash);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(initialScrollFrame);
      navigationObserver?.disconnect();
      resetReveals();
      motionPreference.removeEventListener('change', setupReveals);
      window.removeEventListener('hashchange', syncHash);
    };
  }, []);

  return { active, setActive };
}

export default useSections;
