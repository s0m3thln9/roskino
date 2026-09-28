import type { Localized } from '@/shared/lib';
import type { PartnerGroup } from '../model/schema';

const logos = {
  minkult: { url: '/mocks/partners/minkult.svg', alt: '', width: 207, height: 171 },
  fondKino: { url: '/mocks/partners/fond-kino.png', alt: '', width: 1253, height: 473 },
  gazprom: { url: '/mocks/partners/gazprom-media.png', alt: '', width: 4096, height: 1333 },
  nmg: { url: '/mocks/partners/nmg.svg', alt: '', width: 207, height: 131 },
};

const lorem =
  'Pellentesque a molestie neque. Cras metus orci, euismod at ipsum in, molestie ullamcorper ipsum. Etiam id dui imperdiet, molestie quam non, faucibus purus. Pellentesque fringilla posuere nisi sed rutrum. Integer nec libero vel quam egestas hendrerit at sed ligula.';

export const partnersMock: Localized<PartnerGroup[]> = {
  ru: [
    {
      type: 'informational',
      title: 'Информационные партнеры',
      partners: [
        {
          id: 'minkult',
          name: 'Министерство культуры Российской Федерации',
          description:
            'Основная задача Министерства культуры Российской Федерации – реализация Стратегии государственной культурной политики на период до 2030 года, утверждённой Распоряжением Правительства РФ от 11 сентября 2024 г. № 2501-р. Мы работаем для того, чтобы изо дня в день Россия укрепляла свой статус великой культурной державы, а каждый из её граждан ощущал свою причастность к нашим национальным культурным ценностям.',
          website: 'https://culture.gov.ru',
          websiteLabel: 'culture.gov.ru',
          logo: { ...logos.minkult, alt: 'Министерство культуры Российской Федерации' },
        },
        {
          id: 'fond-kino',
          name: 'Фонд кино',
          description:
            'Основными целями Фонда кино являются поддержка отечественной кинематографии, повышение ее конкурентоспособности, обеспечение условий для создания качественных фильмов, соответствующих национальным интересам, а также популяризация национальных фильмов в Российской Федерации и за рубежом.',
          website: 'https://fond-kino.ru',
          websiteLabel: 'fond-kino.ru',
          logo: { ...logos.fondKino, alt: 'Фонд кино' },
        },
      ],
    },
    {
      type: 'general',
      title: 'Генеральные партнеры',
      partners: [
        {
          id: 'gazprom-media',
          name: 'АО «Газпром-Медиа Холдинг»',
          description: lorem,
          website: 'https://gazprom-media.com',
          websiteLabel: 'gazprom-media.com',
          logo: { ...logos.gazprom, alt: 'Газпром-Медиа Холдинг' },
        },
        {
          id: 'nmg',
          name: 'АО «Национальная Медиа Группа»',
          description: lorem,
          website: 'https://nmg.ru',
          websiteLabel: 'nmg.ru',
          logo: { ...logos.nmg, alt: 'Национальная Медиа Группа' },
        },
      ],
    },
    {
      type: 'other',
      title: 'Другие партнеры',
      partners: [
        {
          id: 'company-1',
          name: 'АО «Название компании»',
          description: lorem,
          website: 'https://link.ru',
          websiteLabel: 'link.ru',
          logo: null,
        },
        {
          id: 'company-2',
          name: 'АО «Название компании»',
          description: lorem,
          website: 'https://link.ru',
          websiteLabel: 'link.ru',
          logo: null,
        },
      ],
    },
  ],
  en: [
    {
      type: 'informational',
      title: 'Media partners',
      partners: [
        {
          id: 'minkult',
          name: 'Ministry of Culture of the Russian Federation',
          description:
            'The main task of the Ministry of Culture of the Russian Federation is to implement the Strategy of State Cultural Policy until 2030, approved by Government Order No. 2501-r of 11 September 2024. We work so that Russia strengthens its status as a great cultural power day by day, and every citizen feels part of our national cultural values.',
          website: 'https://culture.gov.ru',
          websiteLabel: 'culture.gov.ru',
          logo: { ...logos.minkult, alt: 'Ministry of Culture of the Russian Federation' },
        },
        {
          id: 'fond-kino',
          name: 'Cinema Fund',
          description:
            'The main goals of the Cinema Fund are to support national cinematography, increase its competitiveness, create conditions for making high-quality films that meet national interests, and promote national films in the Russian Federation and abroad.',
          website: 'https://fond-kino.ru',
          websiteLabel: 'fond-kino.ru',
          logo: { ...logos.fondKino, alt: 'Cinema Fund' },
        },
      ],
    },
    {
      type: 'general',
      title: 'General partners',
      partners: [
        {
          id: 'gazprom-media',
          name: 'Gazprom-Media Holding',
          description: lorem,
          website: 'https://gazprom-media.com',
          websiteLabel: 'gazprom-media.com',
          logo: { ...logos.gazprom, alt: 'Gazprom-Media Holding' },
        },
        {
          id: 'nmg',
          name: 'National Media Group',
          description: lorem,
          website: 'https://nmg.ru',
          websiteLabel: 'nmg.ru',
          logo: { ...logos.nmg, alt: 'National Media Group' },
        },
      ],
    },
    {
      type: 'other',
      title: 'Other partners',
      partners: [
        {
          id: 'company-1',
          name: 'Company Name JSC',
          description: lorem,
          website: 'https://link.ru',
          websiteLabel: 'link.ru',
          logo: null,
        },
        {
          id: 'company-2',
          name: 'Company Name JSC',
          description: lorem,
          website: 'https://link.ru',
          websiteLabel: 'link.ru',
          logo: null,
        },
      ],
    },
  ],
};
