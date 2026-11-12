'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib';
import { loadYandexMaps, type YMapBehavior, type YMapInstance } from '../lib/loadYandexMaps';

const MOUSE_BEHAVIORS: YMapBehavior[] = ['drag', 'dblClick', 'pinchZoom'];
const TOUCH_BEHAVIORS: YMapBehavior[] = ['dblClick', 'pinchZoom'];

type FooterMapProps = {
  apiKey: string;
  lang: string;
  lat: number;
  lng: number;
  zoom: number;
  className?: string;
};

export function FooterMap({ apiKey, lang, lat, lng, zoom, className }: FooterMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: YMapInstance | null = null;
    let cancelled = false;
    const touch = !window.matchMedia('(hover: hover)').matches;
    const idleBehaviors = touch ? TOUCH_BEHAVIORS : MOUSE_BEHAVIORS;

    loadYandexMaps(apiKey, lang)
      .then((ymaps3) => {
        if (cancelled) return;
        const pin = document.createElement('span');
        pin.className =
          'block h-10 w-8 -translate-x-1/2 -translate-y-full bg-black [mask:url(/icons/pin.svg)_center/100%_100%_no-repeat]';
        map = new ymaps3.YMap(container, {
          location: { center: [lng, lat], zoom },
          behaviors: idleBehaviors,
        });
        map.addChild(new ymaps3.YMapDefaultSchemeLayer({}));
        map.addChild(new ymaps3.YMapDefaultFeaturesLayer({}));
        map.addChild(new ymaps3.YMapMarker({ coordinates: [lng, lat] }, pin));
        setReady(true);
      })
      .catch(() => setReady(false));

    const activate = () => map?.update({ behaviors: [...idleBehaviors, 'scrollZoom'] });
    const deactivate = () => map?.update({ behaviors: idleBehaviors });
    if (!touch) {
      container.addEventListener('pointerdown', activate);
      container.addEventListener('pointerleave', deactivate);
    }

    return () => {
      cancelled = true;
      container.removeEventListener('pointerdown', activate);
      container.removeEventListener('pointerleave', deactivate);
      map?.destroy();
      setReady(false);
    };
  }, [apiKey, lang, lat, lng, zoom]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'isolate text-black transition-opacity',
        ready ? 'opacity-100' : 'pointer-events-none opacity-0',
        className,
      )}
    />
  );
}
