import { computePosition, offset, flip, shift, type VirtualElement } from '@floating-ui/dom';

let activeTooltip: HTMLElement | null = null;
let lastMousePosition = { x: 0, y: 0 };

// Track mouse position for tooltip placement
document.addEventListener('mousemove', (e) => {
  lastMousePosition = { x: e.clientX, y: e.clientY };
});

/**
 * Create a virtual anchor at the mouse position for floating-ui
 */
function createVirtualAnchorFromMouse(): VirtualElement {
  return {
    getBoundingClientRect() {
      return {
        x: lastMousePosition.x,
        y: lastMousePosition.y,
        width: 0,
        height: 0,
        top: lastMousePosition.y,
        left: lastMousePosition.x,
        right: lastMousePosition.x,
        bottom: lastMousePosition.y,
      };
    },
  };
}

/**
 * Create a virtual anchor from bounds (Rect) for floating-ui
 */
function createVirtualAnchorFromBounds(bounds: { x: number; y: number; width: number; height: number }): VirtualElement {
  return {
    getBoundingClientRect() {
      return {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        top: bounds.y,
        left: bounds.x,
        right: bounds.x + bounds.width,
        bottom: bounds.y + bounds.height,
      };
    },
  };
}

export function showTooltip(anchor: HTMLElement | null, html: string, bounds?: { x: number; y: number; width: number; height: number } | null) {
  hideTooltip();
  const layer = document.getElementById('tooltip-layer');
  if (!layer) return;

  const tip = document.createElement('div');
  tip.className = 'demo-tooltip';
  tip.innerHTML = html;
  layer.appendChild(tip);
  activeTooltip = tip;

  // Use provided anchor, or bounds, or fallback to virtual anchor at mouse position
  const reference = anchor ?? (bounds ? createVirtualAnchorFromBounds(bounds) : createVirtualAnchorFromMouse());

  computePosition(reference, tip, {
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
