import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import {
  CUSTOM_ORDER_OPTIONS,
  formatPrice,
  getPresetTotal,
  getProduct,
} from '../../data/products';

export default function CustomOrderBuilder() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handlePreset = (title: string, items: readonly { productId: string; qty: number }[]) => {
    items.forEach((entry) => {
      const product = getProduct(entry.productId);
      if (product) addItem(product, entry.qty);
    });
    toast(`${title} added to cart`, 'success');
  };

  const handleAddOne = (productId: string, title: string) => {
    const product = getProduct(productId);
    if (!product) return;
    addItem(product, 1);
    toast(`${title} added to cart`, 'success');
  };

  return (
    <div className="custom-order-builder">
      <div className="custom-order-builder-head">
        <p className="section-eyebrow">Custom Order</p>
        <h3>Choose your options</h3>
        <p>
          6-bottle bundles (small 500ml or large 1500ml), 5000ml jug, or single 1500ml / 500ml bottles.
        </p>
      </div>

      <div className="custom-order-options">
        {CUSTOM_ORDER_OPTIONS.map((option) => {
          const image =
            option.type === 'preset'
              ? option.image
              : getProduct(option.productId)?.image ?? '';
          const price =
            option.type === 'preset'
              ? formatPrice(getPresetTotal(option.items))
              : formatPrice(getProduct(option.productId)?.price ?? 0);

          return (
            <article key={option.id} className="custom-order-option">
              <div className="custom-order-option-img">
                <img src={image} alt="" />
              </div>
              <div className="custom-order-option-body">
                {option.type === 'preset' && (
                  <span className="custom-order-option-tag">6-Pack</span>
                )}
                <h4>{option.title}</h4>
                <p>{option.description}</p>
                <strong className="custom-order-option-price">{price}</strong>
                <button
                  type="button"
                  className={option.type === 'preset' ? 'btn-primary' : 'btn-outline'}
                  onClick={() =>
                    option.type === 'preset'
                      ? handlePreset(option.title, option.items)
                      : handleAddOne(option.productId, option.title)
                  }
                >
                  {option.addLabel}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
