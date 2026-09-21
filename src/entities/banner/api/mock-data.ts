import type { Localized } from '@/shared/lib';
import type { Banner } from '../model/schema';

const images = [
  { url: '/mocks/media/banner-1.jpg', width: 1400, height: 1022 },
  { url: '/mocks/media/gallery-2.png', width: 1600, height: 900 },
  { url: '/mocks/media/news-1.jpg', width: 853, height: 1280 },
  { url: '/mocks/media/gallery-1.jpg', width: 862, height: 1280 },
];

const titles: Localized<string[]> = {
  ru: [
    'Аккредитация на кинорынок открыта',
    'Питчинг новых проектов',
    'Программа кинопоказов',
    'Деловые встречи с байерами',
    'Российский контент в мире',
    'Партнёрская программа',
  ],
  en: [
    'Market accreditation is open',
    'New projects pitching',
    'Screenings program',
    'Meetings with buyers',
    'Russian content worldwide',
    'Partner program',
  ],
};

const links = [
  '/news/accreditation-open',
  '/news/pitching-2026',
  '/market/program',
  '/market/participants',
  'https://roskino.org',
  '/partners',
];

export const bannersMock: Localized<Banner[]> = {
  ru: titles.ru.map((title, index) => ({
    id: `banner-${index + 1}`,
    title,
    image: { ...images[index % images.length]!, alt: title },
    href: links[index]!,
    openInNewTab: links[index]!.startsWith('http'),
  })),
  en: titles.en.map((title, index) => ({
    id: `banner-${index + 1}`,
    title,
    image: { ...images[index % images.length]!, alt: title },
    href: links[index]!,
    openInNewTab: links[index]!.startsWith('http'),
  })),
};
