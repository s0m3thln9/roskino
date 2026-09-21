import type { Localized } from '@/shared/lib';
import type { ArchiveEdition, MediaItem } from '../model/schema';

const photo = (
  id: string,
  year: number,
  url: string,
  width: number,
  height: number,
  alt: string,
): MediaItem => ({
  id,
  type: 'photo',
  year,
  image: { url, alt, width, height },
});

export const mediaMock: MediaItem[] = [
  photo('p-1', 2026, '/mocks/media/gallery-2.png', 1600, 900, 'Съёмочная площадка'),
  photo('p-2', 2026, '/mocks/media/gallery-1.jpg', 862, 1280, 'Гости кинорынка'),
  photo('p-3', 2026, '/mocks/media/banner-1.jpg', 1400, 1022, 'Кадр из фильма'),
  photo('p-4', 2026, '/mocks/media/news-1.jpg', 853, 1280, 'Презентация проектов'),
  photo('p-5', 2026, '/mocks/media/poster-1.jpg', 700, 990, 'Постер проекта'),
  photo('p-6', 2025, '/mocks/media/banner-1.jpg', 1400, 1022, 'Кинорынок 2025'),
  photo('p-7', 2025, '/mocks/media/gallery-2.png', 1600, 900, 'Кинорынок 2025'),
  {
    id: 'v-1',
    type: 'video',
    year: 2026,
    image: {
      url: '/mocks/media/gallery-2.png',
      alt: 'Видеообзор кинорынка',
      width: 1600,
      height: 900,
    },
    video: {
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: { url: '/mocks/media/gallery-2.png', alt: '', width: 1600, height: 900 },
      title: 'Видеообзор кинорынка',
      duration: '0:10',
    },
  },
  {
    id: 'v-2',
    type: 'video',
    year: 2026,
    image: {
      url: '/mocks/media/banner-1.jpg',
      alt: 'Интервью с участниками',
      width: 1400,
      height: 1022,
    },
    video: {
      url: 'https://www.w3schools.com/html/movie.mp4',
      poster: { url: '/mocks/media/banner-1.jpg', alt: '', width: 1400, height: 1022 },
      title: 'Интервью с участниками',
      duration: '0:12',
    },
  },
];

export const archiveMock: Localized<ArchiveEdition[]> = {
  ru: [
    {
      year: 2025,
      title: 'Российский международный кинорынок 2025',
      dates: '2-4 декабря 2025',
      summary: '500+ участников, 80 стран, 67 гостевых кинопоказов.',
      cover: { url: '/mocks/media/banner-1.jpg', alt: '', width: 1400, height: 1022 },
    },
    {
      year: 2024,
      title: 'Российский международный кинорынок 2024',
      dates: '3-5 декабря 2024',
      summary: '400+ участников, 60 стран, 50 презентаций новых проектов.',
      cover: { url: '/mocks/media/gallery-2.png', alt: '', width: 1600, height: 900 },
    },
  ],
  en: [
    {
      year: 2025,
      title: 'Russian International Content Market 2025',
      dates: 'December 2-4, 2025',
      summary: '500+ participants, 80 countries, 67 guest screenings.',
      cover: { url: '/mocks/media/banner-1.jpg', alt: '', width: 1400, height: 1022 },
    },
    {
      year: 2024,
      title: 'Russian International Content Market 2024',
      dates: 'December 3-5, 2024',
      summary: '400+ participants, 60 countries, 50 new project presentations.',
      cover: { url: '/mocks/media/gallery-2.png', alt: '', width: 1600, height: 900 },
    },
  ],
};
