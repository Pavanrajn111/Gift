import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOccasionImage } from '../../utils/imageRegistry';

interface OccasionDef {
  key: string;
  slug: string;
  desc: string;
  c1: string;
  c2: string;
  fx: 'balloon' | 'heart' | 'petal' | 'glow' | 'butterfly';
}

export const OccasionSection: React.FC = () => {
  const [activeOccasion, setActiveOccasion] = useState<string | null>('Birthday');

  const OCCASIONS: OccasionDef[] = [
    {
      key: 'Birthday',
      slug: 'birthday',
      desc: 'Candles, keepsakes and small surprises for another year around the sun.',
      c1: '#3a1f2b',
      c2: '#c4566b',
      fx: 'balloon',
    },
    {
      key: 'Anniversary',
      slug: 'anniversary',
      desc: 'Warm, lasting gifts for the years you have built together.',
      c1: '#3b1a1a',
      c2: '#b5483d',
      fx: 'heart',
    },
    {
      key: 'Thank You',
      slug: 'thank_you',
      desc: 'Gentle gestures that say it properly.',
      c1: '#1f2f27',
      c2: '#6f9a7e',
      fx: 'petal',
    },
    {
      key: 'Housewarming',
      slug: 'housewarming',
      desc: 'Things that make a new place feel like home.',
      c1: '#3a2a14',
      c2: '#d2994a',
      fx: 'glow',
    },
    {
      key: 'Farewell',
      slug: 'farewell',
      desc: 'Something to carry along when the goodbye is hard.',
      c1: '#1b2733',
      c2: '#6d8fb0',
      fx: 'butterfly',
    },
  ];

  const renderFx = (kind: OccasionDef['fx']) => {
    const items = [];
    const n = kind === 'glow' ? 10 : 7;
    for (let i = 0; i < n; i++) {
      const left = (i * 14 + 5) % 92;
      const top = (i * 12 + 10) % 85;
      const delay = (i * 0.7).toFixed(1);
      const duration = (6 + (i % 4) * 2).toFixed(1);

      if (kind === 'balloon') {
        const bg = ['#e8869a', '#f4c56a', '#8cc0e0', '#FAF5EC'][i % 4];
        items.push(
          <i
            key={i}
            style={{
              left: `${left}%`,
              bottom: '-40px',
              width: '20px',
              height: '26px',
              borderRadius: '50%',
              background: bg,
              opacity: 0.85,
              animation: `rise ${duration}s ${delay}s linear infinite`,
            }}
          />
        );
      } else if (kind === 'heart') {
        items.push(
          <i
            key={i}
            style={{
              left: `${left}%`,
              bottom: '-30px',
              animation: `rise ${duration}s ${delay}s linear infinite`,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M12 21S3 15 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 15 12 21 12 21z"
                fill="#f0a39a"
              />
            </svg>
          </i>
        );
      } else if (kind === 'petal') {
        items.push(
          <i
            key={i}
            style={{
              left: `${left}%`,
              top: '-20px',
              width: '12px',
              height: '16px',
              borderRadius: '100% 0',
              background: '#f3b8c4',
              animation: `fall ${duration}s ${delay}s linear infinite`,
            }}
          />
        );
      } else if (kind === 'glow') {
        items.push(
          <i
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#ffd98a',
              boxShadow: '0 0 16px #ffd98a',
              animation: `glow ${duration}s ${delay}s ease-in-out infinite`,
            }}
          />
        );
      } else if (kind === 'butterfly') {
        items.push(
          <i
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `drift ${duration}s ${delay}s ease-in-out infinite`,
            }}
          >
            <svg width="24" height="18" viewBox="0 0 22 14">
              <path d="M11 7L1 1L3 12ZM11 7L21 1L19 12Z" fill="rgba(255,255,255,0.85)" />
            </svg>
          </i>
        );
      }
    }
    return items;
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setActiveOccasion('Birthday');
    }
  }, []);

  return (
    <section id="occasions" className="full sec-pad">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Shop by occasion</div>
            <h2 style={{ marginTop: '0.8rem' }}>Every occasion deserves something meaningful.</h2>
          </div>
          <p>Discover thoughtful gifts for the moments worth celebrating.</p>
        </div>

        <div
          className="occ"
          id="occ"
          onMouseLeave={() => {
            if (window.innerWidth >= 768) {
              // keep active or set default
            }
          }}
        >
          {OCCASIONS.map((o) => {
            const isOpen = activeOccasion === o.key;
            const imgSrc = getOccasionImage(o.slug);

            return (
              <div
                key={o.key}
                className={`op ${isOpen ? 'on' : ''}`}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                style={{
                  ['--c1' as any]: o.c1,
                  ['--c2' as any]: o.c2,
                }}
                onClick={() => {
                  if (window.innerWidth < 768 && isOpen) {
                    setActiveOccasion(null);
                  } else {
                    setActiveOccasion(o.key);
                  }
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 768) setActiveOccasion(o.key);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveOccasion(isOpen ? null : o.key);
                  }
                }}
              >
                {/* Background Editorial Image */}
                <img
                  src={imgSrc}
                  alt={o.key}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none transition-transform duration-700 hover:scale-105"
                />

                {/* Particle Animation FX */}
                <div className="fx" aria-hidden="true">
                  {renderFx(o.fx)}
                </div>

                {/* Content Body */}
                <div className="body">
                  <h3>{o.key}</h3>
                  <div className="more">
                    <p>{o.desc}</p>
                    <Link
                      className="seelink"
                      to={`/discover?occasion=${o.slug}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      See gifts ↗
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
