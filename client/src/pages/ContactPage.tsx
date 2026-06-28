import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import { useToast } from '../context/ToastContext';
import { FOOTER_COLS } from '../data/content';
import { buildAdminContactMessage, buildCustomerContactConfirmation } from '../lib/orderMessages';
import { formatPhone, sendOrderNotifications } from '../lib/ultramsg';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const { contact } = FOOTER_COLS;

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    name: '', email: '', phone: '', subject: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      toast('Please enter your mobile number', 'error');
      return;
    }

    setLoading(true);
    const ref = `CNT-${Date.now().toString(36).toUpperCase()}`;
    const inquiry = { ref, ...form };

    try {
      await sendOrderNotifications(
        buildAdminContactMessage(inquiry),
        formatPhone(form.phone),
        buildCustomerContactConfirmation(inquiry),
      );
      setSent(true);
      toast('Message sent successfully', 'success');
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="inner-page contact-page">
      <PageHero
        eyebrow="Reach Us"
        title="Contact"
        subtitle="Questions about orders, partnerships, or distribution — our team is here to help."
      />

      <section className="page-section section">
        <div className="section-inner contact-layout">
          <div className="contact-info">
            <p className="section-eyebrow">Get in Touch</p>
            <h2 className="contact-info-title">We&apos;d love to hear from you</h2>
            <p className="contact-info-lead">
              Reach out for orders, bulk supply, partnerships, or general enquiries. We respond promptly during business hours.
            </p>

            <div className="contact-cards">
              <article className="contact-card">
                <span className="contact-card-label">Email</span>
                {contact.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`}>{email}</a>
                ))}
              </article>

              <article className="contact-card">
                <span className="contact-card-label">Phone</span>
                <a href="tel:+923134666686">{contact.phone}</a>
                <p className="contact-card-note">Mon – Sat, 9:00 AM – 6:00 PM</p>
              </article>

              <article className="contact-card">
                <span className="contact-card-label">Location</span>
                <p>{contact.location}</p>
                <p className="contact-card-note">Serving clients across Pakistan</p>
              </article>
            </div>
          </div>

          <div className="contact-form-panel">
            {sent ? (
              <div className="contact-success checkout-success">
                <div className="checkout-success-icon" aria-hidden>✓</div>
                <p className="section-eyebrow">Message Sent</p>
                <h3 className="section-heading">Thank you, {form.name}</h3>
                <p className="checkout-success-text">
                  We have received your message and will get back to you shortly on {form.phone}.
                </p>
              </div>
            ) : (
              <>
                <h3>Send a Message</h3>
                <p className="contact-form-lead">Fill in the form and our team will respond as soon as possible.</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label className="contact-field">
                    <span>Full Name</span>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </label>
                  <label className="contact-field">
                    <span>Email</span>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>
                  <label className="contact-field">
                    <span>Mobile Number</span>
                    <input
                      type="tel"
                      placeholder="03XX XXXXXXX"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </label>
                  <label className="contact-field">
                    <span>Subject</span>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="" disabled>Select a topic</option>
                      <option>Order Enquiry</option>
                      <option>Bulk / Custom Order</option>
                      <option>Partnership</option>
                      <option>Distribution</option>
                      <option>General Question</option>
                    </select>
                  </label>
                  <label className="contact-field">
                    <span>Message</span>
                    <textarea
                      placeholder="How can we help you?"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </label>
                  <button type="submit" className="btn-primary contact-submit" disabled={loading}>
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
