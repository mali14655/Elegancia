import type { CartItem } from '../context/CartContext';
import { formatPrice, isCustomPriced } from '../data/products';

const DIVIDER = '─────────────────';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
}

function formatItemLines(items: CartItem[]): string[] {
  return items.map((item, index) => {
    const lineTotal = isCustomPriced(item.product.price)
      ? 'Price on request'
      : formatPrice(item.product.price * item.qty);
    const unitPrice = isCustomPriced(item.product.price)
      ? 'On request'
      : formatPrice(item.product.price);
    return [
      `${index + 1}. ${item.product.name}`,
      `   ${item.qty} × ${unitPrice}  →  ${lineTotal}`,
    ].join('\n');
  });
}

/** Admin notification — clear, actionable, professional. */
export function buildAdminOrderMessage(order: OrderDetails): string {
  const itemBlock = formatItemLines(order.items).join('\n\n');
  const lines = [
    `*NEW ORDER — ELEGANCÍA*`,
    `_The Water of Elites_`,
    '',
    DIVIDER,
    '',
    `*Order Reference*`,
    order.orderId,
    '',
    `*Payment Method*`,
    `Cash on Delivery (COD)`,
    '',
    DIVIDER,
    '',
    `*Order Items*`,
    '',
    itemBlock,
    '',
    DIVIDER,
    '',
    `*Order Total:* ${formatPrice(order.subtotal)}`,
    '',
    DIVIDER,
    '',
    `*Customer Details*`,
    `Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email?.trim() || 'Not provided'}`,
    `Address: ${order.address}`,
  ];

  if (order.notes?.trim()) {
    lines.push('', `*Special Instructions*`, order.notes.trim());
  }

  lines.push(
    '',
    DIVIDER,
    '',
    `Please contact the customer to confirm delivery details and schedule dispatch.`,
  );

  return lines.join('\n');
}

/** Customer confirmation — warm, respectful, premium tone. */
export function buildCustomerOrderConfirmation(order: OrderDetails): string {
  const itemBlock = order.items
    .map((item) => {
      const price = isCustomPriced(item.product.price)
        ? 'On request'
        : formatPrice(item.product.price * item.qty);
      return `• ${item.product.name}  ×  ${item.qty}  —  ${price}`;
    })
    .join('\n');

  const lines = [
    `*ELEGANCÍA*`,
    `_The Water of Elites_`,
    '',
    DIVIDER,
    '',
    `Dear ${order.customerName},`,
    '',
    `Thank you for choosing Elegancía. We are pleased to confirm that your order has been received successfully.`,
    '',
    `*Order Reference:* ${order.orderId}`,
    `*Payment Method:* Cash on Delivery`,
    '',
    DIVIDER,
    '',
    `*Your Order*`,
    '',
    itemBlock,
    '',
    `*Total Amount:* ${formatPrice(order.subtotal)}`,
    '',
    DIVIDER,
    '',
    `Our team will contact you shortly on ${order.phone} to confirm your delivery address and preferred time.`,
    '',
    `Payment will be collected upon delivery. If you have any questions, simply reply to this message — we are happy to assist.`,
    '',
    `We truly appreciate your trust in Elegancía and look forward to serving you.`,
    '',
    `With warm regards,`,
    `*The Elegancía Team*`,
    '',
    `_The Water of Elites_`,
  ];

  return lines.join('\n');
}

export interface PartnerApplication {
  ref: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message?: string;
}

export function buildAdminPartnerMessage(app: PartnerApplication): string {
  const lines = [
    `*NEW PARTNERSHIP APPLICATION — ELEGANCÍA*`,
    `_The Water of Elites_`,
    '',
    DIVIDER,
    '',
    `*Reference:* ${app.ref}`,
    '',
    `*Applicant Details*`,
    `Name: ${app.name}`,
    `Email: ${app.email}`,
    `Phone: ${app.phone}`,
    `Partnership Type: ${app.type}`,
  ];

  if (app.message?.trim()) {
    lines.push('', `*Message*`, app.message.trim());
  }

  lines.push('', DIVIDER, '', `Please review and follow up with the applicant at your earliest convenience.`);

  return lines.join('\n');
}

export interface ContactInquiry {
  ref: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function buildAdminContactMessage(inquiry: ContactInquiry): string {
  const lines = [
    `*NEW CONTACT INQUIRY — ELEGANCÍA*`,
    `_The Water of Elites_`,
    '',
    DIVIDER,
    '',
    `*Reference:* ${inquiry.ref}`,
    '',
    `*From*`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Subject: ${inquiry.subject}`,
    '',
    `*Message*`,
    inquiry.message.trim() || '—',
    '',
    DIVIDER,
    '',
    `Please follow up with the customer at your earliest convenience.`,
  ];
  return lines.join('\n');
}

export function buildCustomerContactConfirmation(inquiry: ContactInquiry): string {
  return [
    `*ELEGANCÍA*`,
    `_The Water of Elites_`,
    '',
    DIVIDER,
    '',
    `Dear ${inquiry.name},`,
    '',
    `Thank you for contacting Elegancía. We have received your message and our team will get back to you shortly on ${inquiry.phone}.`,
    '',
    `*Reference:* ${inquiry.ref}`,
    `*Subject:* ${inquiry.subject}`,
    '',
    DIVIDER,
    '',
    `We appreciate your interest in The Water of Elites.`,
    '',
    `With warm regards,`,
    `*The Elegancía Team*`,
  ].join('\n');
}

export function buildCustomerPartnerConfirmation(app: PartnerApplication): string {
  return [
    `*ELEGANCÍA*`,
    `_The Water of Elites_`,
    '',
    DIVIDER,
    '',
    `Dear ${app.name},`,
    '',
    `Thank you for your interest in partnering with Elegancía.`,
    '',
    `We have received your application and our team is currently reviewing it. A member of our partnerships team will contact you shortly on ${app.phone}.`,
    '',
    `*Reference:* ${app.ref}`,
    '',
    DIVIDER,
    '',
    `We appreciate your interest in representing a brand built on refinement and excellence.`,
    '',
    `With warm regards,`,
    `*The Elegancía Team*`,
    '',
    `_The Water of Elites_`,
  ].join('\n');
}
