// Comportamentos globais da landing page
const menu = document.querySelector('.menu');
const nav = document.querySelector('.header nav');

if (menu && nav) {
  menu.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Microsoft Clarity — projeto Lumé Studio
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () {
    (c[a].q = c[a].q || []).push(arguments);
  };
  t = l.createElement(r);
  t.async = 1;
  t.src = 'https://www.clarity.ms/tag/' + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', 'ykk63v4ciq');
