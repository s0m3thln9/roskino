export type AuthLabels = {
  title: string;
  intro: string;
  login: string;
  password: string;
  submit: string;
  cancel: string;
  close: string;
  forgot: string;
  error: string;
  showPassword: string;
  hidePassword: string;
  welcomeBack: string;
  recoverTitle: string;
  recoverDescription: string;
  recoverHint: string;
  fullName: string;
  companyName: string;
  email: string;
  clear: string;
  send: string;
  fullNameError: string;
  companyNameError: string;
  emailError: string;
  recoverError: string;
  sentTitle: string;
  sentText: string;
};

export const AUTH_LABEL_KEYS = [
  'title',
  'intro',
  'login',
  'password',
  'submit',
  'cancel',
  'close',
  'forgot',
  'error',
  'showPassword',
  'hidePassword',
  'welcomeBack',
  'recoverTitle',
  'recoverDescription',
  'recoverHint',
  'fullName',
  'companyName',
  'email',
  'clear',
  'send',
  'fullNameError',
  'companyNameError',
  'emailError',
  'recoverError',
  'sentTitle',
  'sentText',
] as const satisfies readonly (keyof AuthLabels)[];
