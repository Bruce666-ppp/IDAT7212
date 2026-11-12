// hash 路由（#/patient|#/coach|#/screen|#/game|#/body|#/assist）——切页销毁旧视图 + 滚动顶
import { render as renderPatient } from './views/patient.js';
import { render as renderCoach } from './views/coach.js';
import { render as renderScreen } from './views/screen.js';
import { render as renderGameEmbed } from './views/game-embed.js';
import { render as renderBody } from './views/body.js';
import { render as renderAssist } from './views/assist.js';

const routes = {
  patient: { title: "Patient Dashboard", render: renderPatient },
  coach: { title: "Coach Console", render: renderCoach },
  screen: { title: "AI Dashboard", render: renderScreen },
  game: { title: "Training Game", render: renderGameEmbed },
  body: { title: "Body Map", render: renderBody },
  assist: { title: "Assist Level", render: renderAssist },
};

let cleanup = null;

function currentRoute() {
  const h = location.hash.replace(/^#\/?/, '').split('?')[0];
  return routes[h] ? h : 'patient';
}

function mountView() {
  const el = document.getElementById('app');
  if (!el) return;
  const key = currentRoute();
  if (typeof cleanup === 'function') { try { cleanup(); } catch (e) { console.error('[router] cleanup', e); } }
  cleanup = null;
  el.innerHTML = '';
  document.querySelectorAll('#apps-nav .apps-chip').forEach(a =>
    a.classList.toggle('is-active', a.dataset.route === key));
  document.title = `KneeUp Apps · ${routes[key].title}`;
  const ret = routes[key].render(el);
  if (typeof ret === 'function') cleanup = ret;
  window.scrollTo(0, 0);
}

export function initRouter() {
  window.addEventListener('hashchange', mountView);
  mountView();
}

initRouter();
