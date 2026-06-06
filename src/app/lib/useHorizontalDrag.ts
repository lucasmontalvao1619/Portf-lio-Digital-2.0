import { useRef } from "react";
import type React from "react";

export function useHorizontalDrag<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const scrollStartRef = useRef(0);

  const onMouseDown = (event: React.MouseEvent<T>) => {
    isDraggingRef.current = true;
    dragStartRef.current = event.pageX;
    scrollStartRef.current = ref.current?.scrollLeft ?? 0;

    if (ref.current) {
      ref.current.style.cursor = "grabbing";
    }
  };

  const onMouseMove = (event: React.MouseEvent<T>) => {
    if (!isDraggingRef.current || !ref.current) {
      return;
    }

    ref.current.scrollLeft = scrollStartRef.current - (event.pageX - dragStartRef.current);
  };

  const stopDragging = () => {
    isDraggingRef.current = false;

    if (ref.current) {
      ref.current.style.cursor = "grab";
    }
  };

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp: stopDragging,
    onMouseLeave: stopDragging,
  };
}
