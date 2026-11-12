// 教练端 · 用户列表（风险分层，模拟数据带 chip）+ 计划设定滑杆（写 plan.v1）
import { getPlan, setPlan } from '../data/repo.js';

// 演示名单（模拟——每行带 SIMULATED chip）
const USERS = [
  {
    id: 'u1', initials: 'Z.M', name: "User Z.M", tier: 'warn', tierLabel: "Needs attention",
    summary: ["Self-report increased by 2 points over 7 days (3→5; self-reported)", "62% completion; 4 missed training days in the past week"],
    rate: [4, 6, 5, 7, 0, 6, 8],
  },
  {
    id: 'u2', initials: 'L.Q', name: "User L.Q", tier: 'follow', tierLabel: "Follow up",
    summary: ["Self-report stable (2→2; self-reported)", "78% completion; 91% symmetry"],
    rate: [8, 7, 9, 8, 6, 9, 8],
  },
  {
    id: 'u3', initials: 'W.H', name: "User W.H", tier: 'good', tierLabel: "Stable",
    summary: ["Self-report decreased (4→2; self-reported)", "95% completion; entries on 9 consecutive days"],
    rate: [9, 10, 9, 10, 9, 10, 10],
  },
];

function userRow(u) {
  const bars = u.rate.map((v, i) => {
    const hpx = Math.max(3, v * 2.6);
    const peak = v === Math.max(...u.rate) ? ' peak' : '';
    return `<i class="${peak}" style="height:${hpx}px" title="Day ${i + 1}: ${v * 10}%"></i>`;
  }).join('');
  return `<div class="user-row tier-${u.tier}" data-tier="${u.tier}">
    <span class="avatar" aria-hidden="true">${u.initials}</span>
    <div class="u-main">
      <div class="u-name">${u.name} <span class="tier-chip">${u.tierLabel}</span></div>
      <div class="u-sum">${u.summary.map(s => `<span>${s}</span>`).join('')}</div>
    </div>
    <div class="u-side">
      <div class="mini-bars" role="img" aria-label="Completion over the past 7 days: ${u.rate.map(v => v * 10 + '%').join(', ')}">${bars}</div>
      <span class="ku-chip sim">SIMULATED</span>
    </div>
  </div>`;
}

export function render(root) {
  const plan = getPlan();

  root.innerHTML = `
  <div class="view-head">
    <span class="eyebrow">Coach Console</span>
    <h1>User Overview</h1>
    <p class="view-sub">Risk grouping organises information; it is not a medical judgement · All listed users are simulated</p>
  </div>

  <div class="grid-2">
    <div class="col">
      <div class="filter-chips" id="coach-filter" role="group" aria-label="Filter by group">
        <button type="button" class="fchip is-on" data-f="all">All</button>
        <button type="button" class="fchip" data-f="warn">Needs attention</button>
        <button type="button" class="fchip" data-f="follow">Follow up</button>
        <button type="button" class="fchip" data-f="good">Stable</button>
      </div>
      <div class="panel">
        <div class="user-list" id="coach-list">${USERS.map(userRow).join('')}</div>
        <p class="plan-note">Demo grouping rules: self-report change ×2 + missed days + symmetry decline + safety events ×3. All rows use SIMULATED data.</p>
      </div>
    </div>

    <div class="col">
      <div class="panel">
        <h3>Training Plan</h3>
        <p class="panel-sub">Saved to plan.v1 locally · Read immediately by Today's Plan on the Patient Dashboard</p>
        <div class="slider-row">
          <label for="pl-sets">Sets <output id="pl-sets-out">${plan.sets} ${plan.sets === 1 ? 'set' : 'sets'}</output></label>
          <input type="range" id="pl-sets" min="1" max="6" step="1" value="${plan.sets}">
        </div>
        <div class="slider-row">
          <label for="pl-reps">Reps per set <output id="pl-reps-out">${plan.reps} reps</output></label>
          <input type="range" id="pl-reps" min="4" max="20" step="1" value="${plan.reps}">
        </div>
        <div class="slider-row">
          <label for="pl-support">Support level <output id="pl-support-out">${plan.supportPct}%</output></label>
          <input type="range" id="pl-support" min="0" max="100" step="5" value="${plan.supportPct}">
        </div>
        <div class="sheet-actions">
          <button class="btn" id="pl-save">Save Settings</button>
        </div>
        <p class="save-ok" id="pl-ok" aria-live="polite"></p>
        <p class="plan-note">Daily volume: approximately <b id="pl-vol">${plan.sets * plan.reps}</b> reps/day · The level adjusts the demonstration's support setting; it is not a recommended device setting</p>
      </div>
    </div>
  </div>`;

  // 筛选
  root.querySelector('#coach-filter').addEventListener('click', e => {
    const btn = e.target.closest('.fchip'); if (!btn) return;
    root.querySelectorAll('.fchip').forEach(b => b.classList.toggle('is-on', b === btn));
    const f = btn.dataset.f;
    root.querySelectorAll('.user-row').forEach(r => {
      r.style.display = (f === 'all' || r.dataset.tier === f) ? '' : 'none';
    });
  });

  // 滑杆联动
  const sets = root.querySelector('#pl-sets'), reps = root.querySelector('#pl-reps'), sup = root.querySelector('#pl-support');
  const vol = root.querySelector('#pl-vol');
  const sync = () => {
    root.querySelector('#pl-sets-out').textContent = `${sets.value} ${sets.value === '1' ? 'set' : 'sets'}`;
    root.querySelector('#pl-reps-out').textContent = `${reps.value} reps`;
    root.querySelector('#pl-support-out').textContent = `${sup.value}%`;
    vol.textContent = String(sets.value * reps.value);
  };
  [sets, reps, sup].forEach(el => el.addEventListener('input', sync));

  root.querySelector('#pl-save').addEventListener('click', () => {
    const next = setPlan({ sets: +sets.value, reps: +reps.value, supportPct: +sup.value });
    root.querySelector('#pl-ok').textContent = `Saved: ${next.sets} ${next.sets === 1 ? 'set' : 'sets'} × ${next.reps} reps · Support level ${next.supportPct}%`;
  });

  return null;
}
