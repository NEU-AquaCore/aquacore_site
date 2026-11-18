import { useState, useEffect } from "react";
import { useElementActivity } from '../hooks/useElementActivity';

function isVideoMedia(media) {
  return media.type === "video" || /\.(mp4|webm|ogg)$/i.test(media.src);
}

export default function ImageCarousel({
  images = [],
  autoPlay = 4000,
  onMediaClick,
}) {
  const [idx, setIdx] = useState(0);
  const { ref, isActive } = useElementActivity();
  const slides = images.map((image) => (
    typeof image === "string" ? { src: image } : image
  ));

  useEffect(() => {
    if (autoPlay <= 0 || slides.length <= 1 || !isActive) return;

    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % slides.length);
    }, autoPlay);

    return () => clearInterval(interval);
  }, [slides.length, autoPlay, isActive]);

  if (!slides.length) return null;

  const slide = slides[idx];
  const MediaContainer = onMediaClick ? "button" : "div";
  const mediaButtonProps = onMediaClick ? {
    type: "button",
    onClick: () => onMediaClick(slide),
    "aria-label": `Open slide ${idx + 1}`,
  } : {};

  return (
    <div ref={ref} className="w-full max-w-lg overflow-hidden rounded-xl border border-white/15 bg-black/30">
      {/* Current Image */}
      <div className="relative aspect-video bg-black/30">
        <MediaContainer
          {...mediaButtonProps}
          className={`absolute inset-0 w-full h-full ${onMediaClick ? "cursor-zoom-in" : ""}`}
        >
          {isVideoMedia(slide) ? (
            <video
              src={slide.src}
              className="w-full h-full object-contain"
              muted
              playsInline
              preload="none"
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.alt ?? `Slide ${idx + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
            />
          )}
        </MediaContainer>

        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === idx ? "bg-blue-500" : "bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === idx ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {slide.caption && (
        <div className="bg-black/65 px-4 py-3 text-center text-sm sm:text-base text-white">
          {slide.caption}
        </div>
      )}
    </div>
  );
}
