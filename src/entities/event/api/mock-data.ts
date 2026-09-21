import type { Localized } from '@/shared/lib';
import type { MarketEvent } from '../model/schema';

export const eventMock: Localized<MarketEvent> = {
  ru: {
    id: 'ricm-2026',
    title: 'Российский международный кинорынок',
    startDate: '2026-12-01',
    endDate: '2026-12-03',
    heroImage: null,
    details: [
      { icon: 'place', label: 'Место проведения:', lines: ['Москва'] },
      { icon: 'dates', label: 'Даты проведения:', lines: ['1-3 декабря 2026'] },
      {
        icon: 'venue',
        label: 'Площадки проведения:',
        lines: ['Кинотеатр «Москва»', 'НЦ «Россия»'],
      },
    ],
    about: {
      title: 'Российский международный кинорынок —',
      body: [
        {
          text: 'международный рынок российского аудиовизуального контента, проводится РОСКИНО при поддержке ',
        },
        { text: 'Министерства культуры Российской Федерации', href: 'https://culture.gov.ru' },
        { text: ' и ' },
        { text: 'Фонда кино', href: 'https://fond-kino.ru' },
        { text: ', при участии АО «' },
        { text: 'Газпром-Медиа Холдинг', href: 'https://gazprom-media.com' },
        { text: '» и АО «' },
        { text: 'Национальная Медиа Группа', href: 'https://nmg.ru' },
        {
          text: '». Уникальная бизнес-площадка российской индустрии, созданная для презентации контента международным дистрибьюторам и поиска партнёров.',
        },
      ],
    },
    highlights: [
      {
        kind: 'number',
        value: '3',
        caption: 'Дня',
        text: 'Расширение возможностей для выхода российского контента на международный рынок',
      },
      {
        kind: 'number',
        value: '30+',
        caption: 'Международных байеров',
        text: 'Ведущие международные закупщики из регионов MENA, Азии, Европы, Латинской Америки',
      },
      {
        kind: 'icon',
        icon: 'program',
        caption: 'Деловая программа',
        text: 'Скрининги, презентации, панельные сессии, индивидуальные встречи',
      },
    ],
    goals: {
      title: 'Цели и задачи кинорынка',
      items: [
        'Продажа прав',
        'Презентация новинок',
        'Поиск партнеров',
        'Деловое общение',
        'Маркетинг и аналитика',
      ],
    },
  },
  en: {
    id: 'ricm-2026',
    title: 'Russian International Content Market',
    startDate: '2026-12-01',
    endDate: '2026-12-03',
    heroImage: null,
    details: [
      { icon: 'place', label: 'Location:', lines: ['Moscow'] },
      { icon: 'dates', label: 'Dates:', lines: ['December 1-3, 2026'] },
      { icon: 'venue', label: 'Venues:', lines: ['Moskva Cinema', 'Rossiya National Center'] },
    ],
    about: {
      title: 'Russian International Content Market —',
      body: [
        {
          text: 'an international market of Russian audiovisual content organised by ROSKINO with the support of the ',
        },
        { text: 'Ministry of Culture of the Russian Federation', href: 'https://culture.gov.ru' },
        { text: ' and the ' },
        { text: 'Cinema Fund', href: 'https://fond-kino.ru' },
        { text: ', with the participation of ' },
        { text: 'Gazprom-Media Holding', href: 'https://gazprom-media.com' },
        { text: ' and ' },
        { text: 'National Media Group', href: 'https://nmg.ru' },
        {
          text: '. A unique business platform of the Russian industry created to present content to international distributors and find partners.',
        },
      ],
    },
    highlights: [
      {
        kind: 'number',
        value: '3',
        caption: 'Days',
        text: 'More opportunities for Russian content to enter the international market',
      },
      {
        kind: 'number',
        value: '30+',
        caption: 'International buyers',
        text: 'Leading international buyers from MENA, Asia, Europe and Latin America',
      },
      {
        kind: 'icon',
        icon: 'program',
        caption: 'Business program',
        text: 'Screenings, presentations, panel sessions, one-to-one meetings',
      },
    ],
    goals: {
      title: 'Market goals',
      items: [
        'Rights sales',
        'New releases showcase',
        'Partner search',
        'Business networking',
        'Marketing and analytics',
      ],
    },
  },
};
