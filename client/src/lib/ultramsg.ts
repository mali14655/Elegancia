const INSTANCE_ID = import.meta.env.VITE_ULTRAMSG_INSTANCE_ID as string | undefined;
const TOKEN = import.meta.env.VITE_ULTRAMSG_TOKEN as string | undefined;

/** Admin: 03250328377 */
export const ADMIN_PHONE = (import.meta.env.VITE_ADMIN_PHONE as string | undefined) ?? '923250328377';

export function formatPhone(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `92${digits.slice(1)}`;
  else if (!digits.startsWith('92') && digits.length === 10) digits = `92${digits}`;
  return digits;
}

async function sendWhatsApp(to: string, body: string): Promise<boolean> {
  if (!INSTANCE_ID || !TOKEN) return false;

  const params = new URLSearchParams({
    token: TOKEN,
    to: formatPhone(to),
    body,
    priority: '5',
  });

  try {
    const res = await fetch(`https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Sends order/partner notifications silently — no UI redirects. */
export async function sendOrderNotifications(
  adminBody: string,
  customerPhone: string,
  customerBody: string,
): Promise<void> {
  await Promise.all([
    sendWhatsApp(ADMIN_PHONE, adminBody),
    sendWhatsApp(customerPhone, customerBody),
  ]);
}
