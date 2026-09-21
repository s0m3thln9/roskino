export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { registerMocks } = await import('@/app/mocks');
    registerMocks();
  }
}
