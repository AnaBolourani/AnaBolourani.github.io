/* Feather icon render */
feather.replace();

/* ===== Dark-mode toggle ===== */
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const now = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', now);
  toggle.firstElementChild.dataset.feather = now === 'light' ? 'moon' : 'sun';
  feather.replace();
});

/* ===== Mobile hamburger ===== */
const nav = document.getElementById('nav-links');
document.querySelector('.hamburger').addEventListener('click', () => nav.classList.toggle('open'));

/* ===== Scroll-reveal ===== */
const observer = new IntersectionObserver(entries =>
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), 
  { threshold: 0.2 }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

/* ===== GitHub repo grid ===== */
const username = 'USERNAME';  // <— change!
const maxRepos = 6;
async function loadRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  const data = await res.json();
  const repos = data
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, maxRepos);
  const grid = document.getElementById('repo-grid');
  repos.forEach(r => {
    grid.insertAdjacentHTML('beforeend', `
      <article class="card" data-animate>
        <h3><a href="${r.html_url}" target="_blank">${r.name}</a></h3>
        <p>${r.description ?? '— No description —'}</p>
        <small>⭐ ${r.stargazers_count} · Updated ${new Date(r.updated_at).toLocaleDateString()}</small>
      </article>
    `);
  });
}
loadRepos();
