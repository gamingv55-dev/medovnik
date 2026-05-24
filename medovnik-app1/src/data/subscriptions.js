// ────────────────────────────────────────────────────────────
// Subscription tiers — rendered on the Community page.
// Marked with `hl: true` for the visually-promoted middle tier.
// ────────────────────────────────────────────────────────────
export const SUBSCRIPTIONS = [
  {
    id: 'free',
    plan: 'Безплатно',
    name: 'Общността',
    price: '0',
    per: '',
    features: ['Форум с рецепти', 'Основен Discord', 'Базови уроци', 'Email бюлетин'],
  },
  {
    id: 'monthly',
    plan: 'Месечен',
    name: 'Mead of Month',
    price: '39',
    per: '/месец',
    hl: true,
    features: [
      'Месечна кутия',
      'Ексклузивни рецепти',
      'Premium Discord',
      'Приоритетна помощ',
      'Ранен достъп',
    ],
  },
  {
    id: 'annual',
    plan: 'Годишен',
    name: 'Годишен план',
    price: '349',
    per: '/година',
    features: [
      'Всичко от месечния',
      '2 месеца безплатно',
      'Физическа книга',
      'Discord бадж',
      'Ексклузивни дегустации',
    ],
  },
];
