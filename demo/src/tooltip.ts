import { computePosition, offset, flip, shift } from '@floating-ui/dom';

let activeTooltip: HTMLElement | null = null;

export function showTooltip(anchor: HTMLElement, html: string) {
  hideTooltip();
  const layer = document.getElementById('tooltip-layer');
  if (!layer) return;

  const tip = document.createElement('div');
  tip.className = 'demo-tooltip';
  tip.innerHTML = html;
  layer.appendChild(tip);
  activeTooltip = tip;

  computePosition(anchor, tip, {
    placement: 'top',
    middleware: [offset(8), flip(), shift({ padding: 8 })]
  }).then(({ x, y }) => {
    tip.style.left = Math.round(x) + 'px';
    tip.style.top = Math.round(y) + 'px';
  });
}

export function hideTooltip() {
  if (activeTooltip && activeTooltip.parentNode) {
    activeTooltip.parentNode.removeChild(activeTooltip);
  }
  activeTooltip = null;
}
