// 身体记录 · 挂载七区身体图（点区域→底部 sheet→确认着色）
import { mountBodymap } from '../body/bodymap.js';

export function render(root) {
  root.innerHTML = `
  <div class="view-head">
    <span class="eyebrow">Body Map</span>
    <h1>Seven-Region Body Map</h1>
    <p class="view-sub">Select a region to record a 0–10 self-report and reference load · Not a medical assessment</p>
  </div>

  <div class="body-layout">
    <div class="panel bodymap-panel">
      <div id="bodymap-mount"></div>
    </div>

    <div class="col">
      <div class="panel">
        <h3>Colour Scale</h3>
        <p class="panel-sub">Cobalt (mild) → amber (moderate) → red (high) · Values are your own 0–10 self-reports</p>
        <div class="legend-bar" role="img" aria-label="Colour scale from cobalt to amber to red, corresponding to self-report values 0 to 10"></div>
        <div class="legend-ticks"><span>0</span><span>5</span><span>10</span></div>
        <div class="legend-chips" style="margin-top:14px">
          <span class="ku-chip">SUBJECTIVE · Self-report</span>
          <span class="ku-chip sim">SIMULATED · Demo entry</span>
        </div>
        <p class="plan-note">Seven regions: front, inner, outer and back of knee, hip, ankle and other side. The back-of-knee region records entries only; the other side provides a self-report comparison baseline.</p>
        <p class="plan-note">Saving updates body.regions.v1 locally and emits region:update to linked views.</p>
      </div>
    </div>
  </div>`;

  const cleanupMap = mountBodymap(root.querySelector('#bodymap-mount'));
  return cleanupMap;
}
