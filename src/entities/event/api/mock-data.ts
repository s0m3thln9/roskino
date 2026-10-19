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
    about: [
      [
        { text: 'РОСКИНО', href: 'https://roskino.org' },
        { text: ' при поддержке ' },
        { text: 'Минкультуры России', href: 'https://culture.gov.ru' },
        { text: ', а также Фонда кино и ключевых российских холдингов: ' },
        { text: '«Газпром-Медиа Холдинга»', href: 'https://gazprom-media.com' },
        { text: ' и ' },
        { text: '«Национальной Медиа Группы»', href: 'https://nmg.ru' },
        {
          text: ', организует Российский международный кинорынок (Russian International Content Market).',
        },
      ],
      [
        {
          text: 'В мероприятии примут участие крупнейшие закупщики аудиовизуальной продукции из стран БРИКС, Латинской Америки, MENA, Азии, Европы и других государств.',
        },
      ],
      [
        {
          text: 'Программа включает презентации и показы художественных фильмов, телевизионных сериалов и анимационных проектов ведущих российских производственных и дистрибьюторских компаний, индивидуальные встречи и панельные сессии, которые пройдут на основной площадке мероприятия – в кинотеатре «Москва».',
        },
      ],
      [
        {
          text: 'Одним из ключевых событий деловой программы станет пленарная сессия с участием представителей госструктур, крупнейших холдингов и ведущих российских и зарубежных деятелей киноиндустрии, которые обсудят новые отраслевые вызовы. Мероприятие состоится 1 декабря на площадке Национального центра «Россия».',
        },
      ],
    ],
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
    about: [
      [
        { text: 'ROSKINO', href: 'https://roskino.org' },
        { text: ', with the support of the ' },
        { text: 'Russian Ministry of Culture', href: 'https://culture.gov.ru' },
        { text: ', the Cinema Fund and the key Russian media holdings ' },
        { text: 'Gazprom-Media Holding', href: 'https://gazprom-media.com' },
        { text: ' and ' },
        { text: 'National Media Group', href: 'https://nmg.ru' },
        { text: ', organises the Russian International Content Market.' },
      ],
      [
        {
          text: 'The event will bring together the largest buyers of audiovisual content from the BRICS countries, Latin America, MENA, Asia, Europe and other regions.',
        },
      ],
      [
        {
          text: 'The program includes presentations and screenings of feature films, TV series and animated projects by leading Russian production and distribution companies, one-to-one meetings and panel sessions held at the main venue of the event, the Moskva Cinema.',
        },
      ],
      [
        {
          text: 'One of the key events of the business program will be a plenary session with representatives of government bodies, major media holdings and leading Russian and international film industry figures discussing new challenges facing the industry. It will take place on December 1 at the Rossiya National Center.',
        },
      ],
    ],
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
