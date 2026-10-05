import { notFound } from 'next/navigation';
import { Header } from '@/widgets/header';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import {
  Button,
  ContactLink,
  Icon,
  ICONS,
  InfoRow,
  Logo,
  Pagination,
  Person,
  PlayButton,
  RoundButton,
  Tag,
  type IconName,
} from '@/shared/ui';
import { UiKitFields } from './UiKitFields';
import { UiKitInteractive } from './UiKitInteractive';

type UiKitPageProps = {
  params: Promise<LocaleParams>;
};

const paginationLabels = {
  nav: 'Pagination',
  previous: 'Previous page',
  next: 'Next page',
  page: (page: number) => `Page ${page}`,
};

function Section({
  title,
  dark,
  children,
}: {
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={dark ? 'bg-black px-4 py-12 text-white md:px-25' : 'px-4 py-12 md:px-25'}>
      <h2 className="mb-10 typo-headline-2">{title}</h2>
      <div className="flex flex-wrap items-start gap-10">{children}</div>
    </section>
  );
}

const COLOUR_GROUPS = [
  {
    title: 'Primary',
    swatches: [
      { name: 'Black', hex: 'HEX: 000000', className: 'bg-black text-white' },
      { name: 'Black [50%]', hex: 'HEX: 000000', className: 'bg-black/50 text-white' },
      { name: 'Black [20%]', hex: 'HEX: 000000', className: 'bg-black/20 text-white' },
      { name: 'Dark Grey', hex: 'HEX: 333333', className: 'bg-dark-grey text-white' },
      { name: 'Dark Grey [75%]', hex: 'HEX: 333333', className: 'bg-dark-grey/75 text-white' },
      { name: 'White', hex: 'HEX: FFFFFF', className: 'bg-white text-black' },
      { name: 'White [75%]', hex: 'HEX: FFFFFF', className: 'bg-white/75 text-black' },
      { name: 'White [50%]', hex: 'HEX: FFFFFF', className: 'bg-white/50 text-black' },
      { name: 'Strawberry Pink', hex: 'HEX: E08585', className: 'bg-pink text-white' },
      { name: 'Error', hex: 'HEX: FFB2B2', className: 'bg-error text-black' },
    ],
  },
  {
    title: 'Secondary',
    swatches: [
      { name: 'Mango Yellow', hex: 'HEX: F2B90D', className: 'bg-mango text-black' },
      { name: 'Peach Orange', hex: 'HEX: FF794D', className: 'bg-peach text-black' },
      { name: 'Orchid Pink', hex: 'HEX: ED5EED', className: 'bg-orchid text-black' },
      { name: 'Turquoise Blue', hex: 'HEX: 17B0CF', className: 'bg-turquoise text-white' },
      { name: 'Lilac Purple', hex: 'HEX: 9F80FF', className: 'bg-lilac text-white' },
      { name: 'Apple Green', hex: 'HEX: 73B82E', className: 'bg-apple text-white' },
      { name: 'Apricot Grey', hex: 'HEX: E0D5D1', className: 'bg-apricot text-black' },
      { name: 'Ash Grey [50%]', hex: 'HEX: CAD0CE', className: 'bg-grey/50 text-black' },
    ],
  },
  {
    title: 'Gradients',
    swatches: [
      { name: 'Main', hex: '006B80 → E07A7A', className: 'bg-gradient-main text-white' },
      { name: 'News', hex: 'FF754D [20% → 0%]', className: 'bg-gradient-news text-black' },
    ],
  },
];

export async function UiKitPage({ params }: UiKitPageProps) {
  if (process.env.NODE_ENV === 'production') notFound();
  await resolveLocale(params);

  return (
    <>
      <Header tone="dark" />
      <main className="flex-1 page-gutter pt-25">
        <Section title="Fonts">
          <div className="flex flex-col gap-4">
            <p className="typo-headline-1">H</p>
            <p className="typo-title uppercase">Title</p>
            <p className="typo-title">Title</p>
            <p className="typo-subtitle">Subtitle</p>
            <p className="typo-menu">Menu</p>
            <p className="typo-filter">Filter</p>
            <p className="typo-text-1">Text 1</p>
            <p className="typo-text-2">Text 2</p>
            <p className="typo-text-3">Text 3</p>
            <p className="typo-text-4">Text 4</p>
            <p className="typo-text-5">Text 5</p>
            <p className="typo-numbers">Numbers 1234567890</p>
            <p className="typo-button">Button</p>
            <a href="#" className="typo-link-1">
              Link
            </a>
          </div>
        </Section>

        <Section title="Colour">
          <div className="flex flex-col gap-8">
            {COLOUR_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <p className="typo-text-3">{group.title}</p>
                <div className="flex flex-wrap">
                  {group.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className={`flex h-20 w-40 flex-col items-end justify-end p-2.5 ${swatch.className}`}
                    >
                      <span className="typo-text-7">{swatch.name}</span>
                      <span className="typo-text-3">{swatch.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Logotype" dark>
          <Logo variant="roskino" />
          <Logo variant="ricm" />
        </Section>

        <Section title="Icons">
          {(Object.keys(ICONS) as IconName[]).map((name) => (
            <div key={name} className="flex w-28 flex-col items-center gap-2 text-center">
              <span
                className={
                  name.startsWith('carousel') ||
                  name.startsWith('triangle') ||
                  name.startsWith('play')
                    ? 'bg-black p-2 text-white'
                    : 'p-2'
                }
              >
                <Icon name={name} />
              </span>
              <span className="text-xs">{name}</span>
            </div>
          ))}
        </Section>

        <Section title="Buttons" dark>
          <div className="flex flex-col gap-4">
            <Button variant="primary">Text</Button>
            <Button variant="secondary">Text</Button>
          </div>
          <PlayButton label="Play" />
          <div className="flex flex-col gap-4 bg-white p-4">
            <RoundButton label="Reset" variant="muted">
              <Icon name="reset" />
            </RoundButton>
            <RoundButton label="Back" variant="muted">
              <Icon name="arrow" />
            </RoundButton>
            <RoundButton label="Previous" variant="ghost">
              <Icon name="arrow-back" />
            </RoundButton>
            <RoundButton label="EN" variant="ghost" className="typo-filter">
              EN
            </RoundButton>
          </div>
          <div className="flex flex-col gap-4">
            <RoundButton label="Previous slide" variant="glass">
              <Icon name="arrow-back" />
            </RoundButton>
            <RoundButton label="Telegram" variant="solid">
              <Icon name="social-telegram" />
            </RoundButton>
            <RoundButton label="Max" variant="solid">
              <Icon name="social-max" />
            </RoundButton>
          </div>
        </Section>

        <Section title="Elements">
          <Pagination
            page={1}
            totalPages={12}
            buildHref={(page) => `/ui-kit?page=${page}`}
            labels={paginationLabels}
          />
          <Person
            name="Name Surname"
            position="Director of International Sales and Projects"
            email="m.dorokhina@smfanimation.com"
          />
          <UiKitInteractive />
        </Section>

        <Section title="Elements dark" dark>
          <ContactLink icon="phone" href="tel:+74956905009">
            +7 495 6905009
          </ContactLink>
          <Tag>Musical</Tag>
          <dl className="w-full max-w-167.5">
            <InfoRow label="Age Rating" value="6+" />
          </dl>
        </Section>

        <Section title="Inputs" dark>
          <UiKitFields />
        </Section>
      </main>
    </>
  );
}
