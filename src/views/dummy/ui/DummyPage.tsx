import Image from 'next/image';

export function DummyPage() {
  return (
    <main className="relative isolate flex-1 overflow-hidden bg-white">
      <h1 className="sr-only">Russian International Content Market</h1>
      <Image
        src="/images/dummy.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
    </main>
  );
}
