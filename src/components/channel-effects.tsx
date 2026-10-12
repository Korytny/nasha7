import { useEffect } from "react";
export function ChannelEffects() {
  useEffect(() => {
    if (
      !window.matchMedia(
        "(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const cursor = document.createElement("div");
    cursor.className = "cursor-follower";
    document.body.append(cursor);
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      frame = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target;
      if (target instanceof Element) {
        cursor.classList.toggle("over-control", Boolean(target.closest("button,a")));
      }
      const heart = document.querySelector<HTMLElement>(".hero-air-heart");
      if (heart)
        heart.style.transform = `translate(${(x - window.innerWidth / 2) * 0.025}px, ${(y - 300) * 0.025}px) rotate(15deg)`;
    };
    const tick = () => {
      cx += (x - cx) * 0.14;
      cy += (y - cy) * 0.14;
      cursor.style.transform = `translate(${cx - 10}px,${cy - 10}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move);
    const buttons = document.querySelectorAll<HTMLElement>(".primary-cta");
    const magnet = (e: PointerEvent) => {
      const el = e.currentTarget;
      if (!(el instanceof HTMLElement)) return;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px,${(e.clientY - r.top - r.height / 2) * 0.15}px)`;
    };
    const reset = (e: PointerEvent) => {
      if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.transform = "";
    };
    buttons.forEach((el) => {
      el.addEventListener("pointermove", magnet);
      el.addEventListener("pointerleave", reset);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      cursor.remove();
      buttons.forEach((el) => {
        el.removeEventListener("pointermove", magnet);
        el.removeEventListener("pointerleave", reset);
      });
    };
  }, []);
  return null;
}
