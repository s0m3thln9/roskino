export type LngLat = [number, number];

export type YMapBehavior = 'drag' | 'scrollZoom' | 'dblClick' | 'pinchZoom';

type YMapEntity = object;

export type YMapInstance = {
  addChild(child: YMapEntity): YMapInstance;
  update(props: { behaviors?: YMapBehavior[] }): void;
  destroy(): void;
};

type Ymaps3 = {
  ready: Promise<void>;
  YMap: new (
    element: HTMLElement,
    props: { location: { center: LngLat; zoom: number }; behaviors: YMapBehavior[] },
  ) => YMapInstance;
  YMapDefaultSchemeLayer: new (props: object) => YMapEntity;
  YMapDefaultFeaturesLayer: new (props: object) => YMapEntity;
  YMapMarker: new (props: { coordinates: LngLat }, element: HTMLElement) => YMapEntity;
};

const SCRIPT_URL = 'https://api-maps.yandex.ru/v3/';

let loading: Promise<Ymaps3> | null = null;

export function loadYandexMaps(apiKey: string, lang: string): Promise<Ymaps3> {
  if (loading) return loading;

  loading = new Promise<Ymaps3>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${SCRIPT_URL}?${new URLSearchParams({ apikey: apiKey, lang })}`;
    script.async = true;
    script.onload = () => {
      const ymaps3 = (window as Window & { ymaps3?: Ymaps3 }).ymaps3;
      if (!ymaps3) {
        reject(new Error('Yandex Maps API is unavailable'));
        return;
      }
      ymaps3.ready.then(() => resolve(ymaps3), reject);
    };
    script.onerror = () => reject(new Error('Failed to load Yandex Maps API'));
    document.head.append(script);
  });

  loading.catch(() => {
    loading = null;
  });

  return loading;
}
