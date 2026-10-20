import Image, { getImageProps, type ImageProps } from 'next/image';
import type { AdaptiveImageAsset } from '@/shared/api';
import { MEDIA_QUERIES } from '@/shared/config';

type AdaptiveImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  image: AdaptiveImageAsset;
  alt?: string;
};

export function AdaptiveImage({ image, alt = image.alt, ...props }: AdaptiveImageProps) {
  const size = props.fill ? {} : { width: image.width, height: image.height };

  if (!image.mobile) return <Image src={image.url} alt={alt} {...size} {...props} />;

  const desktop = getImageProps({ src: image.url, alt, ...size, ...props }).props;
  const mobile = getImageProps({
    src: image.mobile.url,
    alt,
    ...(props.fill ? {} : { width: image.mobile.width, height: image.mobile.height }),
    ...props,
  }).props;

  return (
    <picture>
      <source
        media={MEDIA_QUERIES.md}
        srcSet={desktop.srcSet}
        sizes={desktop.sizes}
        width={desktop.width}
        height={desktop.height}
      />
      <img {...mobile} alt={alt} />
    </picture>
  );
}
