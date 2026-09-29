import { MOCK_STUDIOS } from '@/entities/project/@x/participant.server';
import type { Participant } from '../model/schema';

export type ParticipantSeed = Omit<Participant, 'projects'>;

const about =
  'Nunc fringilla dui diam, vel placerat tortor facilisis vitae. Mauris pellentesque eros ut congue condimentum. Nullam venenatis augue id urna cursus, ut euismod mauris accumsan. Nullam eu sollicitudin lorem. Vestibulum imperdiet arcu ac faucibus tristique.';

const achievements =
  'SMF Animation operates as a multi-platform entertainment company that includes animation production, licensing, educational initiatives, and creative development facilities. Content is broadcast and streamed in more than 120 countries, including France, the United Kingdom, Germany, Israel, China, and Indonesia.';

const contact = (name: string, email: string) => ({
  name,
  position: 'Director of International Sales and Projects',
  email,
  photo: null,
});

export const participantsSeed: ParticipantSeed[] = [
  {
    id: 'smf-animation',
    name: 'SMF Animation',
    website: 'https://www.smfanimation.com',
    websiteLabel: 'www.smfanimation.com',
    logo: null,
    origin: 'russian',
    contentTypes: ['animation', 'series'],
    genres: ['adventure', 'comedy', 'fantasy'],
    addressLines: ['21, build.1, Akademika Koroleva str.,', 'Moscow, 127427, Russia'],
    country: 'Russia',
    distributionTerritory: null,
    about,
    achievements,
    contact: contact('Maria Savinykh', 'm.savinykh@smfanimation.com'),
  },
  {
    id: 'av-company',
    name: 'Av Company',
    website: 'https://www.company.com',
    websiteLabel: 'www.company.com',
    logo: null,
    origin: 'russian',
    contentTypes: ['feature-film', 'documentary'],
    genres: ['drama', 'romance', 'adventure'],
    addressLines: ['12, Tverskaya str.,', 'Moscow, 125009, Russia'],
    country: 'Russia',
    distributionTerritory: null,
    about,
    achievements,
    contact: contact('Anna Belova', 'a.belova@company.com'),
  },
  {
    id: 'b-company',
    name: 'B Company',
    website: 'https://www.bcompany.com',
    websiteLabel: 'www.bcompany.com',
    logo: null,
    origin: 'russian',
    contentTypes: ['animation', 'series'],
    genres: ['sci-fi', 'comedy', 'drama'],
    addressLines: ['5, Nevsky prospect,', 'Saint Petersburg, 191186, Russia'],
    country: 'Russia',
    distributionTerritory: null,
    about,
    achievements: null,
    contact: contact('Ivan Petrov', 'i.petrov@bcompany.com'),
  },
  {
    id: 'c-company',
    name: 'C Company',
    website: 'https://www.ccompany.com',
    websiteLabel: 'www.ccompany.com',
    logo: null,
    origin: 'russian',
    contentTypes: ['animation', 'feature-film'],
    genres: ['musical', 'comedy', 'action'],
    addressLines: ['8, Lenina str.,', 'Kazan, 420111, Russia'],
    country: 'Russia',
    distributionTerritory: null,
    about,
    achievements,
    contact: contact('Olga Smirnova', 'o.smirnova@ccompany.com'),
  },
  {
    id: 'toonz-turkey',
    name: 'Toonz Turkey',
    website: 'https://www.foreigncompany.com',
    websiteLabel: 'www.foreigncompany.com',
    logo: null,
    origin: 'international',
    contentTypes: ['animation', 'series'],
    genres: ['comedy', 'adventure', 'fantasy'],
    addressLines: ['8515. Sokak 10', 'Aksaray, 68000, Turkey'],
    country: 'Turkey',
    distributionTerritory: 'EU, Brazil',
    about,
    achievements: null,
    contact: contact('Regina J.B. Buyer', 'regina@toonz.com'),
  },
  {
    id: 'toonz-armenia',
    name: 'Toonz Armenia',
    website: 'https://www.link.com',
    websiteLabel: 'www.link.com',
    logo: null,
    origin: 'international',
    contentTypes: ['feature-film'],
    genres: ['drama'],
    addressLines: ['1, Abovyan str.', 'Yerevan, 0001, Armenia'],
    country: 'Armenia',
    distributionTerritory: 'CIS, Middle East',
    about,
    achievements: null,
    contact: contact('Aram Sargsyan', 'aram@toonz.am'),
  },
  {
    id: 'd-company',
    name: 'D Company',
    website: 'https://www.dcompany.com',
    websiteLabel: 'www.dcompany.com',
    logo: null,
    origin: 'international',
    contentTypes: ['documentary', 'series'],
    genres: ['adventure'],
    addressLines: ['221B Baker Street', 'London, NW1 6XE, United Kingdom'],
    country: 'United Kingdom',
    distributionTerritory: 'Worldwide',
    about,
    achievements: null,
    contact: contact('John Smith', 'john@dcompany.com'),
  },
  {
    id: 'f-company',
    name: 'F Company',
    website: 'https://www.fcompany.com',
    websiteLabel: 'www.fcompany.com',
    logo: null,
    origin: 'international',
    contentTypes: ['animation'],
    genres: ['fantasy', 'musical'],
    addressLines: ['18 Rue de Rivoli', 'Paris, 75004, France'],
    country: 'France',
    distributionTerritory: 'EU',
    about,
    achievements: null,
    contact: contact('Claire Dubois', 'claire@fcompany.com'),
  },
];

