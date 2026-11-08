import React, { useRef, useState } from 'react';
import { works, workCategories } from '../../data/works';
import WorkCard from './WorkCard';
import SkeletonImage from '../common/SkeletonImage';
import useContentMotion from '../../hooks/useContentMotion';
import useWorkDialogMotion from '../../hooks/useWorkDialogMotion';
const PREVIEW_LIMIT = 3;

export default function Portfolio({ preview = false }) {
  const [category, setCategory] = useState('Semua');
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const resultsRef = useRef(null);
  useContentMotion(resultsRef, [category]);
  const closeWork = useWorkDialogMotion(dialog, active);
  // Keep render keys unique even when entries temporarily share an id in the data file.
  const filtered = works
    .map((work, index) => ({ work, key: `${work.id}-${index}` }))
    .filter(({ work }) => category === 'Semua' || work.category === category);
  const visible = preview ? filtered.slice(0, PREVIEW_LIMIT) : filtered;
  const showAllLink = preview && works.length > PREVIEW_LIMIT;
  const Heading = preview ? 'h2' : 'h1';
  function openWork(work, event) {
    opener.current = event.currentTarget;
    setActive(work);
  }
  function finishClose() {
    setActive(null);
    opener.current?.focus();
  }
  return (
    <section className="section portfolio container" id="case-studies">
      <div className="center">
        <Heading>Karya yang Bisa Anda Lihat.</Heading>
        <p>
          Jelajahi website, desain UI/UX, dan desain grafis. Klik gambar untuk melihat lebih dekat.
        </p>
        <div className="filters" aria-label="Kategori portofolio">
          {workCategories.map((c) => (
            <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div ref={resultsRef} className="portfolio-results">
        {visible.length ? (
          <div className="works-grid">
            {visible.map(({ work, key }) => (
              <WorkCard key={key} work={work} onOpen={openWork} />
            ))}
          </div>
        ) : (
          <div className="works-empty">
            <span className="service-icon" aria-hidden="true">
              ✧
            </span>
            <h3>Karya {category} Segera Hadir.</h3>
            <p>Belum ada gambar karya untuk kategori ini. Silakan jelajahi kategori lain.</p>
            <button className="button outline" onClick={() => setCategory('Semua')}>
              Tampilkan Semua Kategori →
            </button>
          </div>
        )}
      </div>
      {showAllLink && (
        <div className="portfolio-actions">
          <a className="button primary" href="#/karya">
            Lihat Semua Karya <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
      <dialog
        className="work-dialog"
        ref={dialog}
        onClose={finishClose}
        onCancel={(event) => {
          event.preventDefault();
          closeWork();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              closeWork();
          }
        }}
        aria-labelledby="work-dialog-title"
      >
        {active && (
          <>
            <div className="work-dialog-head">
              <div>
                <span className="work-category">
                  {active.demo ? 'Contoh Tampilan · ' : ''}
                  {active.category}/
                </span>
                <h3 id="work-dialog-title">{active.title}</h3>
              </div>
              <button
                className="work-close"
                onClick={closeWork}
                aria-label="Tutup gambar"
                autoFocus
              >
                ×
              </button>
            </div>
            <SkeletonImage
              className="work-preview"
              imageClassName="work-full"
              src={active.image}
              alt={active.alt}
              width="1504"
              height="1128"
            />
            <p className="work-dialog-caption">{active.description}</p>
          </>
        )}
      </dialog>
    </section>
  );
}
