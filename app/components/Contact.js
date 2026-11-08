'use client';

import { useState } from 'react';
import { contact, services, whatsappUrl } from '../content.mjs';

export default function Contact() {
  const [service, setService] = useState('');
  return <div className="contact-action">
    <label htmlFor="service-choice">Yang ingin dibahas</label>
    <select id="service-choice" value={service} onChange={event => setService(event.target.value)}>
      <option value="">Kebutuhan proyek secara umum</option>
      {services.map(item => <option key={item.name}>{item.name}</option>)}
      <option>Website seperti SunDays</option>
    </select>
    <a className="button" href={whatsappUrl(service)} target="_blank" rel="noopener noreferrer">Hubungi lewat WhatsApp <span aria-hidden="true">↗</span></a>
    {contact.email && <a className="email-link" href={`mailto:${contact.email}`}>{contact.email}</a>}
    <p className="contact-phone">{contact.displayPhone}</p>
    <p className="contact-note">Mulai dari kebutuhan yang sudah kamu tahu. Estimasi diberikan setelah lingkupnya jelas.</p>
  </div>;
}
