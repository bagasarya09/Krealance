import { gsap, useGSAP, ScrollTrigger, SplitText } from '../animations/gsap';

const PIN_TOP = 55;

// A tall section scrolls normally until its bottom has been readable before pinning.
function pinOffset(panel) {
  return Math.min(PIN_TOP, window.innerHeight - panel.offsetHeight - 32);
}

export default function usePageMotion(scope) {
  useGSAP(
    () => {
      const root = scope.current;
      const media = gsap.matchMedia();
      const panels = {
        hero: root.querySelector('.motion-panel--hero'),
        services: root.querySelector('.motion-panel--services'),
        portfolio: root.querySelector('.motion-panel--portfolio'),
      };
      let disposed = false;
      let refreshTimer;
      let anchorFrame;
      let intro;
      let reveals = [];

      function scheduleRefresh() {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          if (!disposed) ScrollTrigger.refresh(true);
        }, 100);
      }

      media.add(
        {
          desktop: '(min-width: 900px)',
          small: '(max-width: 899px)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        ({ conditions }) => {
          if (!conditions.desktop || conditions.reduced) {
            gsap.set(root.querySelectorAll('.motion-panel-content'), {
              clearProps: 'opacity,transform,transformOrigin',
            });
          }
          if (conditions.reduced) return;

          const select = gsap.utils.selector(root);
          const heading = root.querySelector('.hero h1');
          const split = heading
            ? SplitText.create(heading, { type: 'words', tag: 'span', aria: 'auto' })
            : null;
          intro = gsap.timeline({ defaults: { duration: 0.75, ease: 'power3.out' } });
          const addIntro = (targets, from, position) => {
            if (targets.length) {
              intro.fromTo(
                targets,
                from,
                { opacity: 1, y: 0, clearProps: 'opacity,transform' },
                position,
              );
            }
          };
          addIntro(select('.hero > div:first-child > .eyebrow'), { opacity: 0, y: 15 }, 0);
          if (split) {
            intro.fromTo(
              split.words,
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, stagger: 0.045, clearProps: 'opacity,transform' },
              0.12,
            );
          }
          addIntro(select('.hero > div:first-child > p'), { opacity: 0, y: 20 }, 0.42);
          // Animate the group, leaving button transforms to the existing CSS interactions.
          addIntro(select('.hero .actions'), { opacity: 0.4, y: 18 }, 0.6);
          addIntro(select('.hero .tech'), { opacity: 0, y: 12 }, 0.78);
          intro.fromTo(
            select('.hero .visual'),
            { opacity: 0, y: 35, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.1, clearProps: 'opacity,transform' },
            0.3,
          );

          if (conditions.desktop) {
            root.classList.add('has-overlap');
            [
              ['hero', 'services', 0.94, 0.4, -24],
              ['services', 'portfolio', 0.96, 0.38, -16],
            ].forEach(([current, next, scale, opacity, y]) => {
              const panel = panels[current];
              gsap
                .timeline({
                  scrollTrigger: {
                    id: `krealance-overlap-${current}`,
                    trigger: panel,
                    start: () => `top ${pinOffset(panel)}px`,
                    endTrigger: panels[next],
                    end: `top ${PIN_TOP}px`,
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.35,
                    invalidateOnRefresh: true,
                  },
                })
                .to(panel.querySelector('.motion-panel-content'), {
                  scale,
                  opacity,
                  y,
                  transformOrigin: 'center center',
                  ease: 'none',
                });
            });
          }

          function reveal(targets, trigger) {
            if (!targets.length) return;
            const tween = gsap.fromTo(
              targets,
              { opacity: 0, y: conditions.small ? 16 : 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                immediateRender: false,
                clearProps: 'opacity,transform',
                scrollTrigger: { trigger, start: 'top 88%', once: true },
              },
            );
            reveals.push({ targets, tween });
          }

          const services = select('.services article');
          reveal(services, root.querySelector('.services'));
          select('#case-studies > .center, .custom-service, .contact-grid').forEach((element) => {
            reveal([element], element);
          });
          scheduleRefresh();

          return () => {
            root.classList.remove('has-overlap');
            split?.revert();
            intro = null;
            reveals = [];
            scheduleRefresh();
          };
        },
      );

      function anchorTop(target) {
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        if (root.classList.contains('has-overlap')) {
          for (const key of ['hero', 'services']) {
            if (panels[key].contains(target)) {
              const trigger = ScrollTrigger.getById(`krealance-overlap-${key}`);
              if (trigger) return Math.max(0, trigger.start + pinOffset(panels[key]) - offset);
            }
          }
        }
        return Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      }

      function scrollToTarget(target, smooth) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: anchorTop(target),
          behavior: smooth && !reduced ? 'smooth' : 'instant',
        });
      }

      function onAnchorClick(event) {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const link = event.target.closest('a[href^="#"]');
        if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
        const target = document.getElementById(link.hash.slice(1));
        if (!target || !root.contains(target)) return;
        event.preventDefault();
        if (window.location.hash !== link.hash) history.pushState(null, '', link.hash);
        const hadTabIndex = target.hasAttribute('tabindex');
        if (!hadTabIndex) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (!hadTabIndex) target.removeAttribute('tabindex');
        scrollToTarget(target, true);
      }

      function onHashChange() {
        window.cancelAnimationFrame(anchorFrame);
        anchorFrame = window.requestAnimationFrame(() => {
          const target = document.getElementById(window.location.hash.slice(1));
          if (target && root.contains(target)) scrollToTarget(target, false);
        });
      }

      function onFocus(event) {
        if (panels.hero.contains(event.target)) intro?.progress(1);
        reveals.forEach(({ targets, tween }) => {
          if (targets.some((element) => element.contains(event.target))) tween.progress(1);
        });
        // Keyboard focus must not stay on a pinned control behind the next section.
        for (const key of ['hero', 'services']) {
          const trigger = ScrollTrigger.getById(`krealance-overlap-${key}`);
          if (
            trigger &&
            panels[key].contains(event.target) &&
            window.scrollY > Math.max(0, trigger.start) + 4
          ) {
            scrollToTarget(panels[key], false);
          }
        }
      }

      // One debounced measurement path covers tab/filter changes, images, fonts and notices.
      const observer = new ResizeObserver(scheduleRefresh);
      observer.observe(root);
      root.querySelectorAll('.motion-panel-content, #pricing, #estimator').forEach((element) => {
        observer.observe(element);
      });
      root.addEventListener('load', scheduleRefresh, true);
      root.addEventListener('error', scheduleRefresh, true);
      root.addEventListener('click', onAnchorClick);
      root.addEventListener('focusin', onFocus);
      window.addEventListener('hashchange', onHashChange);
      document.fonts?.ready.then(() => {
        if (!disposed) scheduleRefresh();
      });
      document.fonts?.addEventListener('loadingdone', scheduleRefresh);
      scheduleRefresh();
      if (window.location.hash) onHashChange();

      return () => {
        disposed = true;
        observer.disconnect();
        media.revert();
        root.classList.remove('has-overlap');
        window.clearTimeout(refreshTimer);
        window.cancelAnimationFrame(anchorFrame);
        root.removeEventListener('load', scheduleRefresh, true);
        root.removeEventListener('error', scheduleRefresh, true);
        root.removeEventListener('click', onAnchorClick);
        root.removeEventListener('focusin', onFocus);
        window.removeEventListener('hashchange', onHashChange);
        document.fonts?.removeEventListener('loadingdone', scheduleRefresh);
      };
    },
    { scope },
  );
}
