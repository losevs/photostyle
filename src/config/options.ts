type CharacterOption = {
  id: string;
  cluster: "style" | "feeling" | "extra";
  label: string;
  description: string;
  tag: string;
  defaultOn: boolean;
};

type CheckOption = {
  id: string;
  label: string;
  description: string;
  tag: string;
  defaultOn: boolean;
};

type AngleOption = {
  id: string;
  label: string;
  description: string;
  tag: string;
  prose: string;
};

type FilmOption = {
  id: string;
  label: string;
  description: string;
  tag: string;
  prose: string;
};

type ColorOption = {
  id: string;
  label: string;
  description: string;
  tag: string;
  defaultOn: boolean;
};

type ExposureOption = {
  id: string;
  label: string;
  description: string;
  tag: string;
  lead: string;
};

type SharpnessOption = {
  id: string;
  label: string;
  description: string;
  tag: string;
  tail: string;
};

type LightingOption = {
  id: string;
  label: string;
  description: string;
  tags: readonly string[];
  prose: string;
};

export type IntensityLevel = {
  prose: string;
  tags: readonly string[];
};

type ArtifactOption = {
  id: string;
  group: "foundation" | "situational" | "rare";
  label: string;
  description: string;
  defaultOn: boolean;
  levels: readonly IntensityLevel[];
};

export const CHARACTER_OPTIONS = [
  {
    id: "amateur",
    cluster: "style",
    label: "Любительская плёночная съёмка",
    description: "Кадр выглядит так, будто его сделал кто-то из своих, а не фотограф на заказе.",
    tag: "amateur film photography",
    defaultOn: true,
  },
  {
    id: "lofi",
    cluster: "style",
    label: "Лоу-фай аналоговый снимок",
    description: "Бытовая плёнка и простая оптика, без студийной чистоты.",
    tag: "lo-fi analog snapshot",
    defaultOn: true,
  },
  {
    id: "spontaneous",
    cluster: "style",
    label: "Спонтанный живой момент",
    description: "Сцена не ждала камеру и не была выстроена заранее.",
    tag: "spontaneous candid moment",
    defaultOn: true,
  },
  {
    id: "midAction",
    cluster: "style",
    label: "Поймано на полудвижении",
    description: "Жест ещё не закончился, поза не успела застыть.",
    tag: "caught mid-action",
    defaultOn: true,
  },
  {
    id: "unposed",
    cluster: "feeling",
    label: "Непоставленное поведение",
    description: "Люди заняты своим делом, а не смотрят в объектив.",
    tag: "unposed human behavior",
    defaultOn: true,
  },
  {
    id: "emotions",
    cluster: "feeling",
    label: "Живые эмоции",
    description: "Чувство настоящее, без улыбки для фотографии.",
    tag: "authentic emotions",
    defaultOn: true,
  },
  {
    id: "memory",
    cluster: "feeling",
    label: "Личное воспоминание",
    description: "Кадр похож на снимок из домашней коробки, а не из журнала.",
    tag: "personal memory aesthetic",
    defaultOn: true,
  },
  {
    id: "youth",
    cluster: "extra",
    label: "Молодёжная эстетика",
    description: "Любопытство и возраст, которому ещё не нужно позировать.",
    tag: "youth photography aesthetic",
    defaultOn: false,
  },
  {
    id: "comingOfAge",
    cluster: "extra",
    label: "Взросление",
    description: "Тихий возраст между игрой и самостоятельностью.",
    tag: "coming-of-age photography",
    defaultOn: false,
  },
  {
    id: "nostalgic",
    cluster: "extra",
    label: "Ностальгическая повседневность",
    description: "Обычный день, который уже ощущается как прошлое.",
    tag: "nostalgic everyday photography",
    defaultOn: false,
  },
  {
    id: "intimateDoc",
    cluster: "extra",
    label: "Интимная документалистика",
    description: "Близко и тихо, с уважением к частному моменту.",
    tag: "intimate documentary photography",
    defaultOn: false,
  },
] as const satisfies readonly CharacterOption[];

