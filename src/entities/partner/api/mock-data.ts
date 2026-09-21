import type { Localized } from '@/shared/lib';
import type { PartnerGroup } from '../model/schema';

const logos = {
  minkult: { url: '/mocks/partners/minkult.svg', alt: '', width: 207, height: 171 },
  fondKino: { url: '/mocks/partners/fond-kino.png', alt: '', width: 1920, height: 1080 },
  gazprom: { url: '/mocks/partners/gazprom-media.png', alt: '', width: 4096, height: 1333 },
  nmg: { url: '/mocks/partners/nmg.svg', alt: '', width: 207, height: 131 },
};

const lorem = {
  ru: 'Pellentesque a molestie neque. Cras metus orci, euismod at ipsum in, molestie ullamcorper ipsum. Etiam id dui imperdiet, molestie quam non, faucibus purus. Pellentesque fringilla posuere nisi sed rutrum.',
  en: 'Pellentesque a molestie neque. Cras metus orci, euismod at ipsum in, molestie ullamcorper ipsum. Etiam id dui imperdiet, molestie quam non, faucibus purus. Pellentesque fringilla posuere nisi sed rutrum.',
};

export const partnersMock: Localized<PartnerGroup[]> = {
  ru: [
    {
      type: 'general',
      title: 'Генеральные партнёры',
      partners: [
        {
          id: 'minkult',
          name: 'Министерство культуры Российской Федерации',
          description:
            'Федеральный орган исполнительной власти, осуществляющий функции по выработке государственной политики в сфере культуры и кинематографии.',
          website: 'https://culture.gov.ru',
          websiteLabel: 'culture.gov.ru',
          logo: { ...logos.minkult, alt: 'Министерство культуры Российской Федерации' },
        },
        {
          id: 'fond-kino',
          name: 'Фонд кино',
          description:
            'Федеральный фонд социальной и экономической поддержки отечественной кинематографии.',
          website: 'https://fond-kino.ru',
          websiteLabel: 'fond-kino.ru',
          logo: { ...logos.fondKino, alt: 'Фонд кино' },
        },
      ],
    },
    {
      type: 'informational',
      title: 'Информационные партнёры',
      partners: [
        {
          id: 'gazprom-media',
          name: 'АО «Газпром-Медиа Холдинг»',
          description: lorem.ru,
          website: 'https://gazprom-media.com',
          websiteLabel: 'gazprom-media.com',
          logo: { ...logos.gazprom, alt: 'Газпром-Медиа Холдинг' },
        },
        {
          id: 'nmg',
          name: 'АО «Национальная Медиа Группа»',
          description: lorem.ru,
          website: 'https://nmg.ru',
          websiteLabel: 'nmg.ru',
          logo: { ...logos.nmg, alt: 'Национальная Медиа Группа' },
        },
      ],
    },
    {
      type: 'other',
      title: 'Другие партнёры',
      partners: [
        {
          id: 'company-1',
          name: 'АО «Название компании»',
          description: lorem.ru,
          website: 'https://link.ru',
          websiteLabel: 'link.ru',
          logo: null,
        },
        {
          id: 'company-2',
          name: 'ООО «Кинокомпания»',
          description: lorem.ru,
          website: 'https://example.com',
          websiteLabel: 'example.com',
          logo: null,
        },
      ],
    },
  ],
  en: [
    {
      type: 'general',
      title: 'General partners',
      partners: [
        {
          id: 'minkult',
          name: 'Ministry of Culture of the Russian Federation',
          description:
            'The federal executive body responsible for state policy in culture and cinematography.',
          website: 'https://culture.gov.ru',
          websiteLabel: 'culture.gov.ru',
          logo: { ...logos.minkult, alt: 'Ministry of Culture of the Russian Federation' },
        },
        {
          id: 'fond-kino',
          name: 'Cinema Fund',
          description: 'Federal fund for social and economic support of national cinematography.',
          website: 'https://fond-kino.ru',
          websiteLabel: 'fond-kino.ru',
          logo: { ...logos.fondKino, alt: 'Cinema Fund' },
        },
      ],
    },
    {
      type: 'informational',
      title: 'Media partners',
      partners: [
        {
          id: 'gazprom-media',
          name: 'Gazprom-Media Holding',
          description: lorem.en,
          website: 'https://gazprom-media.com',
          websiteLabel: 'gazprom-media.com',
          logo: { ...logos.gazprom, alt: 'Gazprom-Media Holding' },
        },
        {
          id: 'nmg',
          name: 'National Media Group',
          description: lorem.en,
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
          description: lorem.en,
          website: 'https://link.ru',
          websiteLabel: 'link.ru',
          logo: null,
        },
        {
          id: 'company-2',
          name: 'Film Company LLC',
          description: lorem.en,
          website: 'https://example.com',
          websiteLabel: 'example.com',
          logo: null,
        },
      ],
    },
  ],
};
