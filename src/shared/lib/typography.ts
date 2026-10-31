const NBSP = ' ';
const SHORT_WORD = /(?<=^|[\s(«„“"'-])([a-zа-яё]{1,2}) /giu;
const DASH = / ([—–])/g;
const MACHINE_KEYS = new Set([
  'id',
  'slug',
  'value',
  'url',
  'href',
  'type',
  'kind',
  'icon',
  'token',
  'email',
]);

const SOFT_HYPHEN = String.fromCharCode(0xad);
const LETTER = '[а-яё]';
const VOWEL = '[аеёиоуыэюя]';
const CONSONANT = '[бвгджзклмнпрстфхцчшщ]';
const SIGN = '[йъь]';
const SYLLABLE_BREAKS = [
  `(${SIGN})(${LETTER}${LETTER})`,
  `(${VOWEL})(${VOWEL}${LETTER})`,
  `(${VOWEL}${CONSONANT})(${CONSONANT}${VOWEL})`,
  `(${CONSONANT}${VOWEL})(${CONSONANT}${VOWEL})`,
  `(${VOWEL}${CONSONANT})(${CONSONANT}${CONSONANT}${VOWEL})`,
  `(${VOWEL}${CONSONANT}${CONSONANT})(${CONSONANT}${CONSONANT}${VOWEL})`,
].map((pattern) => new RegExp(pattern, 'giu'));

export function insertSoftHyphens(word: string): string {
  return SYLLABLE_BREAKS.reduce(
    (result, pattern) => result.replace(pattern, `$1${SOFT_HYPHEN}$2`),
    word,
  );
}

export function bindShortWords(text: string): string {
  return text.replace(SHORT_WORD, `$1${NBSP}`).replace(DASH, `${NBSP}$1`);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function bindShortWordsDeep<T>(value: T): T {
  if (typeof value === 'string') return bindShortWords(value) as T;
  if (Array.isArray(value)) return value.map((item) => bindShortWordsDeep(item)) as T;
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        MACHINE_KEYS.has(key) ? item : bindShortWordsDeep(item),
      ]),
    ) as T;
  }
  return value;
}
