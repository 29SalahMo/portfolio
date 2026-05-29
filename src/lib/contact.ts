import { profile } from "@/data/profile";

/** Normalize Egyptian numbers for wa.me (e.g. 010... or 02010... -> 2010...) */
export function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("20")) return digits;
  if (digits.startsWith("0")) return `20${digits.slice(1)}`;
  return `20${digits}`;
}

export function buildWhatsAppUrl(message: string): string {
  const phone = normalizeWhatsAppNumber(profile.whatsapp);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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

export function buildDefaultWhatsAppGreeting(name = "there"): string {
  return `Hello Salahaldin, I'm ${name}. I found your portfolio and would like to connect about an opportunity.`;
}