export type CharacterId = (typeof CHARACTER_OPTIONS)[number]["id"];

export const FRAMING_OPTIONS = [
  {
    id: "boldCrop",
    label: "Смелая случайная обрезка",
    description: "Край кадра режет жест или тело: выстроить рамку не успели.",
    tag: "bold accidental cropping",
    defaultOn: false,
  },
  {
    id: "imperfectFrame",
    label: "Неидеальное кадрирование с рук",
    description: "Рамка живая и чуть неловкая, без выверенных полей.",
    tag: "imperfect handheld framing",
    defaultOn: false,
  },
  {
    id: "offCenter",
    label: "Смещение от центра",
    description: "Главное не стоит ровно посередине.",
    tag: "off-center composition",
    defaultOn: false,
  },
  {
    id: "asymmetry",
    label: "Живая асимметрия",
    description: "Вес кадра распределён естественно, не по сетке.",
    tag: "organic asymmetry",
    defaultOn: false,
  },
] as const satisfies readonly CheckOption[];

export type FramingId = (typeof FRAMING_OPTIONS)[number]["id"];

export const ANGLE_OPTIONS = [
  {
    id: "unconventional",
    label: "Необычный ракурс",
    description: "Точка съёмки чуть странная, не из учебника.",
    tag: "unconventional camera angle",
    prose: "The camera angle is unconventional",
  },
  {
    id: "low",
    label: "Нижняя точка",
    description: "Камера близко к полу или к земле.",
    tag: "low angle",
    prose: "The camera is at a low angle",
  },
  {
    id: "eyeLevel",
    label: "Уровень глаз",
    description: "Так смотрит человек, который стоит рядом.",
    tag: "eye-level camera",
    prose: "The camera is at eye level",
  },
  {
    id: "overShoulder",
    label: "Из-за плеча",
    description: "Взгляд через плечо того, кто уже внутри сцены.",
    tag: "over-the-shoulder view",
    prose: "The view is over the shoulder",
  },
  {
    id: "subjective",
    label: "Субъективная камера",
    description: "Как будто смотрит сам участник события.",
    tag: "subjective camera",
    prose: "The camera is subjective, from inside the moment",
  },
  {
    id: "environmental",
    label: "Среда вокруг",
    description: "В кадре остаётся место, а не только лица.",
    tag: "environmental perspective",
    prose: "The perspective takes in the surrounding environment",
  },
  {
    id: "immersive",
    label: "Погружающий взгляд",
    description: "Дистанция такая близкая, что зритель оказывается внутри.",
    tag: "immersive perspective",
    prose: "The perspective is immersive and close",
  },
] as const satisfies readonly AngleOption[];

export type AngleId = (typeof ANGLE_OPTIONS)[number]["id"];

export const DEPTH_OPTIONS = [
  {
    id: "strongForeground",
    label: "Сильный передний план",
    description: "Что-то крупное оказывается ближе к объективу.",
    tag: "strong foreground presence",
    defaultOn: false,
  },
  {
    id: "occlusion",
    label: "Перекрытие передним планом",
    description: "Ближний план частично закрывает происходящее.",
    tag: "foreground occlusion",
    defaultOn: false,
  },
  {
    id: "layered",
    label: "Слоистая композиция",
    description: "Передний, средний и дальний планы читаются вместе.",
    tag: "layered composition",
    defaultOn: false,
  },
  {
    id: "close",
    label: "Близкая дистанция",
    description: "Камера находится совсем рядом с людьми.",
    tag: "close proximity",
    defaultOn: false,
  },
  {
    id: "intimateComposition",
    label: "Интимная документальная композиция",
    description: "Плотная тихая рамка вокруг частного момента.",
    tag: "intimate documentary composition",
    defaultOn: false,
  },
] as const satisfies readonly CheckOption[];

export type DepthId = (typeof DEPTH_OPTIONS)[number]["id"];

