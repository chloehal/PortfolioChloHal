import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export interface WidgetSize {
  cols: number;
  rows: number;
}

export interface WidgetConfig {
  id: string;
  cols: number;
  rows: number;
  expandable: boolean;
  expandedCols?: number;
  expandedRows?: number;
}

/*
 * 4-column grid layout (grid-auto-rows: 100px, gap: 10px)
 *
 * Default layout visualisation:
 *
 *  ┌──────────────┐ ┌──────┐ ┌──────┐
 *  │              │ │status│ │ dark │
 *  │     hero     │ ├──────┤ ├──────┤
 *  │    (2×2)     │ │links │ │sector│
 *  ├──────────────┤ ├──────┤ ├──────┤
 *  │  sk-product  │ │sk-des│ │sk-cod│ │sk-met│
 *  ├──────────────┴─┴──────┤ ├──────┤
 *  │    qualities (3×2)    │ │ edu  │
 *  │                       │ │(1×2) │
 *  ├───────────────────────┴─┴──────┤
 *  │       experience (4×3)         │
 *  │                                │
 *  └────────────────────────────────┘
 */
const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: "hero", cols: 2, rows: 3, expandable: false },
  { id: "status", cols: 1, rows: 1, expandable: false },
  { id: "dark-mode", cols: 1, rows: 1, expandable: false },
  { id: "links", cols: 1, rows: 1, expandable: false },
  // { id: "sector-theme", cols: 1, rows: 1, expandable: false }, // DRAFT: theme switcher widget
  { id: "sectors", cols: 1, rows: 1, expandable: true, expandedCols: 2, expandedRows: 2 },
  { id: "skills-product", cols: 1, rows: 1, expandable: true, expandedCols: 2, expandedRows: 2 },
  { id: "skills-design", cols: 1, rows: 1, expandable: true, expandedCols: 2, expandedRows: 2 },
  { id: "skills-code", cols: 1, rows: 1, expandable: true, expandedCols: 2, expandedRows: 2 },
  { id: "skills-methods", cols: 1, rows: 1, expandable: true, expandedCols: 2, expandedRows: 2 },
  { id: "qualities", cols: 3, rows: 2, expandable: true, expandedCols: 4, expandedRows: 3 },
  { id: "education", cols: 1, rows: 2, expandable: true, expandedCols: 2, expandedRows: 3 },
  { id: "experience", cols: 4, rows: 3, expandable: true, expandedCols: 4, expandedRows: 5 },
];

const STORAGE_KEY = "bento-widget-order-v2";

function loadOrder(): string[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const order = JSON.parse(stored) as string[];
    const defaultIds = DEFAULT_WIDGETS.map((w) => w.id);
    if (order.length !== defaultIds.length || !defaultIds.every((id) => order.includes(id))) {
      return null;
    }
    return order;
  } catch {
    return null;
  }
}

const defaultOrder = () => DEFAULT_WIDGETS.map((w) => w.id);

export function useWidgetLayout() {
  const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    return loadOrder() || defaultOrder();
  });

  const [expandedWidgets, setExpandedWidgets] = useState<Set<string>>(new Set());

  const widgets = widgetOrder.map(
    (id) => DEFAULT_WIDGETS.find((w) => w.id === id)!
  );

  const handleReorder = useCallback(
    (activeId: string, overId: string) => {
      // Collapse all expanded widgets before reordering
      setExpandedWidgets(new Set());
      setWidgetOrder((prev) => {
        const oldIndex = prev.indexOf(activeId);
        const newIndex = prev.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        const next = arrayMove(prev, oldIndex, newIndex);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  // Accordion: only one widget expanded at a time
  const toggleExpand = useCallback((id: string) => {
    setExpandedWidgets((prev) => {
      if (prev.has(id)) {
        return new Set();
      }
      return new Set([id]);
    });
  }, []);

  const isExpanded = useCallback(
    (id: string) => expandedWidgets.has(id),
    [expandedWidgets]
  );

  const isCustomOrder = widgetOrder.join(",") !== defaultOrder().join(",");

  const resetOrder = useCallback(() => {
    const order = defaultOrder();
    setWidgetOrder(order);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getWidgetSize = useCallback(
    (widget: WidgetConfig): WidgetSize => {
      if (expandedWidgets.has(widget.id)) {
        return {
          cols: widget.expandedCols ?? widget.cols,
          rows: widget.expandedRows ?? widget.rows,
        };
      }
      return { cols: widget.cols, rows: widget.rows };
    },
    [expandedWidgets]
  );

  return {
    widgets,
    widgetOrder,
    handleReorder,
    toggleExpand,
    isExpanded,
    resetOrder,
    isCustomOrder,
    getWidgetSize,
  };
}
