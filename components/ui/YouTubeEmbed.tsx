// Responsive 16:9 YouTube embed. Replaces the old self-hosted VideoPlayer on
// the About page — YouTube's player supplies its own controls, so this is
// just a plain iframe in a sized/rounded frame, not a custom player.
export interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
}

export default function YouTubeEmbed({ youtubeId, title }: YouTubeEmbedProps) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
