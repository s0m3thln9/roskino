import type { VideoHTMLAttributes } from 'react';
import type { VideoAsset, VideoFiles } from '@/shared/api';
import { MEDIA_QUERIES } from '@/shared/config';

const FORMATS = [
  ['mp4', 'video/mp4'],
  ['webm', 'video/webm'],
  ['ogv', 'video/ogg'],
] as const;

type VideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'children'> & {
  video: VideoAsset;
};

function renderSources(files: VideoFiles | undefined, media?: string) {
  if (!files) return [];
  return FORMATS.flatMap(([format, type]) => {
    const src = files[format];
    return src
      ? [<source key={`${media ?? 'any'}-${format}`} src={src} type={type} media={media} />]
      : [];
  });
}

export function Video({ video, ...props }: VideoProps) {
  const { desktop, mobile } = video.sources ?? {};

  return (
    <video {...props}>
      {renderSources(desktop, mobile ? MEDIA_QUERIES.md : undefined)}
      {renderSources(mobile)}
      <source src={video.url} />
    </video>
  );
}
