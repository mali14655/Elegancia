import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import CustomOrderBuilder from '../components/products/CustomOrderBuilder';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import type { CartItem } from '../context/CartContext';
import { formatPrice, isCustomPriced } from '../data/products';
import { buildAdminOrderMessage, buildCustomerOrderConfirmation } from '../lib/orderMessages';
import { formatPhone, sendOrderNotifications } from '../lib/ultramsg';

interface PlacedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
}

export default function CheckoutPage() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isCustomOrder = searchParams.get('custom') === '1';
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });

  useEffect(() => {
    const state = location.state as { customNotes?: string } | null;
    const stored = sessionStorage.getItem('elegancia-order-notes');
    const incoming = state?.customNotes ?? stored ?? '';

    if (incoming) {
      setForm((prev) => ({
        ...prev,
        notes: prev.notes ? `${prev.notes}\n\n${incoming}` : incoming,
      }));
      sessionStorage.removeItem('elegancia-order-notes');
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const hasCustomPricing = items.some((item) => isCustomPriced(item.product.price));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      toast('Your cart is empty', 'error');
      return;
    }

    setLoading(true);
    const orderId = `ELG-${Date.now().toString(36).toUpperCase()}`;
    const orderDetails = {
      orderId,
      customerName: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      notes: form.notes,
      items,
      subtotal,
    };

    const adminBody = buildAdminOrderMessage(orderDetails);
    const customerBody = buildCustomerOrderConfirmation(orderDetails);

    try {
      await sendOrderNotifications(adminBody, formatPhone(form.phone), customerBody);
      setPlacedOrder({
        orderId,
        customerName: form.name,
        phone: form.phone,
        items: [...items],
        subtotal,
      });
      clearCart();
      toast('Your order has been placed successfully.', 'success');
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (placedOrder) {
    return (
      <main className="inner-page">
        <section className="page-section section">
          <div className="section-inner">
            <div className="checkout-success">
              <div className="checkout-success-icon" aria-hidden>✓</div>
              <p className="section-eyebrow">Order Confirmed</p>
              <h2 className="section-heading">Thank you, {placedOrder.customerName}</h2>
              <p className="checkout-success-lead">
                Your order has been received successfully. A confirmation has been sent to your mobile number.
              </p>
              <div className="checkout-success-card">
                <div className="checkout-success-row">
                  <span>Order Reference</span>
                  <strong>{placedOrder.orderId}</strong>
                </div>
                <div className="checkout-success-row">
                  <span>Contact Number</span>
                  <strong>{placedOrder.phone}</strong>
                </div>
                <div className="checkout-success-row">
                  <span>Payment</span>
                  <strong>Cash on Delivery</strong>
                </div>
                <div className="checkout-success-divider" />
                <ul className="checkout-success-items">
                  {placedOrder.items.map((item) => (
                    <li key={item.product.id}>
                      <span>{item.product.name} × {item.qty}</span>
                      <span>{formatPrice(item.product.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="checkout-success-total">
                  <span>Total Amount</span>
                  <strong>{formatPrice(placedOrder.subtotal)}</strong>
                </div>
              </div>
              <p className="checkout-success-text">
                Our team will contact you shortly to confirm your delivery address and preferred time.
                Payment will be collected upon delivery. We appreciate your trust in Elegancía.
              </p>
              <div className="checkout-success-actions">
                <Link to="/products" className="btn-primary">Continue Shopping</Link>
                <Link to="/" className="btn-outline">Back to Home</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="inner-page checkout-page">
      <PageHero
        eyebrow={isCustomOrder ? 'Custom Order' : 'Checkout'}
        title={isCustomOrder ? 'Build Your Order' : 'Your Cart'}
        subtitle={
          isCustomOrder
            ? '6-bottle bundles (500ml or 1500ml), 5000ml jug, or single bottles'
            : 'Review your items and complete your order securely'
        }
      />
      <section className="page-section section">
        <div className="section-inner">
          {isCustomOrder && <CustomOrderBuilder />}

          <div className="checkout-layout">
          <div className="checkout-panel checkout-summary">
            <div className="checkout-panel-head">
              <h3>Order Summary</h3>
              {items.length > 0 && <span className="checkout-item-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>}
            </div>

            {items.length === 0 ? (
              <div className="checkout-empty">
                <p>{isCustomOrder ? 'Your cart is empty — add options above to get started.' : 'Your cart is empty.'}</p>
                {!isCustomOrder && <Link to="/products" className="btn-primary">Browse Products</Link>}
              </div>
            ) : (
              <>
                <ul className="checkout-items">
                  {items.map((item) => (
                    <li key={item.product.id} className="checkout-item">
                      <div className="checkout-item-img">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="checkout-item-info">
                        <h4>{item.product.name}</h4>
                        <p className="checkout-unit-price">
                          {isCustomPriced(item.product.price) ? 'Price on request' : `${formatPrice(item.product.price)} each`}
                        </p>
                        <div className="checkout-qty">
                          <button type="button" aria-label="Decrease quantity" onClick={() => updateQty(item.product.id, item.qty - 1)}>−</button>
                          <span>{item.qty}</span>
                          <button type="button" aria-label="Increase quantity" onClick={() => updateQty(item.product.id, item.qty + 1)}>+</button>
                        </div>
                      </div>
                      <div className="checkout-item-total">
                        <strong>
                          {isCustomPriced(item.product.price)
                            ? 'On request'
                            : formatPrice(item.product.price * item.qty)}
                        </strong>
                        <button type="button" className="checkout-remove" onClick={() => removeItem(item.product.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="checkout-totals">
                  <div className="checkout-total-row">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div className="checkout-total-row checkout-total-row-muted">
                    <span>Delivery</span>
                    <span>Calculated at confirmation</span>
                  </div>
                  <div className="checkout-total-row checkout-total-final">
                    <span>Total</span>
                    <strong>{hasCustomPricing && subtotal === 0 ? 'To be confirmed' : formatPrice(subtotal)}</strong>
                  </div>
                  {hasCustomPricing && (
                    <p className="checkout-custom-note">Custom items will be confirmed by our team before delivery.</p>
                  )}
                </div>
              </>
            )}
          </div>

          <form className="checkout-panel checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-panel-head">
              <h3>Delivery Information</h3>
            </div>

            <label className="checkout-field">
              <span>Full Name</span>
              <input
                type="text" placeholder="Your full name" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="checkout-field">
              <span>Mobile Number</span>
              <input
                type="tel" placeholder="03XX XXXXXXX" required
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="checkout-field">
              <span>Email <em>(optional)</em></span>
              <input
                type="email" placeholder="you@email.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="checkout-field">
              <span>Delivery Address</span>
              <textarea
                placeholder="Street, area, city" rows={3} required
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </label>
            <label className="checkout-field">
              <span>Order Notes <em>(optional)</em></span>
              <textarea
                placeholder="Any special instructions" rows={2}
                value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>

            <div className="checkout-cod">
              <div className="checkout-cod-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when your order arrives at your doorstep</p>
              </div>
            </div>

            <button type="submit" className="btn-primary checkout-submit" disabled={loading || !items.length}>
              {loading ? 'Processing…' : 'Place Order'}
            </button>
            <p className="checkout-secure-note">Your information is kept private and secure.</p>
          </form>
          </div>
        </div>
      </section>
    </main>
  );
}
