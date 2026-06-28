import { useNavigate } from 'react-router-dom';

export default function CustomOrderSection() {
  const navigate = useNavigate();

  return (
    <div className="custom-order-section">
      <div className="custom-order-copy">
        <p className="section-eyebrow">Tailored For You</p>
        <h3>Need a custom order?</h3>
        <p>
          6-bottle bundles (500ml or 1500ml), 5000ml jug, or single 1500ml / 500ml bottles.
        </p>
      </div>
      <button
        type="button"
        className="btn-primary custom-order-btn"
        onClick={() => navigate('/checkout?custom=1')}
      >
        Build Custom Order
      </button>
    </div>
  );
}
