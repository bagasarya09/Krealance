import React from 'react';

export default function PricingTabs({ tabs, activeTab, onChange }) {
  function handleKeyDown(event, index) {
    let nextIndex;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    onChange(tabs[nextIndex]);
    document.getElementById(`tab-${nextIndex}`)?.focus();
  }

  return (
    <div className="service-tabs" role="tablist" aria-label="Kelompok layanan">
      {tabs.map((tab, index) => (
        <button
          id={`tab-${index}`}
          key={tab}
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls="service-panel"
          onClick={() => onChange(tab)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
