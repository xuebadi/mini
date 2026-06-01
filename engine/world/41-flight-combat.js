// engine/world/41-flight-combat.js
// -------- flight combat: guns, targeting HUD, missiles --------
// Scene-space combat for the stunt plane. Hooked from 34-flight-sim.js via
// optional globals (same pattern as window.__tinyworldMultiplayer.broadcastFlight).
// Reads the rendered plane transform off window.__flightJet each tick; never
// touches the sim-space flight physics.
(function flightCombatModule() {
  'use strict';
  if (typeof THREE === 'undefined') return;

  let active = false;
  let jet = null; // window.__flightJet while flying

  function onEnter(flyingJet) {
    jet = flyingJet || window.__flightJet || null;
    active = true;
  }

  function onExit() {
    active = false;
    jet = null;
  }

  function tick(dt) {
    if (!active || !(dt > 0)) return;
    // systems added in later tasks
  }

  function telemetry() {
    return {
      active,
      hasJet: !!jet,
    };
  }

  window.__flightCombat = { onEnter, onExit, tick, telemetry };
})();
