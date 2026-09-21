import type { AppLocale, Localized } from '@/shared/lib';
import type { NewsItem } from '../model/schema';

type NewsSeed = {
  slug: string;
  publishedAt: string;
  cover: NewsItem['cover'];
  title: Localized;
  excerpt: Localized;
};

const covers = {
  news: { url: '/mocks/media/news-1.jpg', alt: '', width: 853, height: 1280 },
  banner: { url: '/mocks/media/banner-1.jpg', alt: '', width: 1400, height: 1022 },
  gallery: { url: '/mocks/media/gallery-2.png', alt: '', width: 1600, height: 900 },
  poster: { url: '/mocks/media/poster-1.jpg', alt: '', width: 700, height: 990 },
} as const;

const seeds: NewsSeed[] = [
  {
    slug: 'accreditation-open',
    publishedAt: '2026-09-15',
    cover: covers.news,
    title: {
      ru: 'Открыта аккредитация на Российский международный кинорынок 2026',
      en: 'Accreditation for the Russian International Content Market 2026 is open',
    },
    excerpt: {
      ru: 'Участники и байеры могут подать заявку на аккредитацию до 1 ноября. Заявки рассматриваются в течение пяти рабочих дней.',
      en: 'Participants and buyers can apply for accreditation until November 1. Applications are reviewed within five business days.',
    },
  },
  {
    slug: 'pitching-2026',
    publishedAt: '2026-09-08',
    cover: null,
    title: {
      ru: 'Питчинг новых проектов пройдёт в первый день кинорынка',
      en: 'New projects pitching will take place on the first day of the market',
    },
    excerpt: {
      ru: 'Продюсеры представят международным дистрибьюторам более 20 анимационных, игровых и сериальных проектов в разработке.',
      en: 'Producers will present more than 20 animated, feature and series projects in development to international distributors.',
    },
  },
  {
    slug: 'buyers-from-mena',
    publishedAt: '2026-08-28',
    cover: covers.banner,
    title: {
      ru: 'Байеры из стран MENA подтвердили участие',
      en: 'Buyers from MENA countries confirmed their participation',
    },
    excerpt: {
      ru: 'Крупнейшие телеканалы и стриминговые платформы региона примут участие в деловой программе кинорынка.',
      en: 'The largest TV channels and streaming platforms of the region will join the business program.',
    },
  },
  {
    slug: 'screenings-program',
    publishedAt: '2026-08-19',
    cover: covers.gallery,
    title: {
      ru: 'Опубликована программа кинопоказов',
      en: 'The screenings program has been published',
    },
    excerpt: {
      ru: 'В программе 67 гостевых показов в кинотеатре «Москва» и НЦ «Россия».',
      en: 'The program includes 67 guest screenings at Moskva Cinema and Rossiya National Center.',
    },
  },
  {
    slug: 'animation-focus',
    publishedAt: '2026-08-05',
    cover: null,
    title: {
      ru: 'Российская анимация в фокусе кинорынка',
      en: 'Russian animation in the market focus',
    },
    excerpt: {
      ru: 'Отдельный блок деловой программы будет посвящён продвижению российской анимации на зарубежных рынках.',
      en: 'A dedicated part of the business program will focus on promoting Russian animation abroad.',
    },
  },
  {
    slug: 'partners-announced',
    publishedAt: '2026-07-22',
    cover: covers.poster,
    title: {
      ru: 'Объявлены генеральные партнёры кинорынка',
      en: 'General partners of the market announced',
    },
    excerpt: {
      ru: 'Кинорынок проводится при поддержке Министерства культуры РФ и Фонда кино.',
      en: 'The market is held with the support of the Ministry of Culture and the Cinema Fund.',
    },
  },
  {
    slug: 'venues-2026',
    publishedAt: '2026-07-10',
    cover: covers.news,
    title: {
      ru: 'Кинорынок пройдёт на двух площадках',
      en: 'The market will take place at two venues',
    },
    excerpt: {
      ru: 'Кинотеатр «Москва» и НЦ «Россия» примут показы, презентации и деловые встречи.',
      en: 'Moskva Cinema and Rossiya National Center will host screenings, presentations and meetings.',
    },
  },
  {
    slug: 'results-2025',
    publishedAt: '2026-06-30',
    cover: covers.banner,
    title: {
      ru: 'Итоги кинорынка 2025 года',
      en: 'Results of the 2025 market',
    },
    excerpt: {
      ru: 'Более 500 участников из 80 стран, 20 презентаций новых проектов и 67 гостевых кинопоказов.',
      en: 'More than 500 participants from 80 countries, 20 project presentations and 67 guest screenings.',
    },
  },
];

const body: Localized<NewsItem['blocks']> = {
  ru: [
    {
      type: 'paragraph',
      text: 'Российский международный кинорынок — ключевая площадка для презентации российского аудиовизуального контента международным дистрибьюторам. В этом году программа расширена: к показам и презентациям добавились индивидуальные встречи с байерами.',
    },
    {
      type: 'quote',
      text: 'Мы видим устойчивый интерес зарубежных партнёров к российскому контенту и стремимся создать для него максимально удобную бизнес-среду.',
      author: 'Иванова А.С.',
      position: 'Генеральный директор',
    },
    {
      type: 'paragraph',
      text: 'Участники смогут представить проекты в разработке, заключить соглашения о дистрибуции и найти партнёров для совместного производства. Для аккредитованных гостей доступен личный кабинет My market с каталогом участников и проектов.',
    },
    {
      type: 'highlight',
      text: 'Аккредитация открыта до 1 ноября. Подать заявку можно на сайте кинорынка, указав компанию и контактное лицо.',
    },
  ],
  en: [
    {
      type: 'paragraph',
      text: 'The Russian International Content Market is the key platform for presenting Russian audiovisual content to international distributors. This year the program is extended: one-to-one meetings with buyers are added to screenings and presentations.',
    },
    {
      type: 'quote',
      text: 'We see steady interest of international partners in Russian content and strive to create the most convenient business environment for it.',
      author: 'A. Ivanova',
      position: 'CEO',
    },
    {
      type: 'paragraph',
      text: 'Participants will be able to present projects in development, sign distribution agreements and find co-production partners. Accredited guests get access to My market with the catalogue of participants and projects.',
    },
    {
      type: 'highlight',
      text: 'Accreditation is open until November 1. Apply on the market website with your company and contact person.',
    },
  ],
};

const credits: Localized<string[]> = {
  ru: ['Корреспондент — Петров И.О.', 'Фотограф — Сидоров А.В.'],
  en: ['Reporter — I. Petrov', 'Photographer — A. Sidorov'],
};

export function buildNewsMock(lang: AppLocale): NewsItem[] {
  return seeds.map((seed, index) => ({
    id: `news-${index + 1}`,
    slug: seed.slug,
    publishedAt: seed.publishedAt,
    cover: seed.cover,
    title: seed.title[lang],
    excerpt: seed.excerpt[lang],
    blocks: body[lang],
    photos: [covers.gallery, covers.banner, covers.news],
    videos: [
      {
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        poster: covers.gallery,
        title: seed.title[lang],
        duration: '0:10',
      },
    ],
    credits: credits[lang],
  }));
}
