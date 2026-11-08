import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsap';

export default function useWorkDialogMotion(scope, active) {
  const closing = useRef(false);
  const closeTween = useRef(null);
  const { contextSafe } = useGSAP(
    () => {
      if (!active) return;
      const dialog = scope.current;
      closing.current = false;
      if (!dialog.open) dialog.showModal();
      const media = gsap.matchMedia();
      media.add(
        {
          reduced: '(prefers-reduced-motion: reduce)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        ({ conditions }) => {
          if (conditions.reduced) {
            if (closing.current) {
              closeTween.current?.kill();
              dialog.close();
            }
            return;
          }
          gsap.fromTo(
            dialog,
            { opacity: 0, scale: 0.96, y: 15 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
            },
          );
        },
      );
      return () => {
        media.revert();
        closeTween.current?.kill();
        closeTween.current = null;
        closing.current = false;
      };
    },
    { scope, dependencies: [active], revertOnUpdate: true },
  );

  return contextSafe(() => {
    const dialog = scope.current;
    if (!dialog?.open || closing.current) return;
    closing.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
      return;
    }
    gsap.killTweensOf(dialog);
    closeTween.current = gsap.to(dialog, {
      opacity: 0,
      scale: 0.98,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => dialog.close(),
    });
  });
}
