import { gsap, useGSAP } from '../animations/gsap';

export default function useContentMotion(scope, dependencies) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const panel = scope.current;
        if (!panel || panel.getBoundingClientRect().top > window.innerHeight) return;
        const cards = panel.querySelectorAll('.price-card, .work-card');
        const timeline = gsap.timeline({ defaults: { duration: 0.48, ease: 'power3.out' } });
        timeline.fromTo(
          panel,
          { opacity: 0.4, y: 12 },
          { opacity: 1, y: 0, clearProps: 'opacity,transform' },
        );
        if (cards.length) {
          // Only opacity on cards: hover transforms remain entirely owned by CSS.
          timeline.fromTo(
            cards,
            { opacity: 0.4 },
            { opacity: 1, stagger: 0.075, clearProps: 'opacity' },
            0.08,
          );
        }
      });
      return () => media.revert();
    },
    { scope, dependencies, revertOnUpdate: true },
  );
}
