import React, { useRef, useState, useEffect } from 'react';
import { works, workCategories } from '../../data/works';
import WorkCard from './WorkCard';
import SkeletonImage from '../common/SkeletonImage';
export default function Portfolio() {
  const [category, setCategory] = useState('Semua');
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const visible = works.filter((w) => category === 'Semua' || w.category === category);
  useEffect(() => {
    if (active && !dialog.current.open) dialog.current.showModal();
  }, [active]);
  function openWork(work, event) {
    opener.current = event.currentTarget;
    setActive(work);
  }
  function closeWork() {
    dialog.current.close();
  }
  function finishClose() {
    setActive(null);
    opener.current?.focus();
  }
  return (
    <section className="section portfolio container" id="case-studies">
      <div className="center">
        <h2>Karya yang Bisa Anda Lihat.</h2>
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
      {visible.length ? (
        <div className="works-grid">
          {visible.map((w) => (
            <WorkCard key={w.id} work={w} onOpen={openWork} />
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
            Lihat Semua Karya →
          </button>
        </div>
      )}
      <dialog
        className="work-dialog"
        ref={dialog}
        onClose={finishClose}
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
