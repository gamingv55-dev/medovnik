import { PRODUCTS } from '../data/products';
import { ADDONS }   from '../data/addons';
import ProductCard  from '../components/ui/ProductCard';
import AddonCard    from '../components/ui/AddonCard';

/**
 * Shop page. Two sections: kits (large product cards) and
 * stand-alone add-ons (compact placeholder cards).
 */
export default function ShopPage() {
  return (
    <div style={{ paddingTop: '8rem', background: 'var(--bark)', minHeight: '100vh' }}>
      <div className="sec" style={{ paddingTop: '2rem' }}>
        <div className="sec-label">Магазин</div>
        <h2 className="sec-h2">
          Нашите <span className="h2-accent">комплекти</span>
        </h2>
        <p className="sec-body" style={{ marginBottom: '4rem' }}>
          Всеки комплект включва видео наръчник, достъп до Discord и гаранция за успех.
        </p>

        <div className="products">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div style={{ marginTop: '6rem' }}>
          <div className="sec-label">Отделни продукти</div>
          <h2 className="sec-h2">
            Купи <span className="h2-accent">отделно</span>
          </h2>
          <p className="sec-body" style={{ marginBottom: '3rem' }}>
            Нуждаеш се само от един компонент? Избери от нашите самостоятелни продукти.
          </p>

          <div className="addons-grid">
            {ADDONS.map((a) => <AddonCard key={a.id} addon={a} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
