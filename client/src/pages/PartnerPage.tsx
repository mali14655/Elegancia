import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import { useToast } from '../context/ToastContext';
import { buildAdminPartnerMessage, buildCustomerPartnerConfirmation } from '../lib/orderMessages';
import { formatPhone, sendOrderNotifications } from '../lib/ultramsg';

interface PartnerForm {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export default function PartnerPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<PartnerForm>({
    name: '', email: '', phone: '', type: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone) {
      toast('Please enter your mobile number', 'error');
      return;
    }

    setLoading(true);
    const ref = `PTR-${Date.now().toString(36).toUpperCase()}`;
    const application = { ref, ...form };

    const adminBody = buildAdminPartnerMessage(application);
    const customerBody = buildCustomerPartnerConfirmation(application);

    try {
      await sendOrderNotifications(adminBody, formatPhone(form.phone), customerBody);
      setSent(true);
      toast('Application submitted successfully!', 'success');
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="inner-page">
      <PageHero
        eyebrow="Partnership"
        title="Become Our Partner"
        subtitle="Join hands with a brand that defines refinement."
      />
      <section className="page-section section">
        <div className="section-inner partner-form-wrap">
          {sent ? (
            <div className="form-success-card checkout-success">
              <div className="checkout-success-icon" aria-hidden>✓</div>
              <p className="section-eyebrow">Application Received</p>
              <h3 className="section-heading">Thank you, {form.name}</h3>
              <p className="checkout-success-text">
                We have received your partnership application and our team is reviewing it.
                We will contact you shortly on {form.phone} to discuss the next steps.
              </p>
            </div>
          ) : (
            <form className="partner-form" onSubmit={handleSubmit}>
              <input
                type="text" placeholder="Full Name" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email" placeholder="Email Address" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="tel" placeholder="03XX XXXXXXX" required
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <select
                required value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="" disabled>Partnership Type</option>
                <option>Distributor</option>
                <option>Retailer</option>
                <option>Corporate</option>
                <option>Hospitality</option>
              </select>
              <textarea
                placeholder="Tell us about your business" rows={4}
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button type="submit" className="btn-primary ripple-btn" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
