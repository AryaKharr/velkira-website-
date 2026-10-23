(() => {
  'use strict';
  const config = window.VELKIRA || {};
  const choice = document.querySelector('#service-choice');
  const wa = document.querySelector('#whatsapp');
  const email = document.querySelector('#email');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navlinks');
  let overlay = null, trigger = null;
  function updateContact() {
    const message = choice.value ? 'Halo Velkira, saya ingin membahas kebutuhan ' + choice.value + ' untuk bisnis saya.' : 'Halo Velkira, saya ingin membahas kebutuhan proyek untuk bisnis saya.';
    if (/^[1-9]\d{7,14}$/.test(config.whatsapp || '')) {
      wa.href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(message);
      wa.removeAttribute('aria-disabled');
      wa.innerHTML = 'Hubungi lewat WhatsApp <span>↗</span>';
      document.querySelector('#contact-status').textContent = '+' + config.whatsapp + ' · Kebutuhan dibahas sebelum menentukan lingkup dan penawaran.';
    } else {
      wa.removeAttribute('href'); wa.setAttribute('aria-disabled','true'); wa.textContent = 'WhatsApp belum diatur';
      document.querySelector('#contact-status').textContent = 'WhatsApp belum diatur.';
    }
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '');
    email.hidden = !validEmail;
    if (validEmail) email.href = 'mailto:' + config.email + '?subject=' + encodeURIComponent('Pembahasan proyek Velkira' + (choice.value ? ' — ' + choice.value : '')) + '&body=' + encodeURIComponent(message);
    else email.removeAttribute('href');
  }
  function closeMenu(restore = false) { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); if (restore) menu.focus(); }
  menu.hidden = false;
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  function closeModal(restore = true) { if (!overlay) return; overlay.remove(); overlay = null; document.body.classList.remove('modal-open'); if (restore && trigger) trigger.focus(); }
  document.addEventListener('click', e => {
    const context = e.target.closest('[data-context]');
    if (context) { choice.value = context.dataset.context; updateContact(); closeModal(false); document.querySelector('#kontak').scrollIntoView(); choice.focus({preventScroll:true}); }
    const opener = e.target.closest('[data-open]');
    if (!opener) return;
    e.preventDefault(); trigger = opener;
    overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    const detail = document.getElementById(opener.dataset.open).cloneNode(true);
    detail.id += '-modal'; detail.setAttribute('role','dialog'); detail.setAttribute('aria-modal','true');
    detail.querySelector('h2').id = detail.id + '-title'; detail.setAttribute('aria-labelledby', detail.querySelector('h2').id);
    const close = detail.querySelector('.close-detail'); close.hidden = false; close.addEventListener('click', () => closeModal());
    overlay.append(detail); document.body.append(overlay); document.body.classList.add('modal-open');
    overlay.addEventListener('click', event => { if (event.target === overlay) closeModal(); }); close.focus();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (overlay) closeModal(); else closeMenu(true); }
    if (e.key !== 'Tab' || !overlay) return;
    const targets = overlay.querySelectorAll('button,a[href],select,[tabindex="0"]');
    const first = targets[0], last = targets[targets.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  choice.addEventListener('change', updateContact);
  document.querySelector('#year').textContent = new Date().getFullYear();
  updateContact(); document.body.classList.add('enhanced');
})();
