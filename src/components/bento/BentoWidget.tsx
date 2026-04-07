import { useRef, useLayoutEffect, useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Maximize2, Minimize2 } from "lucide-react";
import type { WidgetConfig, WidgetSize } from "../../hooks/useWidgetLayout";

interface BentoWidgetProps {
  widget: WidgetConfig;
  size: WidgetSize;
  isExpanded: boolean;
  onToggleExpand: () => void;
  children: React.ReactNode;
}

const BentoWidget = ({
  widget,
  size,
  isExpanded,
  onToggleExpand,
  children,
}: BentoWidgetProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const innerRef = useRef<HTMLElement | null>(null);
  const prevRect = useRef<DOMRect | null>(null);
  const isAnimating = useRef(false);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      innerRef.current = node;
      setSortableRef(node);
    },
    [setSortableRef]
  );

  // FLIP: capture "First" rect before the DOM updates
  const handleExpand = () => {
    if (innerRef.current && !isAnimating.current) {
      prevRect.current = innerRef.current.getBoundingClientRect();
    }
    onToggleExpand();
  };

  // FLIP: after DOM paints with new size, animate from old rect to new
  useLayoutEffect(() => {
    const el = innerRef.current;
    const first = prevRect.current;
    if (!el || !first || isDragging) {
      prevRect.current = null;
      return;
    }

    const last = el.getBoundingClientRect();
    prevRect.current = null;

    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sw = first.width / last.width;
    const sh = first.height / last.height;

    // Skip if nothing moved
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sw - 1) < 0.01 && Math.abs(sh - 1) < 0.01) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    isAnimating.current = true;

    // Invert: place element at its old position/size
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sw}, ${sh})`;
    el.style.transformOrigin = "top left";
    el.style.transition = "none";

    // Play: animate to identity
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.transform = "translate(0, 0) scale(1, 1)";

        const onEnd = () => {
          el.style.transform = "";
          el.style.transformOrigin = "";
          el.style.transition = "";
          isAnimating.current = false;
          el.removeEventListener("transitionend", onEnd);
        };
        el.addEventListener("transitionend", onEnd, { once: true });

        // Safety fallback
        setTimeout(onEnd, 500);
      });
    });
  }, [isExpanded, isDragging]);

  const sizeClass = `bento-widget--${size.cols}x${size.rows}`;

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
      : undefined,
    transition: isDragging
      ? "none"
      : (transition || "transform 250ms cubic-bezier(0.25, 1, 0.5, 1)"),
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <section
      ref={setRef}
      style={style}
      className={`bento-widget ${sizeClass}${
        isDragging ? " bento-widget--dragging" : ""
      }${isExpanded ? " bento-widget--expanded" : ""}`}
      aria-label={widget.id}
    >
      <button
        className="bento-widget__drag-handle"
        aria-label={`Déplacer le widget ${widget.id}`}
        aria-roledescription="bouton de déplacement"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} aria-hidden="true" />
      </button>

      <div className="bento-widget__content">{children}</div>

      {widget.expandable && (
        <button
          className={`bento-widget__expand-btn ${
            isExpanded ? "bento-widget__expand-btn--expanded" : ""
          }`}
          onClick={handleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Réduire" : "Voir plus"}
        >
          {isExpanded ? (
            <Minimize2 size={12} aria-hidden="true" />
          ) : (
            <Maximize2 size={12} aria-hidden="true" />
          )}
        </button>
      )}
    </section>
  );
};

export default BentoWidget;
