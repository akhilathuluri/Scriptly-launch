import { useEffect, useState } from "react";

const POINTER_QUERY = "(hover: hover) and (pointer: fine)";

const clickableSelector =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="pointer"]';

const textSelector =
  'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"], [data-cursor="text"]';

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(POINTER_QUERY);

    const handleMediaChange = () => {
      setEnabled(mediaQuery.matches);
    };

    handleMediaChange();
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(
        "custom-cursor",
        "custom-cursor--visible",
        "custom-cursor--interactive",
        "custom-cursor--text"
      );
      return;
    }

    const root = document.documentElement;
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    root.classList.add("custom-cursor");

    const setCursorKind = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        root.classList.remove("custom-cursor--interactive", "custom-cursor--text");
        return;
      }

      const isText = Boolean(target.closest(textSelector));
      const isInteractive = Boolean(target.closest(clickableSelector));

      root.classList.toggle("custom-cursor--text", isText);
      root.classList.toggle("custom-cursor--interactive", isInteractive && !isText);
    };

    const moveDot = () => {
      dot.style.setProperty("--x", `${mouseX}px`);
      dot.style.setProperty("--y", `${mouseY}px`);
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.setProperty("--x", `${ringX}px`);
      ring.style.setProperty("--y", `${ringY}px`);

      rafId = window.requestAnimationFrame(animateRing);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      moveDot();
      setCursorKind(event.target);
      root.classList.add("custom-cursor--visible");
    };

    const handleMouseDown = () => {
      root.classList.add("custom-cursor--pressed");
    };

    const handleMouseUp = () => {
      root.classList.remove("custom-cursor--pressed");
    };

    const handleMouseLeave = () => {
      root.classList.remove(
        "custom-cursor--visible",
        "custom-cursor--interactive",
        "custom-cursor--text",
        "custom-cursor--pressed"
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    moveDot();
    rafId = window.requestAnimationFrame(animateRing);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      root.classList.remove(
        "custom-cursor",
        "custom-cursor--visible",
        "custom-cursor--interactive",
        "custom-cursor--text",
        "custom-cursor--pressed"
      );
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div id="cursor-ring" className="custom-cursor-ring" />
      <div id="cursor-dot" className="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;
