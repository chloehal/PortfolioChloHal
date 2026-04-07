import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useWidgetLayout } from "../../hooks/useWidgetLayout";
import { usePortfolioData } from "../../data/usePortfolioData";
import BentoWidget from "./BentoWidget";
import HeroWidget from "./widgets/HeroWidget";
import LinksWidget from "./widgets/LinksWidget";
import StatusWidget from "./widgets/StatusWidget";
import DarkModeWidget from "./widgets/DarkModeWidget";
// import SectorThemeWidget from "./widgets/SectorThemeWidget"; // DRAFT: theme switcher
import SectorsWidget from "./widgets/SectorsWidget";
import SkillsWidget from "./widgets/SkillsWidget";
import QualitiesWidget from "./widgets/QualitiesWidget";
import ExperienceWidget from "./widgets/ExperienceWidget";
import EducationWidget from "./widgets/EducationWidget";
import "../../styles/bento-grid.css";

const SKILL_ID_MAP: Record<string, string> = {
  "skills-product": "skill-product",
  "skills-design": "skill-design",
  "skills-code": "skill-eng",
  "skills-methods": "skill-methods",
};

const BentoGrid = () => {
  const {
    widgets,
    widgetOrder,
    handleReorder,
    toggleExpand,
    isExpanded,
    resetOrder,
    isCustomOrder,
    getWidgetSize,
  } = useWidgetLayout();
  const { data } = usePortfolioData();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      handleReorder(active.id as string, over.id as string);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const renderWidgetContent = (widgetId: string, expanded_: boolean) => {
    const expanded = expanded_ || isMobile;
    switch (widgetId) {
      case "hero":
        return <HeroWidget />;
      case "links":
        return <LinksWidget />;
      case "status":
        return <StatusWidget />;
      case "dark-mode":
        return <DarkModeWidget />;
      // case "sector-theme": // DRAFT: theme switcher
      //   return <SectorThemeWidget />;
      case "sectors":
        return <SectorsWidget isExpanded={expanded} />;
      case "skills-product":
      case "skills-design":
      case "skills-code":
      case "skills-methods": {
        const dataId = SKILL_ID_MAP[widgetId];
        const category = data.skills.find((s) => s.id === dataId);
        return category ? <SkillsWidget category={category} isExpanded={expanded} /> : null;
      }
      case "qualities":
        return <QualitiesWidget isExpanded={expanded} />;
      case "experience":
        return <ExperienceWidget isExpanded={expanded} />;
      case "education":
        return <EducationWidget isExpanded={expanded} />;
      default:
        return null;
    }
  };

  const activeWidget = activeId
    ? widgets.find((w) => w.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
        <div className={`bento-grid${activeId ? " bento-grid--dragging" : ""}`}>
          {widgets.map((widget) => {
            const expanded = isExpanded(widget.id);
            return (
              <BentoWidget
                key={widget.id}
                widget={widget}
                size={getWidgetSize(widget)}
                isExpanded={expanded}
                onToggleExpand={() => toggleExpand(widget.id)}
              >
                {renderWidgetContent(widget.id, expanded)}
              </BentoWidget>
            );
          })}
        </div>
      </SortableContext>

      {isCustomOrder && (
        <div className="bento-reset-wrapper">
          <button
            className="bento-reset-btn"
            onClick={resetOrder}
            aria-label="Réinitialiser l'ordre des widgets"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>Réinitialiser</span>
          </button>
        </div>
      )}

      <DragOverlay dropAnimation={null}>
        {activeWidget ? (
          <div
            className={`bento-widget bento-widget--${activeWidget.cols}x${activeWidget.rows} bento-widget--drag-overlay`}
          >
            <div className="bento-widget__content">
              {renderWidgetContent(activeWidget.id, false)}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BentoGrid;
