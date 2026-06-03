import '../styles/shop.css';
import '../styles/shop-wanted.css';
import { PRODUCTS }    from '../data/products';
import { ADDONS }      from '../data/addons';
import { FLAVORINGS }  from '../data/flavorings';
import ProductCard     from '../components/ui/ProductCard';
import { LockIcon }   from '../components/ui/Icons';
import AddonCard       from '../components/ui/AddonCard';
import HoneyCard       from '../components/ui/HoneyCard';

export default function ShopPage() {
  return (
    <div className="shop-wood" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="sec" style={{ paddingTop: '2rem' }}>

        {/* ── Комплекти ───────────────────────────────────────── */}
        <div className="sec-label">Магазин</div>
        <h2 className="sec-h2">
          Нашите <span className="h2-accent">комплекти</span>
        </h2>
        <p className="sec-body" style={{ marginBottom: '4rem' }}>
          Всеки комплект включва видео наръчник, достъп до Discord и гаранция за успех.
        </p>
        <div className="preorder-banner">
          <span className="preorder-icon"><LockIcon size={18} /></span>
          <span className="preorder-text">
            Поръчай сега и заключи цената — всяка предварителна поръчка носи
            <strong> 10% отстъпка</strong> при официалния старт на продукта.
          </span>
        </div>

        <div className="products">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* ── Вкусове & Добавки ───────────────────────────────── */}
        <div style={{ marginTop: '7rem' }}>
          <div className="sec-label">Вкусове</div>
          <h2 className="sec-h2">
            Пакети за <span className="h2-accent">овкусяване</span>
          </h2>
          <p className="sec-body" style={{ marginBottom: '3rem' }}>
            Добави характер към медовината си — всеки пакет е балансирана смес от билки,
            плодове и подправки.
          </p>
          <div className="addons-grid">
            {FLAVORINGS.map((f) => <AddonCard key={f.id} addon={f} />)}
          </div>
        </div>

        {/* ── Мед ─────────────────────────────────────────────── */}
        <div style={{ marginTop: '7rem' }}>
          <div className="sec-label">Съставки</div>
          <h2 className="sec-h2">
            Мед за <span className="h2-accent">медовина</span>
          </h2>
          <p className="sec-body" style={{ marginBottom: '3rem' }}>
            Висококачествен мед от проверени пчелари — 950 г буркан, избери своя вид.
          </p>
          <div className="honey-grid">
            <HoneyCard />
          </div>
        </div>

        {/* ── Отделни продукти ────────────────────────────────── */}
        {ADDONS.some(a => a.price != null) && (
          <div style={{ marginTop: '7rem' }}>
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
        )}

      </div>
    </div>
  );
}