type ContentTypes = Participant['contentTypes'];
type Genres = Participant['genres'];

const CONTENT_ROTATION: ContentTypes[] = [
  ['animation'],
  ['feature-film', 'series'],
  ['documentary'],
  ['series', 'animation'],
  ['feature-film'],
];
const GENRE_ROTATION: Genres[] = [
  ['adventure', 'comedy'],
  ['drama', 'romance'],
  ['fantasy', 'musical'],
  ['sci-fi', 'action'],
  ['comedy', 'drama'],
];
const RUSSIAN_ADDRESSES = [
  ['7, Arbat str.,', 'Moscow, 119019, Russia'],
  ['15, Liteyny prospect,', 'Saint Petersburg, 191028, Russia'],
  ['3, Baumana str.,', 'Kazan, 420111, Russia'],
  ['40, Lenina str.,', 'Yekaterinburg, 620014, Russia'],
];
const INTERNATIONAL = [
  { name: 'Lumen Pictures', country: 'Germany', territory: 'EU', city: 'Berlin, 10115' },
  { name: 'Atlas Films', country: 'Spain', territory: 'EU, Latin America', city: 'Madrid, 28013' },
  { name: 'Harbor Media', country: 'USA', territory: 'North America', city: 'New York, 10001' },
  { name: 'Kite Animation', country: 'Japan', territory: 'Asia', city: 'Tokyo, 150-0001' },
  { name: 'Nile Studios', country: 'Egypt', territory: 'MENA', city: 'Cairo, 11511' },
  {
    name: 'Pampa Films',
    country: 'Argentina',
    territory: 'Latin America',
    city: 'Buenos Aires, C1001',
  },
  { name: 'Lotus Media', country: 'India', territory: 'South Asia', city: 'Mumbai, 400001' },
  { name: 'Aegean Pictures', country: 'Greece', territory: 'EU', city: 'Athens, 105 57' },
  { name: 'Bosphorus Film', country: 'Turkey', territory: 'EU, MENA', city: 'Istanbul, 34000' },
  { name: 'Silk Road Media', country: 'Uzbekistan', territory: 'CIS', city: 'Tashkent, 100000' },
  { name: 'Dragon Gate', country: 'China', territory: 'Asia', city: 'Beijing, 100000' },
  { name: 'Samba Studio', country: 'Brazil', territory: 'Latin America', city: 'Sao Paulo, 01000' },
  { name: 'Cedar Films', country: 'Lebanon', territory: 'MENA', city: 'Beirut, 1100' },
  { name: 'Baltic Frame', country: 'Serbia', territory: 'Balkans', city: 'Belgrade, 11000' },
  { name: 'Savanna Media', country: 'Kenya', territory: 'Africa', city: 'Nairobi, 00100' },
  { name: 'Maple Pictures', country: 'Canada', territory: 'North America', city: 'Toronto, M5H' },
];

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');
const domain = (name: string) => `www.${name.toLowerCase().replace(/\s+/g, '')}.com`;

const generatedRussian: ParticipantSeed[] = MOCK_STUDIOS.map(({ id, name }, index) => ({
  id,
  name,
  website: `https://${domain(name)}`,
  websiteLabel: domain(name),
  logo: null,
  origin: 'russian',
  contentTypes: CONTENT_ROTATION[index % CONTENT_ROTATION.length]!,
  genres: GENRE_ROTATION[index % GENRE_ROTATION.length]!,
  addressLines: RUSSIAN_ADDRESSES[index % RUSSIAN_ADDRESSES.length]!,
  country: null,
  distributionTerritory: null,
  about,
  achievements: index % 3 === 2 ? null : achievements,
  contact: contact('Maria Savinykh', `info@${domain(name).slice(4)}`),
}));

const generatedInternational: ParticipantSeed[] = INTERNATIONAL.map((company, index) => ({
  id: slug(company.name),
  name: company.name,
  website: `https://${domain(company.name)}`,
  websiteLabel: domain(company.name),
  logo: null,
  origin: 'international',
  contentTypes: CONTENT_ROTATION[(index + 2) % CONTENT_ROTATION.length]!,
  genres: GENRE_ROTATION[(index + 1) % GENRE_ROTATION.length]!,
  addressLines: [`${10 + index} Main Street`, `${company.city}, ${company.country}`],
  country: company.country,
  distributionTerritory: company.territory,
  about,
  achievements: null,
  contact: contact('Regina J.B. Buyer', `sales@${domain(company.name).slice(4)}`),
}));

participantsSeed.push(...generatedRussian, ...generatedInternational);