export const CROPPING_OPTIONS = [
  {
    id: "none",
    label: "Без обрезки",
    english: "None",
    short: "Нет",
    description: "Края кадра не режут объект нарочно.",
    prose: "",
    tags: [],
  },
  {
    id: "natural",
    label: "Естественная",
    english: "Natural",
    short: "Естественно",
    description: "Края чуть срезают жест, как на снимке с рук.",
    prose: "Natural cropping at the frame edges, the way a handheld snapshot cuts a gesture.",
    tags: ["natural cropping"],
  },
  {
    id: "strong",
    label: "Сильная",
    english: "Strong",
    short: "Сильно",
    description: "Важные части объекта упираются в край и выходят за него.",
    prose: "Strong cropping: important parts of the subject are cut by the frame edges.",
    tags: ["strong cropping"],
  },
  {
    id: "extreme",
    label: "Крайняя",
    english: "Extreme",
    short: "Крайне",
    description: "Лицо и тело сильно больше кадра. Вместить лицо целиком никто не пытается.",
    prose:
      "Extreme cropping. Large portions of the face and body extend beyond the image boundaries. The photographer does not attempt to fit the entire face into the composition.",
    tags: ["extreme cropping", "subject extending beyond frame"],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  english: string;
  short: string;
  description: string;
  prose: string;
  tags: readonly string[];
}[];

export type CroppingId = (typeof CROPPING_OPTIONS)[number]["id"];

export const VISIBILITY_OPTIONS = [
  {
    id: "entire",
    label: "Объект целиком",
    english: "Entire subject",
    short: "Целиком",
    description: "Объект помещается в кадр.",
    prose: "The entire subject remains visible inside the frame.",
    tags: ["entire subject visible"],
  },
  {
    id: "mostly",
    label: "Почти целиком",
    english: "Mostly visible",
    short: "Почти",
    description: "Объект читается, у краёв может чуть не хватить места.",
    prose: "The subject is mostly visible, with only minor parts meeting the frame edges.",
    tags: ["subject mostly visible"],
  },
  {
    id: "partial",
    label: "Частично",
    english: "Partially visible",
    short: "Частично",
    description: "В кадре только часть объекта.",
    prose: "The subject is only partially visible.",
    tags: ["partially visible subject"],
  },
  {
    id: "fragment",
    label: "Только фрагмент",
    english: "Fragment only",
    short: "Фрагмент",
    description: "Объект гораздо больше кадра. Виден кусок действия, не весь человек.",
    prose:
      "Only a fragment of the subject and the ongoing action is captured. The subject is much larger than the frame itself.",
    tags: ["fragment only", "partial face visible", "subject larger than the frame"],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  english: string;
  short: string;
  description: string;
  prose: string;
  tags: readonly string[];
}[];

export type VisibilityId = (typeof VISIBILITY_OPTIONS)[number]["id"];

export const OCCLUSION_OPTIONS = [
  {
    id: "none",
    label: "Без перекрытия",
    english: "None",
    short: "Нет",
    description: "Передний план не закрывает объект.",
    prose: "",
    tags: [],
  },
  {
    id: "subtle",
    label: "Слабое",
    english: "Subtle",
    short: "Слегка",
    description: "Рука или предмет чуть заходят на объект.",
    prose: "A nearby hand or object slightly overlaps the subject.",
    tags: ["subtle occlusion"],
  },
  {
    id: "strong",
    label: "Сильное",
    english: "Strong",
    short: "Сильно",
    description: "Руки и ближние предметы закрывают части объекта.",
    prose:
      "Foreground objects and hands naturally obscure parts of the subject. The composition contains overlapping forms and incomplete visibility, creating an intimate and immersive perspective.",
    tags: ["strong foreground occlusion", "overlapping forms"],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  english: string;
  short: string;
  description: string;
  prose: string;
  tags: readonly string[];
}[];

export type OcclusionId = (typeof OCCLUSION_OPTIONS)[number]["id"];

export const EXTREME_FRAGMENT_PROSE =
  "An extremely tight, fragmentary composition. The camera is positioned at almost touching distance. The subject is much larger than the frame itself. Large portions of the face and body extend beyond the image boundaries. Only a fragment of the ongoing action is captured. The photographer does not attempt to fit the entire face into the composition.";

export const ACTION_FIRST_PROSE =
  "The composition is built around the physical action rather than the person's identity or appearance. The camera captures the gesture at its most expressive instant. Facial features, hands and objects overlap naturally, partially hiding one another.";

export const ACCIDENTAL_FRAMING_PROSE =
  "The photograph feels taken impulsively, without time to adjust the framing. Important elements are unexpectedly cropped. The camera catches an imperfect fragment of reality rather than a carefully composed scene.";

export const NATURALNESS_PROSE =
  "Natural everyday photographic realism, without beautification, editorial posing or deliberate cinematic styling.";

export const SHOT_SCALE_OPTIONS = [
  {
    id: "wide",
    label: "Дальний план",
    english: "Wide",
    short: "Дальний",
    description: "Камера дальше от объекта. Насколько он влезает в кадр, задаёт видимость, не дистанция.",
    prose:
      "Wide documentary shot, camera positioned farther from the subject, surrounding environment plays an important role in the composition.",
    tags: ["wide documentary shot"],
    cropping: "none",
    visibility: "entire",
    actionFirst: false,
  },
  {
    id: "medium",
    label: "Средний план",
    english: "Medium",
    short: "Средний",
    description: "Разговорная дистанция. Камера не вплотную и не через всю комнату.",
    prose: "Medium candid shot, natural conversational camera distance, with room for both the subject and the surroundings.",
    tags: ["medium candid shot", "natural conversational camera distance"],
    cropping: "natural",
    visibility: "mostly",
    actionFirst: false,
  },
  {
    id: "close",
    label: "Близко",
    english: "Close",
    short: "Близко",
    description: "Камера рядом с объектом. Это близость, а не портретный зум.",
    prose: "Close camera distance: the camera is physically near the subject. This is proximity, not a zoomed-in portrait.",
    tags: ["close camera distance"],
    cropping: "natural",
    visibility: "mostly",
    actionFirst: false,
  },
  {
    id: "tight",
    label: "Очень близко",
    english: "Very Close",
    short: "Очень",
    description: "Камера в нескольких сантиметрах от объекта.",
    prose: "Very close camera distance: the camera is positioned just inches from the subject.",
    tags: ["very close camera distance"],
    cropping: "strong",
    visibility: "partial",
    actionFirst: false,
  },
  {
    id: "extreme",
    label: "Экстремально близко",
    english: "Extreme Close",
    short: "Вплотную",
    description: "Почти касаясь объекта. Не зум в готовый портрет и не макросъёмка.",
    prose:
      "Extreme close camera distance: the camera is positioned at almost touching distance. This is physical proximity, not a zoomed-in portrait and not macro photography.",
    tags: ["extreme camera proximity", "extreme close-up photography"],
    cropping: "extreme",
    visibility: "fragment",
    actionFirst: true,
  },
] as const satisfies readonly {
  id: string;
  label: string;
  english: string;
  short: string;
  description: string;
  prose: string;
  tags: readonly string[];
  cropping: CroppingId;
  visibility: VisibilityId;
  actionFirst: boolean;
}[];

export type ShotScaleId = (typeof SHOT_SCALE_OPTIONS)[number]["id"];

export const TILT_STEPS = [
  {
    label: "Прямой горизонт",
    short: "Ровно",
    prose: "The horizon is straight",
    tags: ["straight horizon"],
  },
  {
    label: "Лёгкий наклон",
    short: "Чуть",
    prose: "A subtle camera tilt leaves a slightly tilted horizon",
    tags: ["subtle camera tilt", "slightly tilted horizon"],
  },
  {
    label: "Заметный естественный наклон",
    short: "Заметно",
    prose: "A noticeable natural camera tilt leans through the frame",
    tags: ["noticeable natural camera tilt"],
  },
  {
    label: "Сильный случайный наклон",
    short: "Сильно",
    prose: "A strong accidental camera tilt leans the horizon",
    tags: ["strong accidental camera tilt"],
  },
] as const;

export const FILM_OPTIONS = [
  {
    id: "colorNegative",
    label: "Цветная негативная 35мм",
    description: "Обычная потребительская плёнка, прямой и честный снимок.",
    tag: "35mm color negative film",
    prose: "Shot on 35mm color negative film, with the straightforward look of a consumer snapshot",
  },
  {
    id: "gold",
    label: "В духе Kodak Gold 200",
    description: "Тёплый золотистый цвет, живая бытовая насыщенность, солнечные жёлтые и зелёные.",
    tag: "Kodak Gold 200 inspired color",
    prose: "Color inspired by Kodak Gold 200: a warm golden cast, lively consumer saturation, and sunlit yellows and greens",
  },
  {
    id: "portra",
    label: "В духе Kodak Portra 400",
    description: "Мягкий контраст, естественная кожа и спокойные тональные переходы.",
    tag: "Kodak Portra 400 inspired color",
    prose: "Color inspired by Kodak Portra 400: gentle contrast, natural skin, and smooth tonal transitions",
  },
  {
    id: "superia",
    label: "В духе Fujifilm Superia",
    description: "Чуть холодные зелёные тени, бытовая насыщенность и живые красные.",
    tag: "Fujifilm Superia inspired color",
    prose: "Color inspired by Fujifilm Superia: slightly cool green shadows, everyday saturation, and punchy consumer reds",
  },
  {
    id: "vintage",
    label: "Бытовая винтажная плёнка",
    description: "Неровный цвет, скромный контраст и палитра случайного снимка.",
    tag: "vintage consumer color film",
    prose: "Shot on generic vintage consumer film, with uneven color, modest contrast, and a casual snapshot palette",
  },
] as const satisfies readonly FilmOption[];

export type FilmId = (typeof FILM_OPTIONS)[number]["id"];

export const GRAIN_STEPS = [
  {
    label: "Тонкое зерно",
    short: "Тонкое",
    prose: "Fine irregular grain stays subtle",
    tags: ["fine subtle grain", "fine irregular grain"],
  },
  {
    label: "Живое заметное зерно",
    short: "Живое",
    prose: "Organic film grain is visible, with fine irregular grain and visible grain in shadows",
    tags: ["organic film grain", "fine irregular grain", "visible grain in shadows"],
  },
  {
    label: "Выраженное зерно",
    short: "Выраженное",
    prose: "Pronounced organic film grain crosses the frame, with visible grain in shadows",
    tags: ["pronounced film grain", "organic film grain", "visible grain in shadows"],
  },
  {
    label: "Тяжёлое зерно",
    short: "Тяжёлое",
    prose: "Heavy organic film grain is dense and unmistakable, with visible grain in shadows",
    tags: ["heavy film grain", "organic film grain", "visible grain in shadows"],
  },
] as const;

export const COLOR_OPTIONS = [
  {
    id: "rich",
    label: "Богатые неидеальные цвета",
    description: "Цвет живой и немного неровный, как у настоящей плёнки.",
    tag: "rich imperfect colors",
    defaultOn: true,
  },
  {
    id: "faded",
    label: "Чуть выцветшие цвета",
    description: "Насыщенность слегка осела, будто снимок полежал на свету.",
    tag: "slightly faded colors",
    defaultOn: false,
  },
  {
    id: "muted",
    label: "Приглушённые тона",
    description: "Палитра тише и спокойнее.",
    tag: "muted tones",
    defaultOn: false,
  },
  {
    id: "warmSkin",
    label: "Тёплая кожа",
    description: "Кожа уходит в тёплый плёночный оттенок.",
    tag: "warm skin tones",
    defaultOn: false,
  },
  {
    id: "naturalSkin",
    label: "Естественная кожа",
    description: "Кожа остаётся правдоподобной, без пластиковой ретуши.",
    tag: "natural skin tones",
    defaultOn: true,
  },
  {
    id: "liftedBlacks",
    label: "Приподнятые чёрные",
    description: "Тени не проваливаются в чистый чёрный.",
    tag: "lifted blacks",
    defaultOn: false,
  },
  {
    id: "sunFaded",
    label: "Выгоревшая на солнце палитра",
    description: "Цвета как у отпечатка, который долго лежал у окна.",
    tag: "sun-faded palette",
    defaultOn: false,
  },
  {
    id: "shifts",
    label: "Естественные сдвиги цвета",
    description: "Небольшие цветовые отклонения, свойственные плёнке.",
    tag: "natural color shifts",
    defaultOn: false,
  },
  {
    id: "softContrast",
    label: "Мягкий плёночный контраст",
    description: "Контраст спокойный, без цифрового удара.",
    tag: "soft filmic contrast",
    defaultOn: true,
  },
] as const satisfies readonly ColorOption[];

export type ColorId = (typeof COLOR_OPTIONS)[number]["id"];

export const EXPOSURE_OPTIONS = [
  {
    id: "natural",
    label: "Естественная неидеальная экспозиция",
    description: "Свет как получился, без вытягивания теней и светов.",
    tag: "natural imperfect exposure",
    lead: "Exposure is naturally imperfect",
  },
  {
    id: "over",
    label: "Лёгкая переэкспозиция",
    description: "Кадр чуть светлее, чем нужно.",
    tag: "slight overexposure",
    lead: "Exposure is slightly hot",
  },
  {
    id: "under",
    label: "Лёгкая недоэкспозиция",
    description: "Кадр чуть темнее, чем нужно.",
    tag: "slight underexposure",
    lead: "Exposure is slightly dark",
  },
  {
    id: "blown",
    label: "Выбитые света",
    description: "Яркие места теряют деталь, как на бытовой плёнке.",
    tag: "blown highlights",
    lead: "Highlights are blown in places",
  },
  {
    id: "shadows",
    label: "Глубокие тени",
    description: "Тёмные места остаются плотными и закрытыми.",
    tag: "deep shadows",
    lead: "Shadows fall deep",
  },
] as const satisfies readonly ExposureOption[];

export type ExposureId = (typeof EXPOSURE_OPTIONS)[number]["id"];

export const SHARPNESS_OPTIONS = [
  {
    id: "softness",
    label: "Естественная аналоговая мягкость",
    description: "Резкость спокойная, без цифрового контура.",
    tag: "natural analog softness",
    tail: "with natural analog softness",
  },
  {
    id: "missedFocus",
    label: "Чуть промахнувшийся фокус",
    description: "Фокус сел не совсем туда, как при спешке.",
    tag: "slightly missed focus",
    tail: "with slightly missed focus",
  },
  {
    id: "imperfect",
    label: "Неидеальная резкость",
    description: "Кадр в целом мягче, чем хотелось бы.",
    tag: "imperfect sharpness",
    tail: "with imperfect sharpness",
  },
  {
    id: "softOptical",
    label: "Мягкая оптика",
    description: "Рисунок объектива мягкий, края не звенят.",
    tag: "soft optical rendering",
    tail: "with soft optical rendering",
  },
] as const satisfies readonly SharpnessOption[];

export type SharpnessId = (typeof SHARPNESS_OPTIONS)[number]["id"];

export const LIGHTING_OPTIONS = [
  {
    id: "daylight",
    label: "Естественный дневной свет",
    description: "Обычный день, без постановки света.",
    tags: ["natural daylight"],
    prose: "Lit by natural daylight",
  },
  {
    id: "window",
    label: "Свет из окна",
    description: "Мягкий свет с одной стороны, из настоящего окна.",
    tags: ["window light"],
    prose: "Lit by window light",
  },
  {
    id: "golden",
    label: "Золотой час",
    description: "Низкое тёплое солнце.",
    tags: ["golden hour"],
    prose: "Lit by golden hour sunlight",
  },
  {
    id: "blue",
    label: "Синий час",
    description: "Холодный сумеречный свет.",
    tags: ["blue hour"],
    prose: "Lit by blue hour light",
  },
  {
    id: "overcast",
    label: "Пасмурный день",
    description: "Ровный мягкий свет без жёстких теней.",
    tags: ["overcast daylight"],
    prose: "Lit by overcast daylight",
  },
  {
    id: "indoor",
    label: "Комнатный свет",
    description: "Лампы и окна, которые уже были в комнате.",
    tags: ["indoor ambient light"],
    prose: "Lit by indoor ambient light",
  },
  {
    id: "flash",
    label: "Прямая вспышка",
    description: "Вспышка в лоб, как на домашней вечеринке.",
    tags: [
      "direct on-camera flash",
      "bright flash-lit subjects",
      "natural flash falloff",
      "strong flash shadows",
      "darker ambient background",
      "spontaneous flash snapshot",
    ],
    prose:
      "Lighting is direct on-camera flash: bright flash-lit subjects, natural flash falloff, strong flash shadows, a darker ambient background, and a spontaneous flash snapshot",
  },
  {
    id: "night",
    label: "Ночной окружающий свет",
    description: "Темнота остаётся темнотой, свет только тот, что есть.",
    tags: ["night ambient light"],
    prose: "Lit by night ambient light",
  },
] as const satisfies readonly LightingOption[];

export type LightingId = (typeof LIGHTING_OPTIONS)[number]["id"];

const subtleMediumStrong = (
  subtle: IntensityLevel,
  medium: IntensityLevel,
  strong: IntensityLevel,
): readonly IntensityLevel[] => [subtle, medium, strong];

export const ARTIFACT_OPTIONS = [
  {
    id: "organicGrain",
    group: "foundation",
    label: "Органическое плёночное зерно",
    description: "Если зерно в обработке выключено, добавит живое зерно. Повторной фразы не будет.",
    defaultOn: true,
    levels: [
      {
        prose: "Organic film grain is visible, with fine irregular grain and visible grain in shadows",
        tags: ["organic film grain", "fine irregular grain", "visible grain in shadows"],
      },
    ],
  },
  {
    id: "subtleTilt",
    group: "foundation",
    label: "Лёгкий наклон камеры",
    description: "Если ползунок наклона на нуле, добавит лёгкий наклон. Иначе берётся сила из композиции.",
    defaultOn: true,
    levels: [
      {
        prose: "A subtle camera tilt leaves a slightly tilted horizon",
        tags: ["subtle camera tilt", "slightly tilted horizon"],
      },
    ],
  },
  {
    id: "halation",
    group: "situational",
    label: "Гало",
    description: "Тёплый ореол вокруг ярких источников.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "subtle film halation", tags: ["subtle film halation"] },
      {
        prose: "subtle film halation with warm glowing highlights",
        tags: ["subtle film halation", "warm glowing highlights"],
      },
      {
        prose: "film halation with warm glowing highlights and red-orange light bleed",
        tags: ["subtle film halation", "warm glowing highlights", "red-orange light bleed"],
      },
    ),
  },
  {
    id: "motionBlur",
    group: "situational",
    label: "Смаз движения",
    description: "Выдержка не заморозила жест.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "natural motion blur", tags: ["natural motion blur"] },
      {
        prose: "natural motion blur from a slow shutter speed",
        tags: ["natural motion blur", "slow shutter speed"],
      },
      {
        prose: "natural motion blur, a slow shutter speed, and a subject caught mid-motion",
        tags: ["natural motion blur", "slow shutter speed", "caught mid-motion"],
      },
    ),
  },
  {
    id: "fadedColors",
    group: "situational",
    label: "Выцветшие цвета",
    description: "Цвет осел сильнее, чем обычная бытовая плёнка.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "slightly faded colors", tags: ["slightly faded colors"] },
      { prose: "faded colors", tags: ["faded colors"] },
      { prose: "strongly faded colors", tags: ["strongly faded colors"] },
    ),
  },
  {
    id: "lensFlare",
    group: "rare",
    label: "Блик объектива",
    description: "Солнце задело линзу.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "natural lens flare", tags: ["natural lens flare"] },
      {
        prose: "natural lens flare from sunlight hitting the lens",
        tags: ["natural lens flare", "sunlight hitting the lens"],
      },
      {
        prose: "natural lens flare, sunlight hitting the lens, and subtle veiling glare",
        tags: ["natural lens flare", "sunlight hitting the lens", "subtle veiling glare"],
      },
    ),
  },
  {
    id: "vignetting",
    group: "rare",
    label: "Виньетирование",
    description: "Углы чуть темнее из-за оптики, не из-за фильтра.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "subtle optical vignetting", tags: ["subtle optical vignetting"] },
      {
        prose: "subtle optical vignetting with natural corner falloff",
        tags: ["subtle optical vignetting", "natural corner falloff"],
      },
      {
        prose: "optical vignetting with natural corner falloff",
        tags: ["subtle optical vignetting", "natural corner falloff"],
      },
    ),
  },
  {
    id: "lightLeaks",
    group: "rare",
    label: "Засветка",
    description: "Случайный свет по краю кадра.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "a subtle accidental light leak", tags: ["subtle accidental light leak"] },
      {
        prose: "a subtle accidental light leak and a warm edge light leak",
        tags: ["subtle accidental light leak", "warm edge light leak"],
      },
      {
        prose: "an accidental light leak with a warm edge light leak",
        tags: ["subtle accidental light leak", "warm edge light leak"],
      },
    ),
  },
  {
    id: "chromatic",
    group: "rare",
    label: "Хроматические аберрации",
    description: "Тонкая цветная кайма на контрастных краях.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "subtle chromatic aberration", tags: ["subtle chromatic aberration"] },
      {
        prose: "subtle chromatic aberration with slight color fringing",
        tags: ["subtle chromatic aberration", "slight color fringing"],
      },
      {
        prose: "chromatic aberration with slight color fringing",
        tags: ["subtle chromatic aberration", "slight color fringing"],
      },
    ),
  },
  {
    id: "dust",
    group: "rare",
    label: "Пыль на плёнке",
    description: "Редкие пылинки и мелкие следы сканирования.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "occasional film dust", tags: ["occasional film dust"] },
      {
        prose: "occasional film dust and tiny scan imperfections",
        tags: ["occasional film dust", "tiny scan imperfections"],
      },
      {
        prose: "occasional film dust with tiny scan imperfections",
        tags: ["occasional film dust", "tiny scan imperfections"],
      },
    ),
  },
  {
    id: "scratches",
    group: "rare",
    label: "Царапины негатива",
    description: "Редкие тонкие царапины, не сплошная потёртость.",
    defaultOn: false,
    levels: subtleMediumStrong(
      { prose: "subtle negative scratches", tags: ["subtle negative scratches"] },
      { prose: "subtle negative scratches", tags: ["subtle negative scratches"] },
      { prose: "sparse negative scratches", tags: ["subtle negative scratches"] },
    ),
  },
] as const satisfies readonly ArtifactOption[];

export type ArtifactId = (typeof ARTIFACT_OPTIONS)[number]["id"];

export const CONSTRAINTS =
  "Single photograph, single scene, one continuous moment, one location, unified composition. No collage, no split screen, no multiple panels, no photo sequence. No staged commercial photography, no artificial HDR, no excessive digital sharpness, no glossy advertising look.";

export const RARE_WARNING_AT = 3;

export const INTENSITY_LABELS = [
  { label: "Слабо", short: "Слабо", english: "Subtle" },
  { label: "Средне", short: "Средне", english: "Medium" },
  { label: "Сильно", short: "Сильно", english: "Strong" },
] as const;
