import type { Localized } from '@/shared/lib';
import type { SiteSettings } from '../model/schema';

export const siteSettingsMock: Localized<SiteSettings> = {
  ru: {
    organization: {
      name: 'АО «РОСКИНО»',
      addressLines: ['АО «РОСКИНО»', '125009, Россия, Москва,', 'Калашный переулок 14'],
      phone: '+7 495 6905009',
      email: 'info@roskino.org',
      ogrn: '1047703026161',
      copyright: '© АО «РОСКИНО», 2026, Все права защищены',
    },
    socials: [
      { type: 'telegram', url: 'https://t.me/roskino', label: 'Telegram' },
      { type: 'max', url: 'https://max.ru/roskino', label: 'Max' },
    ],
    map: {
      image: {
        url: '/mocks/media/footer-map.png',
        alt: 'Карта: Калашный переулок, 14',
        width: 800,
        height: 569,
      },
      directionsUrl: 'https://yandex.ru/maps/-/CHaJ7Z~3',
      directionsLabel: 'Как добраться',
    },
  },
  en: {
    organization: {
      name: 'ROSKINO JSC',
      addressLines: ['ROSKINO JSC', '14 Kalashny Lane,', 'Moscow, 125009, Russia'],
      phone: '+7 495 6905009',
      email: 'info@roskino.org',
      ogrn: '1047703026161',
      copyright: '© ROSKINO JSC, 2026. All rights reserved',
    },
    socials: [
      { type: 'telegram', url: 'https://t.me/roskino', label: 'Telegram' },
      { type: 'max', url: 'https://max.ru/roskino', label: 'Max' },
    ],
    map: {
      image: {
        url: '/mocks/media/footer-map.png',
        alt: 'Map: 14 Kalashny Lane',
        width: 800,
        height: 569,
      },
      directionsUrl: 'https://yandex.ru/maps/-/CHaJ7Z~3',
      directionsLabel: 'How to get there',
    },
  },
};
