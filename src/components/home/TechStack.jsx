import React from 'react';
import nextLogo from '../../assets/brands/nextdotjs.svg';
import reactLogo from '../../assets/brands/react.svg';
import tailwindLogo from '../../assets/brands/tailwindcss.svg';
import canvaLogo from '../../assets/brands/canva.svg';
import figmaLogo from '../../assets/brands/figma.svg';

const technologies = [
  { name: 'Next.js', logo: nextLogo },
  { name: 'React', logo: reactLogo },
  { name: 'Tailwind', logo: tailwindLogo },
  { name: 'Canva', logo: canvaLogo },
  { name: 'Figma', logo: figmaLogo },
];

export default function TechStack() {
  return (
    <div className="tech">
      <p>Teknologi modern. Pengerjaan yang matang.</p>
      <div className="tech-logos" aria-label="Teknologi dan alat desain">
        {technologies.map(({ name, logo }) => (
          <span key={name}>
            <img src={logo} alt="" aria-hidden="true" width="20" height="20" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
