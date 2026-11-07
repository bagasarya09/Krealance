import React, { useCallback, useState } from 'react';

function ImageFrame({ src, alt, className = '', imageClassName = '', ...imageProps }) {
  const [status, setStatus] = useState('loading');

  // Gambar dari cache dapat selesai sebelum event load diterima React.
  const imageRef = useCallback((image) => {
    if (image?.complete) {
      setStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
    }
  }, []);

  return (
    <span
      className={`image-frame ${className}`}
      data-status={status}
      aria-busy={status === 'loading'}
    >
      {status === 'loading' && <span className="image-skeleton" aria-hidden="true" />}
      <img
        {...imageProps}
        ref={imageRef}
        className={`skeleton-image ${imageClassName}`}
        src={src}
        alt={alt}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {status === 'error' && (
        <span className="image-fallback" role="img" aria-label={alt}>
          Gambar belum tersedia
        </span>
      )}
    </span>
  );
}

export default function SkeletonImage(props) {
  // Mulai ulang status ketika sumber gambar berubah.
  return <ImageFrame key={props.src} {...props} />;
}
