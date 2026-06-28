import PageHero from '../components/ui/PageHero';
import ProductCard from '../components/products/ProductCard';
import CustomOrderSection from '../components/products/CustomOrderSection';
import { PRODUCTS } from '../data/products';

export default function ProductsPage() {
  return (
    <main className="inner-page">
      <PageHero eyebrow="Pure Collection" title="Our Products" subtitle="Premium mineral water bottled with care." />
      <section className="page-section section solid-light">
        <div className="section-inner">
          <div className="products-grid">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <CustomOrderSection />
        </div>
      </section>
    </main>
  );
}
