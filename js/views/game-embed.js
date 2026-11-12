// 训练游戏 · 占位卡——完整游戏在落地页 #demo 区体验（与 #demo tab2 同一模块，此处为全屏位预留）
export function render(root) {
  root.innerHTML = `
  <div class="view-head">
    <span class="eyebrow">Training Game</span>
    <h1>Squat to Charge · Full-Screen Entry</h1>
    <p class="view-sub">This route is reserved for the exhibition's full-screen view. The complete game currently runs in the website's demo section.</p>
  </div>

  <div class="panel game-ph">
    <div class="game-ph-icon" aria-hidden="true">◉</div>
    <h3>Play the full training game in the #demo section</h3>
    <p class="lead">Camera pose estimation drives Squat to Charge: knee angles control the charge bar and combo score. Without a camera, simulated input is available. Pose analysis runs on the device.</p>
    <div class="quick-links">
      <a class="btn" href="demo.html#demo">Open the Full Training Game</a>
      <a class="btn ghost" href="#/screen">View the AI Dashboard</a>
    </div>
    <p class="plan-note">The game shares the #demo MediaPipe pipeline. This lightweight entry does not load the model a second time.</p>
  </div>`;
  return null;
}
