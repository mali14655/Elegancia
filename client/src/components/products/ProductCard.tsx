import { formatPrice } from '../../data/products';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = () => {
    addItem(product);
    toast(`${product.name} added to cart`, 'success');
  };

  return (
    <article className="product-card-v2">
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button type="button" className="btn-add-cart" onClick={handleAdd}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
