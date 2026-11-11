import { SHOP_URL } from '@/lib/site';

/**
 * The three Медовник kits. Names and contents come from the brand's website;
 * the app shows no prices and sells nothing — every card links to the site.
 */
export interface Kit {
  id: 'starter' | 'brewer' | 'master';
  name: string;
  subtitle: string;
  blurb: string;
  contents: string[];
  image?: string;
  /** Announced on the site but not on sale yet. */
  comingSoon?: boolean;
  url: string;
}

export const KITS: Kit[] = [
  {
    id: 'starter',
    name: 'Стартов Кит',
    subtitle: 'Само необходимото',
    blurb: 'Всичко необходимо за първата ти партида от пет литра.',
    contents: ['5L пластмасов съд', 'Въздушен клапан', 'Дрожди', 'Хранителна среда', 'Захаромер', 'Наръчник', 'Дезинфектант'],
    image: '/img/kit1.webp',
    comingSoon: true,
    url: SHOP_URL,
  },
  {
    id: 'brewer',
    name: 'Кит за Пивовар',
    subtitle: 'По-удобно и по-контролирано',
    blurb: 'Стъклен съд, помпа за претакане и добавките за плодови медовини.',
    contents: [
      '5L стъклен съд', 'Въздушен клапан', 'Премиум дрожди', 'Хранителна среда', 'Захаромер', 'Наръчник',
      'Помпа за претакване', 'Рецептурник', 'Персонализиран етикет за съда', 'Мрежеста торбичка за плодове',
      'Пектинов ензим', 'Дезинфектант',
    ],
    image: '/img/medium.webp',
    url: SHOP_URL,
  },
  {
    id: 'master',
    name: 'Майсторски Кит',
    subtitle: 'Пълното изживяване',
    blurb: 'Десетлитров стъклен съд и селекция дрожди за много партиди.',
    contents: [
      '10L стъклен съд', 'Въздушен клапан', 'Разнообразие от премиум дрожди', 'Хранителна среда', 'Захаромер',
      'Наръчник', 'Помпа за претакване', 'Рецептурник', 'Персонализиран етикет за съда',
      'Мрежеста торбичка за плодове', 'Пектинов ензим', 'Дезинфектант', 'Ексклузивни рецепти',
    ],
    comingSoon: true,
    url: SHOP_URL,
  },
];

export const kitById = (id: string): Kit | undefined => KITS.find((k) => k.id === id);
