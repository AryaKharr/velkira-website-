export function canAutoplay({ reducedMotion = false, saveData = false, hidden = false }) {
  return !reducedMotion && !saveData && !hidden;
}
