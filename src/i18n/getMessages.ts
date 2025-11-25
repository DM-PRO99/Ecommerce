import type { Locale } from './config';

export async function getMessages(locale: Locale) {
  const messages = await import(`../locales/${locale}/common.json`);
  return messages.default;
}
