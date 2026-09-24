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

export async function UiKitPage({ params }: UiKitPageProps) {
  if (process.env.NODE_ENV === 'production') notFound();
  await resolveLocale(params);

  return (
    <>
      <Header tone="dark" />
      <main className="page-gutter flex-1 pt-25">
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
          {['bg-black', 'bg-black/50', 'bg-black/20', 'bg-grey', 'bg-grey/50', 'bg-violet'].map(
            (bg) => (
              <div key={bg} className={`h-20 w-40 ${bg}`} title={bg} />
            ),
          )}
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
      </main>
    </>
  );
}
