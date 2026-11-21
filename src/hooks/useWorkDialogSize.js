import { useLayoutEffect } from 'react';

export default function useWorkDialogSize(scope, active) {
  useLayoutEffect(() => {
    if (!active || !scope.current) return;
    const dialog = scope.current;
    const image = dialog.querySelector('.work-full');
    const details = [
      dialog.querySelector('.work-dialog-head'),
      dialog.querySelector('.work-dialog-caption'),
    ];
    let frame;

    function fit() {
      const styles = getComputedStyle(dialog);
      const border = parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
      const maxHeight = parseFloat(styles.maxHeight);
      const maxWidth = Math.min(1100, window.innerWidth * 0.94);
      const minWidth = Math.min(320, maxWidth);
      const ratio = image.naturalWidth / image.naturalHeight || 4 / 3;
      let width = maxWidth;

      function availableHeight() {
        return Math.max(
          1,
          maxHeight - border - details.reduce((sum, el) => sum + el.offsetHeight, 0) - 2,
        );
      }

      // Re-measure wrapped text as the dialog narrows to fit the image.
      // Keep a readable minimum width for portrait images and their descriptions.
      for (let pass = 0; pass < 6; pass += 1) {
        dialog.style.width = `${width}px`;
        const nextWidth = Math.max(minWidth, Math.min(width, availableHeight() * ratio + border));
        if (width - nextWidth < 1) break;
        width = nextWidth;
      }
      dialog.style.width = `${width}px`;
      dialog.style.setProperty('--work-preview-max-height', `${availableHeight()}px`);
      dialog.style.setProperty('--work-preview-max-width', `${dialog.clientWidth}px`);
    }

    function scheduleFit() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(fit);
    }

    const observer = new ResizeObserver(scheduleFit);
    details.forEach((element) => observer.observe(element));
    dialog.addEventListener('load', scheduleFit, true);
    dialog.addEventListener('error', scheduleFit, true);
    window.addEventListener('resize', scheduleFit);
    window.visualViewport?.addEventListener('resize', scheduleFit);
    fit();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      dialog.removeEventListener('load', scheduleFit, true);
      dialog.removeEventListener('error', scheduleFit, true);
      window.removeEventListener('resize', scheduleFit);
      window.visualViewport?.removeEventListener('resize', scheduleFit);
      dialog.style.removeProperty('width');
      dialog.style.removeProperty('--work-preview-max-height');
      dialog.style.removeProperty('--work-preview-max-width');
    };
  }, [active, scope]);
}
