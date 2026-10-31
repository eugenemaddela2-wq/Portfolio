import { renderIcons, icon } from './icons.js';

const profile = {
  name: 'Eugene Maddela',
  title: 'Fourth-Year IT Student · Aspiring Cybersecurity Professional',
  bio: 'An Information Technology student exploring offensive security, defensive operations, networking, and software development. Passionate about building practical solutions, analyzing security challenges, and continuously developing technical skills.',
  email: '',
  location: 'Remote / Worldwide',
};

const skills = [
  'Kali Linux', 'Burp Suite', 'Wireshark', 'Wayback Machine', 'Python',
  'Web Security', 'Network Analysis', 'Security Research', 'Reconnaissance',
  'Offensive Security', 'Defensive Security', 'Networking', 'Software Development',
];

const certifications = [
  { name: 'OSCP', issuer: 'OffSec', date: '2025', url: 'https://www.offsec.com/courses/pen-200/' },
  { name: 'eJPT', issuer: 'INE', date: '2024', url: 'https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester' },
  { name: 'Google Cybersecurity', issuer: 'Google', date: '2024', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
  { name: 'TryHackMe Top 1%', issuer: 'TryHackMe', date: '2025', url: 'https://tryhackme.com' },
];

const socials = [
  { platform: 'github', url: 'https://github.com/' },
  { platform: 'linkedin', url: 'https://linkedin.com/' },
  { platform: 'twitter', url: 'https://twitter.com/' },
  { platform: 'hackerone', url: 'https://hackerone.com/' },
];

const platformIconName = { github: 'github', linkedin: 'linkedin', twitter: 'twitter', hackerone: 'shield' };

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function renderHero() {
  const firstName = profile.name.split(' ')[0].toUpperCase();
  const lastName = profile.name.split(' ').slice(1).join(' ').toUpperCase();
  document.getElementById('hero-name-text').innerHTML = `${escapeHtml(firstName)}<br /><span>${escapeHtml(lastName)}</span>`;
  document.getElementById('hero-title-text').innerHTML = escapeHtml(profile.title).replace(' · ', '<br />');
  document.getElementById('hero-bio').textContent = profile.bio;
}

function renderSkills() {
  document.getElementById('skill-tags').innerHTML = skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('');
}

function renderCertifications() {
  document.getElementById('certs-grid').innerHTML = certifications.map((cert) => `
    <article class="cert-card">
      <a href="${escapeHtml(cert.url)}" target="_blank" rel="noopener noreferrer">
        <span class="cert-icon">${icon('award')}</span><span class="cert-link">${icon('external-link')}</span>
        <h3 class="cert-name">${escapeHtml(cert.name)}</h3>
        <p class="cert-issuer">${escapeHtml(cert.issuer)} · ${escapeHtml(cert.date)}</p>
      </a>
    </article>
  `).join('');
}

function renderContact() {
  const socialRows = socials.map((social) => `
    <a class="contact-line" href="${escapeHtml(social.url)}" target="_blank" rel="noopener noreferrer">
      <span class="contact-icon">${icon(platformIconName[social.platform] || 'globe')}</span><span>${escapeHtml(social.url.replace(/^https?:\/\//, ''))}</span>
    </a>
  `).join('');
  document.getElementById('email-card').innerHTML = `
    <a class="contact-line" href="mailto:${escapeHtml(profile.email)}"><span class="contact-icon">${icon('mail')}</span><span>${escapeHtml(profile.email)}</span></a>
    ${socialRows}
    <a class="contact-line" href="#top"><span class="contact-icon">${icon('map-pin')}</span><span>${escapeHtml(profile.location)}</span></a>
  `;
}

function renderFooter() {
  document.getElementById('footer-copy').innerHTML = `© 2026 ${escapeHtml(profile.name)} · <span class="blue">Built for the curious.</span>`;
}

/* Public project vault — hardcoded portfolio work */
const projects = [
  { name: 'Barangay Management System', category: 'systems', description: 'A software development project focused on supporting barangay administrative workflows.', link: '' },
  { name: 'Voucher Management System', category: 'systems', description: 'A voucher-based system developed to manage user access and voucher-related operations.', link: '' },
  { name: 'MikroTik Hotspot Voucher System', category: 'networking', description: 'A MikroTik hotspot project involving voucher-based Wi-Fi access, user profiles, and hotspot configuration.', link: '' },
];

const categoryIcon = { networking: 'globe', cybersecurity: 'shield', systems: 'code', web: 'external-link', other: 'terminal' };

function renderProjects() {
  const grid = document.getElementById('vault-grid');
  grid.innerHTML = projects.map((project) => `
    <article class="vault-card">
      <div class="vault-cover"><span class="vault-cat cat-${escapeHtml(project.category)}">${escapeHtml(project.category)}</span><span class="vault-cover-icon">${icon(categoryIcon[project.category] || 'terminal')}</span></div>
      <div class="vault-body"><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p><div class="vault-foot">${project.link ? `<a class="vault-link" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">${icon('external-link')} VIEW</a>` : '<span></span>'}</div></div>
    </article>
  `).join('');
}

function initNavigation() {
  const header = document.getElementById('navbar');
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('menu-toggle');
  const openIcon = toggle.querySelector('.menu-open-icon');
  const closeIcon = toggle.querySelector('.menu-close-icon');

  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });
  toggle.addEventListener('click', () => {
    const open = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', open);
    openIcon.classList.toggle('hidden', !open);
    closeIcon.classList.toggle('hidden', open);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.add('hidden'); openIcon.classList.remove('hidden'); closeIcon.classList.add('hidden');
  }));
}

function main() {
  renderIcons();
  initNavigation();
  renderProjects();
  renderHero();
  renderSkills();
  renderCertifications();
  renderContact();
  renderFooter();
  renderIcons();
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

main();
