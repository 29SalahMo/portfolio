import { profile } from "@/data/profile";

/** Normalize to wa.me format: +201018394829 -> 201018394829 */
export function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("20")) return digits;
  if (digits.startsWith("0")) return `20${digits.slice(1)}`;
  return digits;
}

export function getWhatsAppPhone(): string {
  return normalizeWhatsAppNumber(profile.whatsapp);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${getWhatsAppPhone()}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(params: {
  name: string;
  email: string;
  message: string;
}): string {
  const subject = `Portfolio contact from ${params.name}`;
  const body = `${params.message}\n\n---\nFrom: ${params.name}\nReply-to: ${params.email}`;
  return `mailto:${profile.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildContactMessage(params: {
  name: string;
  email: string;
  message: string;
}): string {
  return `Hello Salahaldin, I'm ${params.name}.\n\n${params.message}\n\nReply-to email: ${params.email}`;
}

export function buildDefaultWhatsAppGreeting(name = "there"): string {
  return `Hello Salahaldin, I'm ${name}. I found your portfolio and would like to connect about an opportunity.`;
}

/** Opens WhatsApp (new tab) and email app (mailto) with the same message. */
export function sendViaWhatsAppAndEmail(params: {
  name: string;
  email: string;
  message: string;
}): void {
  const text = buildContactMessage(params);
  const whatsappUrl = buildWhatsAppUrl(text);
  const mailtoUrl = buildMailtoUrl(params);

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  const mailLink = document.createElement("a");
  mailLink.href = mailtoUrl;
  mailLink.style.display = "none";
  document.body.appendChild(mailLink);
  mailLink.click();
  document.body.removeChild(mailLink);
}
