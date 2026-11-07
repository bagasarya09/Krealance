import React from 'react';
import SkeletonImage from '../common/SkeletonImage';

export default function WorkCard({ work, onOpen }) {
  return (
    <article className="work-card">
      <button
        className="work-image"
        onClick={(e) => onOpen(work, e)}
        aria-label={'Perbesar gambar ' + work.title}
      >
        <SkeletonImage src={work.image} alt={work.alt} loading="lazy" width="1504" height="1128" />
        <span className="work-zoom" aria-hidden="true">
          Lihat gambar ↗
        </span>
      </button>
      <div className="work-info">
        <span className="work-category">{work.category}</span>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <div className="tags">
          {work.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {work.url && (
          <a
            className="button outline work-link"
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Kunjungi proyek ↗
          </a>
        )}
      </div>
    </article>
  );
}
