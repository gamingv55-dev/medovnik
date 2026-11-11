import { honeyForGravity, type NitrogenNeed, type Sweetness } from '@/lib/brewing';

/**
 * Recipes. Every amount is written for BASE_LITERS and scaled on the recipe page.
 *
 * All recipes here are DEMONSTRATION content: honey is derived from the target
 * gravity with the app's own formula, and fruit and spice amounts follow common
 * home practice. None has been brewed and signed off by Медовник. To publish a
 * tested recipe, set `verified: true` on it.
 */
export const BASE_LITERS = 5;

export type RecipeCategory = 'traditional' | 'melomel' | 'metheglin' | 'cyser' | 'pyment' | 'sparkling' | 'experimental';

export const CATEGORY_LABEL: Record<RecipeCategory, string> = {
  traditional: 'Традиционна',
  melomel: 'Плодова',
  metheglin: 'С подправки',
  cyser: 'С ябълки',
  pyment: 'С грозде',
  sparkling: 'Газирана',
  experimental: 'Експериментална',
};

export const DIFFICULTY_LABEL = ['', 'Лесна', 'Средна', 'За напреднали'] as const;

export interface Ingredient {
  name: string;
  amount?: number;
  unit?: string;
  /** False for things that do not grow with the batch (one sachet of yeast, say). */
  scales?: boolean;
  note?: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Recipe {
  id: string;
  name: string;
  tagline: string;
  /** Flavour profile, two or three sentences. */
  profile: string;
  category: RecipeCategory;
  sweetness: Sweetness;
  sparkling?: boolean;
  difficulty: 1 | 2 | 3;
  /** Colour in the glass, for the swatch. */
  color: string;
  og: number;
  /** Expected final gravity range, as served. */
  fg: [number, number];
  /** Gravity the yeast ferments down to, when the mead is sweetened afterwards. */
  fermentsTo?: number;
  yeast: string;
  need: NitrogenNeed;
  tempC: [number, number];
  /** Rough duration. Never a promise — the hydrometer decides. */
  duration: string;
  ingredients: Ingredient[];
  steps: Step[];
  aging: string;
  /** Ids from content/problems.ts worth reading before starting. */
  watchFor: string[];
  kit: 'starter' | 'brewer' | 'master';
  verified?: boolean;
}

const honey = (og: number, otherPoints = 0): Ingredient => ({
  name: 'Мед',
  amount: Math.round(honeyForGravity(BASE_LITERS, og, otherPoints).honeyKg * 100) / 100,
  unit: 'кг',
});

const WATER: Ingredient = { name: 'Вода', note: 'до общия обем — мека или бутилирана, без хлор' };
const NUTRIENT: Ingredient = { name: 'Хранителни вещества', note: 'по графика по-долу' };
const yeast = (name: string): Ingredient => ({ name: `Дрожди ${name}`, amount: 5, unit: 'г', scales: false, note: 'едно пакетче стига за 4,5–23 л' });

/* Steps shared by most recipes. */
const SANITIZE: Step = {
  title: 'Дезинфекцирай',
  text: 'Измий и дезинфекцирай всичко, което ще докосне мъстта — съда, капака, клапана, лъжицата, ареометъра. Това е стъпката, която най-често решава дали партидата ще стане.',
};
const MIX: Step = {
  title: 'Приготви мъстта',
  text: 'Разтвори меда в част от водата — хладка, не гореща, за да запазиш аромата му. Долей с вода до общия обем и разбъркай енергично няколко минути: в началото дрождите имат нужда от кислород.',
};
const MEASURE: Step = {
  title: 'Измери началната плътност',
  text: 'Вземи проба и измери с ареометъра. Запиши стойността — без нея няма как да изчислиш алкохола накрая. Ако е далеч от очакваната, добави малко мед или вода и измери пак.',
};
const PITCH: Step = {
  title: 'Добави дрождите',
  text: 'Рехидратирай дрождите във вода според указанията на пакетчето, остави ги да се изравнят по температура с мъстта и ги добави. Затвори съда и сложи клапана с вода в него.',
};
const FEED: Step = {
  title: 'Подхранвай',
  text: 'Добави хранителните вещества на части по графика. Преди всяко добавяне разбъркай внимателно, за да излезе газът — иначе мъстта ще изкипи.',
};
const WATCH: Step = {
  title: 'Следи ферментацията',
  text: 'Дръж съда на тъмно при стабилна температура. Мери плътността на всеки няколко дни. Ферментацията е приключила, когато две измервания през няколко дни съвпаднат — не когато клапанът спре да бълбука.',
};
const RACK: Step = {
  title: 'Претакай',
  text: 'Когато плътността се стабилизира, прехвърли медовината със сифон в чист съд, без да вдигаш утайката. Остави възможно най-малко въздух над течността.',
};
const CLEAR: Step = {
  title: 'Избистри',
  text: 'Остави медовината да се избистри сама на хладно. Това отнема седмици до месеци; ако бързаш, избистрител по указанията на производителя помага.',
};
const BOTTLE: Step = {
  title: 'Бутилирай',
  text: 'Бутилирай, когато медовината е бистра и плътността не се е променила от последното измерване. Запиши датата — ще ти трябва, за да знаеш кога да опиташ.',
};
const STABILIZE: Step = {
  title: 'Стабилизирай и подслади',
  text: 'За да остане сладка, медовината трябва първо да се стабилизира със сулфит и сорбат по указанията на производителя. След това добавяй мед на малки части, разбърквай и опитвай, докато стигнеш желаната сладост.',
};

const STILL_END = [RACK, CLEAR, BOTTLE];

export const RECIPES: Recipe[] = [
  {
    id: 'classic-dry',
    name: 'Класическа суха медовина',
    tagline: 'Само мед, вода и дрожди',
    profile:
      'Чиста и суха, с аромат на меда, от който е направена. Най-добрата първа партида: няма къде да се скрие грешка, но и няма излишни стъпки.',
    category: 'traditional',
    sweetness: 'dry',
    difficulty: 1,
    color: '#E0B040',
    og: 1.09,
    fg: [0.996, 1.002],
    yeast: 'Lalvin 71B или EC-1118',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец до края на ферментацията, после няколко месеца отлежаване',
    ingredients: [honey(1.09), WATER, yeast('Lalvin 71B'), NUTRIENT],
    steps: [SANITIZE, MIX, MEASURE, PITCH, FEED, WATCH, ...STILL_END],
    aging: 'Пие се и млада, но след три до шест месеца в бутилка става видимо по-мека и закръглена.',
    watchFor: ['no-start', 'sulfur', 'cloudy'],
    kit: 'starter',
  },
  {
    id: 'semi-sweet',
    name: 'Традиционна полусладка',
    tagline: 'Суха ферментация, после мед по вкус',
    profile:
      'Мек меден вкус с лека сладост, която балансира алкохола. Сладостта се добавя накрая, затова я контролираш изцяло.',
    category: 'traditional',
    sweetness: 'semi',
    difficulty: 2,
    color: '#D9A035',
    og: 1.1,
    fg: [1.01, 1.018],
    fermentsTo: 1.0,
    yeast: 'Lalvin 71B или D47',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, после стабилизиране и отлежаване',
    ingredients: [
      honey(1.1),
      WATER,
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Мед за подслаждане', amount: 200, unit: 'г', note: 'ориентир — добавяй на части и опитвай' },
      { name: 'Стабилизатори (сулфит и сорбат)', note: 'по указанията на производителя' },
    ],
    steps: [SANITIZE, MIX, MEASURE, PITCH, FEED, WATCH, RACK, STABILIZE, CLEAR, BOTTLE],
    aging: 'Остави я поне три месеца след подслаждането, за да се слее добавеният мед с останалото.',
    watchFor: ['stuck', 'too-sweet', 'overcarbonated'],
    kit: 'brewer',
  },
  {
    id: 'sweet-dessert',
    name: 'Сладка десертна медовина',
    tagline: 'Силна, плътна, за малки чаши',
    profile:
      'Гъста и сладка, с много мед и висок алкохол. Дрождите спират сами, когато стигнат предела си, и остатъкът от захарта остава в чашата.',
    category: 'traditional',
    sweetness: 'sweet',
    difficulty: 3,
    color: '#C98A1E',
    og: 1.13,
    fg: [1.02, 1.035],
    yeast: 'Lalvin 71B',
    need: 'low',
    tempC: [16, 20],
    duration: 'Ферментира бавно — често два месеца и повече; отлежава дълго',
    ingredients: [honey(1.13), WATER, yeast('Lalvin 71B'), NUTRIENT],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      PITCH,
      FEED,
      {
        title: 'Следи ферментацията',
        text: 'Силната мъст е тежка за дрождите и ферментацията върви бавно. Мери плътността веднъж седмично. Къде точно ще спре зависи от толеранса на дрождите към алкохол — крайната плътност е очакване, не обещание.',
      },
      ...STILL_END,
    ],
    aging: 'Тази медовина иска време: година в бутилка не е много. Млада е остра и алкохолна.',
    watchFor: ['stuck', 'no-start', 'too-sweet'],
    kit: 'master',
  },
  {
    id: 'cherry',
    name: 'Черешова медовина',
    tagline: 'Замразени череши без костилка',
    profile:
      'Рубинен цвят, плодов аромат и лека киселинност от черешите, която балансира меда. Вишните дават по-ярък вкус от сладките череши.',
    category: 'melomel',
    sweetness: 'dry',
    difficulty: 2,
    color: '#8E1F2F',
    og: 1.09,
    fg: [0.998, 1.006],
    yeast: 'Lalvin 71B',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, две до четири седмици с плодовете, после отлежаване',
    ingredients: [
      honey(1.09),
      WATER,
      { name: 'Череши или вишни без костилка', amount: 1.25, unit: 'кг', note: 'замразени — замразяването разкъсва клетките и плодът отдава повече' },
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Пектинов ензим', note: 'по указанията на производителя' },
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      {
        title: 'Добави черешите',
        text: 'Размрази черешите, сложи ги в дезинфекцирана мрежеста торбичка и я потопи в мъстта заедно с пектиновия ензим. Плодът добавя и вода, и захар, затова реалната плътност ще се различава малко от измерената.',
      },
      PITCH,
      FEED,
      {
        title: 'Следи ферментацията',
        text: 'Плодът изплува и образува шапка — потапяй торбичката веднъж-два пъти на ден с чиста лъжица, за да не изсъхне отгоре. Мери плътността на всеки няколко дни.',
      },
      {
        title: 'Извади плодовете и претакай',
        text: 'След две до четири седмици извади торбичката, без да я изстискваш силно, и прехвърли медовината със сифон в чист съд.',
      },
      CLEAR,
      BOTTLE,
    ],
    aging: 'След шест месеца плодът и медът се сливат. Цветът избледнява на светло — пази бутилките на тъмно.',
    watchFor: ['cloudy', 'sediment', 'off-aromas'],
    kit: 'brewer',
  },
  {
    id: 'strawberry',
    name: 'Ягодова медовина',
    tagline: 'Лека и ароматна',
    profile:
      'Нежен ягодов аромат и светлорозов цвят. Ягодите имат деликатен вкус, затова количеството е по-голямо, отколкото при другите плодове.',
    category: 'melomel',
    sweetness: 'semi',
    difficulty: 2,
    color: '#D9605A',
    og: 1.085,
    fg: [1.006, 1.014],
    fermentsTo: 1.0,
    yeast: 'Lalvin 71B',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, после стабилизиране и отлежаване',
    ingredients: [
      honey(1.085),
      WATER,
      { name: 'Ягоди', amount: 1.5, unit: 'кг', note: 'почистени и замразени' },
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Пектинов ензим', note: 'по указанията на производителя' },
      { name: 'Стабилизатори и мед за подслаждане', note: 'по желание — малко сладост подчертава ягодата' },
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      {
        title: 'Добави ягодите',
        text: 'Размрази ягодите и ги сложи в мрежеста торбичка заедно с пектиновия ензим. Ягодите дават много дребна утайка — торбичката спестява доста работа при претакането.',
      },
      PITCH,
      FEED,
      WATCH,
      RACK,
      STABILIZE,
      CLEAR,
      BOTTLE,
    ],
    aging: 'Ягодовият аромат е най-ярък през първата година — не я отлежавай прекалено дълго.',
    watchFor: ['cloudy', 'sediment', 'too-sweet'],
    kit: 'brewer',
  },
  {
    id: 'raspberry',
    name: 'Малинова медовина',
    tagline: 'Наситена и свежа',
    profile:
      'Силен малинов аромат и изразена киселинност. Малините са интензивни, затова са по-малко, а малко остатъчна сладост ги уравновесява.',
    category: 'melomel',
    sweetness: 'semi',
    difficulty: 2,
    color: '#B3123F',
    og: 1.095,
    fg: [1.008, 1.016],
    fermentsTo: 1.0,
    yeast: 'Lalvin 71B',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, после стабилизиране и отлежаване',
    ingredients: [
      honey(1.095),
      WATER,
      { name: 'Малини', amount: 0.75, unit: 'кг', note: 'замразени' },
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Пектинов ензим', note: 'по указанията на производителя' },
      { name: 'Стабилизатори и мед за подслаждане', note: 'по вкус' },
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      {
        title: 'Добави малините',
        text: 'Сложи размразените малини в мрежеста торбичка с пектиновия ензим. Семките им дават горчивина, ако престоят прекалено дълго — извади торбичката след около две седмици.',
      },
      PITCH,
      FEED,
      WATCH,
      RACK,
      STABILIZE,
      CLEAR,
      BOTTLE,
    ],
    aging: 'Три до шест месеца са достатъчни, за да омекне киселинността.',
    watchFor: ['too-sour', 'cloudy', 'sediment'],
    kit: 'brewer',
  },
  {
    id: 'blueberry',
    name: 'Боровинкова медовина',
    tagline: 'Тъмна, с танин',
    profile:
      'Дълбок виолетов цвят и леко стипчив завършек от кожичките на боровинките. Прилича на леко червено вино с меден гръб.',
    category: 'melomel',
    sweetness: 'dry',
    difficulty: 2,
    color: '#4B2A5E',
    og: 1.095,
    fg: [0.998, 1.006],
    yeast: 'Lalvin 71B или EC-1118',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, три-четири седмици с плодовете, после отлежаване',
    ingredients: [
      honey(1.095),
      WATER,
      { name: 'Боровинки', amount: 1.25, unit: 'кг', note: 'замразени' },
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Пектинов ензим', note: 'по указанията на производителя' },
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      {
        title: 'Добави боровинките',
        text: 'Размрази боровинките и ги намачкай леко в торбичката, за да се спукат кожичките — цветът и танинът са в тях. Добави пектиновия ензим.',
      },
      PITCH,
      FEED,
      {
        title: 'Следи ферментацията',
        text: 'Потапяй торбичката с плодовете веднъж-два пъти на ден. Мери плътността на всеки няколко дни и я записвай.',
      },
      {
        title: 'Извади плодовете и претакай',
        text: 'След три до четири седмици извади торбичката и прехвърли медовината със сифон в чист съд.',
      },
      CLEAR,
      BOTTLE,
    ],
    aging: 'Танинът се заобля с времето — шест месеца до година.',
    watchFor: ['cloudy', 'sediment', 'off-aromas'],
    kit: 'brewer',
  },
  {
    id: 'citrus',
    name: 'Цитрусова медовина',
    tagline: 'Портокал и лимон',
    profile:
      'Свежа и ароматна, с цитрусова кора на носа и лека киселинност. Добре охладена върви през лятото.',
    category: 'melomel',
    sweetness: 'dry',
    difficulty: 2,
    color: '#F0B63A',
    og: 1.085,
    fg: [0.998, 1.006],
    yeast: 'Lalvin 71B или K1-V1116',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, една-две седмици с корите, после отлежаване',
    ingredients: [
      honey(1.085),
      WATER,
      { name: 'Портокали', amount: 2, unit: 'бр.', note: 'необработени — кора и сок' },
      { name: 'Лимон', amount: 1, unit: 'бр.', note: 'необработен — само кората' },
      yeast('Lalvin 71B'),
      NUTRIENT,
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      PITCH,
      FEED,
      WATCH,
      {
        title: 'Претакай и добави цитрусите',
        text: 'След края на ферментацията претакай. Обели само цветната част на кората — бялото под нея горчи — и я добави заедно със сока от портокалите. Киселият сок в началото затруднява дрождите, затова влиза чак сега.',
      },
      {
        title: 'Опитвай',
        text: 'Опитвай на всеки два-три дни. Извади корите, когато ароматът е колкото искаш — обикновено след една до две седмици.',
      },
      CLEAR,
      BOTTLE,
    ],
    aging: 'Цитрусовият аромат е най-свеж през първите шест месеца.',
    watchFor: ['too-sour', 'stuck', 'cloudy'],
    kit: 'brewer',
  },
  {
    id: 'winter-spice',
    name: 'Зимна медовина с подправки',
    tagline: 'Канела, карамфил и портокалова кора',
    profile:
      'Топла и ароматна, с леко сладък завършек. Подправките влизат след ферментацията, за да решиш ти колко да са силни.',
    category: 'metheglin',
    sweetness: 'semi',
    difficulty: 2,
    color: '#B5651D',
    og: 1.1,
    fg: [1.01, 1.018],
    fermentsTo: 1.0,
    yeast: 'Lalvin 71B или D47',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, една-две седмици с подправките, после отлежаване',
    ingredients: [
      honey(1.1),
      WATER,
      { name: 'Канела', amount: 1, unit: 'пръчка' },
      { name: 'Карамфил', amount: 3, unit: 'бр.', note: 'силен е — не прекалявай' },
      { name: 'Портокал', amount: 1, unit: 'бр.', note: 'само цветната част на кората' },
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Стабилизатори и мед за подслаждане', note: 'по вкус' },
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      PITCH,
      FEED,
      WATCH,
      {
        title: 'Претакай и добави подправките',
        text: 'След края на ферментацията претакай и добави подправките в мрежеста торбичка. При по-голям обем започни с по-малко от изчисленото — подправка се добавя лесно, но не се вади от вкуса.',
      },
      {
        title: 'Опитвай',
        text: 'Опитвай на всеки два-три дни и извади торбичката, щом ароматът е малко по-слаб, отколкото го искаш — той се засилва още малко след това.',
      },
      STABILIZE,
      CLEAR,
      BOTTLE,
    ],
    aging: 'Подправките се сливат с меда за три до шест месеца. Направена през пролетта, е готова за зимата.',
    watchFor: ['off-aromas', 'too-sweet', 'cloudy'],
    kit: 'brewer',
  },
  {
    id: 'linden-mint',
    name: 'Билкова медовина с липа и мента',
    tagline: 'Лека и освежаваща',
    profile:
      'Цветен аромат от липата и хладна нотка от ментата върху лека суха медовина. Билките влизат като запарка, затова се дозират точно.',
    category: 'metheglin',
    sweetness: 'dry',
    difficulty: 2,
    color: '#E8D27A',
    og: 1.08,
    fg: [0.996, 1.004],
    yeast: 'Lalvin 71B или D47',
    need: 'low',
    tempC: [16, 20],
    duration: 'Три до четири седмици ферментация, после отлежаване',
    ingredients: [
      honey(1.08),
      WATER,
      { name: 'Сушен липов цвят', amount: 10, unit: 'г' },
      { name: 'Сушена мента', amount: 5, unit: 'г' },
      yeast('Lalvin 71B'),
      NUTRIENT,
    ],
    steps: [
      SANITIZE,
      {
        title: 'Направи запарката',
        text: 'Залей билките с около една пета от водата, току-що кипнала, покрий и остави десет минути. Прецеди и остави да изстине. Опитай — ако е твърде силна, използвай само част.',
      },
      {
        title: 'Приготви мъстта',
        text: 'Разтвори меда в хладка вода, добави изстиналата запарка и долей до общия обем. Разбъркай енергично няколко минути, за да влезе кислород.',
      },
      MEASURE,
      PITCH,
      FEED,
      WATCH,
      ...STILL_END,
    ],
    aging: 'Билковите аромати избледняват — най-добра е между третия и деветия месец.',
    watchFor: ['off-aromas', 'no-start', 'cloudy'],
    kit: 'starter',
  },
  {
    id: 'cyser',
    name: 'Ябълкова медовина (сайзер)',
    tagline: 'Ябълков сок вместо вода',
    profile:
      'Между сайдер и медовина: ябълкова свежест с меден гръб. Сокът носи собствена захар и киселинност, затова медът е по-малко.',
    category: 'cyser',
    sweetness: 'dry',
    difficulty: 2,
    color: '#D9A441',
    og: 1.095,
    fg: [0.998, 1.006],
    yeast: 'Lalvin 71B или EC-1118',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, после няколко месеца отлежаване',
    ingredients: [
      { name: 'Ябълков сок', amount: 4, unit: 'л', note: '100 % сок без консерванти — сорбатът и бензоатът спират дрождите' },
      honey(1.095, 38.4),
      { name: 'Вода', note: 'до общия обем, ако трябва' },
      yeast('Lalvin 71B'),
      NUTRIENT,
      { name: 'Пектинов ензим', note: 'по указанията на производителя' },
    ],
    steps: [
      SANITIZE,
      {
        title: 'Приготви мъстта',
        text: 'Прочети етикета на сока: консервантите спират дрождите. Разтвори меда в част от сока, долей с останалия до общия обем, добави пектиновия ензим и разбъркай енергично.',
      },
      {
        title: 'Измери началната плътност',
        text: 'Сладостта на сока варира, затова това измерване е задължително. Количеството мед тук предполага сок с плътност около 1.048 — коригирай с мед или вода, ако твоят е различен.',
      },
      PITCH,
      FEED,
      WATCH,
      ...STILL_END,
    ],
    aging: 'Ябълковата киселинност омеква за три до шест месеца.',
    watchFor: ['no-start', 'sulfur', 'cloudy'],
    kit: 'starter',
  },
  {
    id: 'pyment',
    name: 'Гроздова медовина (пимент)',
    tagline: 'Наполовина гроздов сок',
    profile:
      'По-близо до вино, отколкото всяка друга медовина: плод и танин от гроздето, закръглени от меда. С червен сок става плътна, с бял — лека.',
    category: 'pyment',
    sweetness: 'dry',
    difficulty: 3,
    color: '#7B2D43',
    og: 1.1,
    fg: [0.996, 1.006],
    yeast: 'Lalvin EC-1118 или 71B',
    need: 'low',
    tempC: [16, 20],
    duration: 'Около месец ферментация, после поне шест месеца отлежаване',
    ingredients: [
      { name: 'Гроздов сок', amount: 2.5, unit: 'л', note: '100 % сок без консерванти, или прясно изцеден' },
      honey(1.1, 37.5),
      WATER,
      yeast('Lalvin EC-1118'),
      NUTRIENT,
    ],
    steps: [
      SANITIZE,
      {
        title: 'Измери сока',
        text: 'Гроздовият сок е между 1.060 и 1.090 според сорта и годината. Измери го преди всичко останало — количеството мед тук предполага сок около 1.075.',
      },
      {
        title: 'Приготви мъстта',
        text: 'Разтвори меда в хладка вода, добави сока и долей до общия обем. Разбъркай енергично.',
      },
      {
        title: 'Измери началната плътност',
        text: 'Ако стойността е над целевата, долей вода; ако е под нея, добави мед на части. Използвай калкулатора „Мед и вода" за сметката.',
      },
      PITCH,
      FEED,
      WATCH,
      ...STILL_END,
    ],
    aging: 'Като виното — печели от времето. Шест месеца са минимумът, година е по-добре.',
    watchFor: ['stuck', 'sulfur', 'off-aromas'],
    kit: 'master',
  },
  {
    id: 'session-sparkling',
    name: 'Лека газирана медовина',
    tagline: 'Ниско алкохолна, с мехурчета',
    profile:
      'Суха, лека и газирана — пие се охладена като бира или сайдер. Ферментира бързо и е готова много по-скоро от силните медовини.',
    category: 'sparkling',
    sweetness: 'dry',
    sparkling: true,
    difficulty: 3,
    color: '#F2D572',
    og: 1.05,
    fg: [0.996, 1.002],
    yeast: 'Lalvin EC-1118',
    need: 'low',
    tempC: [16, 20],
    duration: 'Две до три седмици ферментация, после поне две седмици в бутилката',
    ingredients: [
      honey(1.05),
      WATER,
      yeast('Lalvin EC-1118'),
      NUTRIENT,
      { name: 'Захар за газиране', note: 'по калкулатора „Захар за газиране"' },
    ],
    steps: [
      SANITIZE,
      MIX,
      MEASURE,
      PITCH,
      FEED,
      {
        title: 'Изчакай пълния край',
        text: 'Тук това е въпрос на безопасност. Бутилирай само когато плътността е под 1.000 и не се е променила при две измервания през поне три дни.',
      },
      {
        title: 'Добави захарта за газиране',
        text: 'Изчисли количеството с калкулатора, разтвори захарта в малко преварена вода, сложи я в чист съд и претакай медовината върху нея, за да се смесят равномерно. Не стабилизирай — дрождите трябва да са живи.',
      },
      {
        title: 'Бутилирай в бутилки за налягане',
        text: 'Използвай само бутилки, предназначени за газирани напитки — бирени с капачка или за пенливо вино. Остави ги на стайна температура две-три седмици, после ги прибери на хладно.',
      },
    ],
    aging: 'Готова е три-четири седмици след бутилирането. Отваряй охладена и внимателно.',
    watchFor: ['overcarbonated', 'bottling', 'sediment'],
    kit: 'starter',
  },
  {
    id: 'bochet',
    name: 'Медовина от карамелизиран мед (боше)',
    tagline: 'Карамел, препечен хляб, тъмен цвят',
    profile:
      'Медът се вари, докато потъмнее, и дава вкус на карамел и тофи. Част от захарта става неферментируема, затова остава естествена сладост.',
    category: 'experimental',
    sweetness: 'semi',
    difficulty: 3,
    color: '#5A2D0C',
    og: 1.1,
    fg: [1.008, 1.02],
    yeast: 'Lalvin 71B или EC-1118',
    need: 'low',
    tempC: [16, 20],
    duration: 'Един до два месеца ферментация, после дълго отлежаване',
    ingredients: [honey(1.1), WATER, yeast('Lalvin 71B'), NUTRIENT],
    steps: [
      SANITIZE,
      {
        title: 'Карамелизирай меда',
        text: 'Използвай тенджера поне четири пъти по-голяма от обема на меда — той се надига силно и е по-горещ от вряща вода. Вари на слаб огън, като бъркаш непрекъснато, докато стигне цвета, който искаш. Работи с ръкавици и дълга лъжица и не оставяй котлона без надзор.',
      },
      {
        title: 'Спри варенето',
        text: 'Свали от огъня и остави меда да поизстине. Доливай топла вода много бавно и отстрани — водата върху горещ мед пръска. Разбъркай до пълно разтваряне и долей със студена вода до общия обем.',
      },
      {
        title: 'Измери началната плътност',
        text: 'Изчакай мъстта да изстине до стайна температура и измери. При варенето се изпарява вода, затова стойността често е по-висока от очакваната — коригирай с вода.',
      },
      PITCH,
      FEED,
      WATCH,
      ...STILL_END,
    ],
    aging: 'Млада е остра; след година карамелът се закръгля. Това е медовина за търпеливи.',
    watchFor: ['stuck', 'too-sweet', 'off-aromas'],
    kit: 'master',
  },
  {
    id: 'ginger-lemon',
    name: 'Джинджифилова медовина с лимон',
    tagline: 'Пикантна и свежа',
    profile:
      'Лека медовина с топлината на пресния джинджифил и аромат на лимонова кора. Може да остане негазирана или да се газира като предната рецепта.',
    category: 'experimental',
    sweetness: 'dry',
    difficulty: 2,
    color: '#EBCB6B',
    og: 1.075,
    fg: [0.996, 1.004],
    yeast: 'Lalvin EC-1118 или 71B',
    need: 'low',
    tempC: [16, 20],
    duration: 'Три до четири седмици ферментация, после кратко отлежаване',
    ingredients: [
      honey(1.075),
      WATER,
      { name: 'Пресен джинджифил', amount: 60, unit: 'г', note: 'обелен и нарязан на тънко' },
      { name: 'Лимон', amount: 1, unit: 'бр.', note: 'необработен — само кората' },
      yeast('Lalvin EC-1118'),
      NUTRIENT,
    ],
    steps: [
      SANITIZE,
      {
        title: 'Свари джинджифила',
        text: 'Свари нарязания джинджифил в около литър от водата за десетина минути, после остави да изстине. Отварата влиза в мъстта заедно с парченцата.',
      },
      {
        title: 'Приготви мъстта',
        text: 'Разтвори меда в хладка вода, добави изстиналата отвара и долей до общия обем. Разбъркай енергично.',
      },
      MEASURE,
      PITCH,
      FEED,
      WATCH,
      {
        title: 'Претакай и добави лимоновата кора',
        text: 'След края на ферментацията претакай, без да пренасяш джинджифила. Добави цветната част на лимоновата кора за няколко дни и опитвай.',
      },
      CLEAR,
      BOTTLE,
    ],
    aging: 'Пикантността е най-силна в началото и омеква с месеците.',
    watchFor: ['off-aromas', 'cloudy', 'overcarbonated'],
    kit: 'starter',
  },
];

export const recipeById = (id: string | undefined): Recipe | undefined => RECIPES.find((r) => r.id === id);

/** Gravity the alcohol estimate is taken to: the fermentation floor, or the middle of the expected range. */
export const fermentedGravity = (r: Recipe): number => r.fermentsTo ?? (r.fg[0] + r.fg[1]) / 2;
