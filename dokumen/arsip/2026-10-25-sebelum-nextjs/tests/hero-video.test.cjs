const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync('hero-video.js', 'utf8');

function setup({ source = 'assets/intro.mp4', reduced = false, saveData = false, rejected = false } = {}) {
  const events = {}, motionEvents = {}, documentEvents = {};
  const video = {
    hidden: true, paused: true, plays: 0,
    addEventListener: (name, callback) => { events[name] = callback; },
    play() {
      this.plays++;
      if (rejected) return Promise.reject(new Error('Autoplay denied'));
      this.paused = false; events.playing(); return Promise.resolve();
    },
    pause() { this.paused = true; events.pause(); }
  };
  const button = { hidden: true, addEventListener: (name, callback) => { events.click = callback; } };
  const motion = { matches: reduced, addEventListener: (name, callback) => { motionEvents[name] = callback; } };
  const document = {
    hidden: false, querySelector: selector => selector === '.hero-video' ? video : button,
    addEventListener: (name, callback) => { documentEvents[name] = callback; }
  };
  vm.runInNewContext(code, { document, navigator: { connection: { saveData } }, window: { VELKIRA: { heroVideo: source }, matchMedia: () => motion } });
  return { video, button, events, motion, motionEvents, document, documentEvents };
}

test('No configured video leaves the artwork and hides the control', () => {
  const { video, button } = setup({ source: '' });
  assert.equal(video.plays, 0); assert.equal(button.hidden, true); assert.equal(video.hidden, true);
});
test('Autoplay is muted, with a working pause and play control', () => {
  const { video, button, events } = setup();
  assert.equal(video.muted, true); assert.equal(video.hidden, false); assert.match(button.innerHTML, /Jeda/);
  events.click(); assert.equal(video.paused, true); assert.match(button.innerHTML, /Putar/);
  events.click(); assert.equal(video.paused, false);
});
test('Reduced motion and data saving prevent autoplay but allow manual play', () => {
  for (const options of [{ reduced: true }, { saveData: true }]) {
    const { video, button, events } = setup(options);
    assert.equal(video.plays, 0); assert.equal(button.hidden, false);
    events.click(); assert.equal(video.plays, 1);
  }
});
test('A failed video restores artwork; blocked autoplay keeps a play button', async () => {
  const failed = setup(); failed.events.error();
  assert.equal(failed.video.hidden, true); assert.equal(failed.button.hidden, true);
  const blocked = setup({ rejected: true }); await new Promise(setImmediate);
  assert.equal(blocked.video.hidden, true); assert.equal(blocked.button.hidden, false); assert.match(blocked.button.innerHTML, /Putar/);
});
test('A motion preference change or hidden tab pauses playback', () => {
  const state = setup(); state.motion.matches = true; state.motionEvents.change();
  assert.equal(state.video.paused, true);
  state.events.click(); state.document.hidden = true; state.documentEvents.visibilitychange();
  assert.equal(state.video.paused, true);
});
