const container = document.documentElement;
const throttleDelay = 50;
const scrollSpeedSensitivity = 1.6;

let isDragging = false;
let startY!: number;
let scrollTop!: number;
let lastY!: number;

function throttle(func: Function, delay: number) {
  let lastCall = 0;

  return function (...args: unknown[]) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

container.addEventListener("mousedown", (e: MouseEvent) => {
  // Prevent dragging if clicking on interactive elements
  if (
    (e.target as HTMLElement).tagName === "A" ||
    (e.target as HTMLElement).tagName === "BUTTON" ||
    (e.target as HTMLElement).closest("a") ||
    (e.target as HTMLElement).closest("button")
  )
    return;

  isDragging = true;
  startY = e.pageY;
  lastY = e.pageY;
  scrollTop = container.scrollTop;
  container.style.cursor = "grabbing";
});

container.addEventListener(
  "mousemove",
  throttle((e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    lastY = e.pageY;
    requestAnimationFrame(() => {
      const deltaY = lastY - startY;
      container.scrollTop = scrollTop - deltaY * scrollSpeedSensitivity;
    });
  }, throttleDelay),
);

container.addEventListener("mouseup", () => {
  isDragging = false;
  container.style.cursor = "auto"; // Reset to auto
});

container.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    container.style.cursor = "auto"; // Reset to auto
  }
});

container.style.scrollBehavior = "smooth";
container.style.cursor = "auto"; // Force auto on load
