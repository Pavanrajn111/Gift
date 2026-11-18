import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { getBoxSVG, getFlowerSVG, RIBBON_SVG } from '../../utils/charisArt';

export const Hero: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroGiftRef = useRef<HTMLDivElement>(null);
  const flower1Ref = useRef<HTMLDivElement>(null);
  const flower2Ref = useRef<HTMLDivElement>(null);
  const ribbon1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mount SVG art
    if (heroGiftRef.current) heroGiftRef.current.innerHTML = getBoxSVG('hg');
    if (flower1Ref.current) flower1Ref.current.innerHTML = getFlowerSVG('#e7a79a', '#D9C6A7');
    if (flower2Ref.current) flower2Ref.current.innerHTML = getFlowerSVG('#f2dcc0', '#A53E35');
    if (ribbon1Ref.current) ribbon1Ref.current.innerHTML = RIBBON_SVG;

    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Intro entrance animation
    if (!reduced) {
      gsap.fromTo(
        '.wi',
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        ['#h-eye', '#h-lead', '#h-cta'],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, delay: 0.3, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '#stage',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, delay: 0.2, ease: 'power3.out', clearProps: 'all' }
      );
    }

    // Parallax & magnetic buttons
    const stage = stageRef.current;
    if (fine && !reduced && stage) {
      const handleMouseMove = (e: MouseEvent) => {
        const r = stage.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);

        const layers = stage.querySelectorAll<HTMLElement>('.l');
        layers.forEach((el) => {
          const depth = parseFloat(el.dataset.d || '0.02');
          gsap.to(el, {
            x: dx * depth,
            y: dy * depth,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const magButtons = document.querySelectorAll<HTMLElement>('.mag');
      const cleanups: Array<() => void> = [];

      magButtons.forEach((b) => {
        const onBtnMove = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          gsap.to(b, {
            x: (e.clientX - r.left - r.width / 2) * 0.22,
            y: (e.clientY - r.top - r.height / 2) * 0.3,
            duration: 0.3,
          });
        };
        const onBtnLeave = () => {
          gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        };
        b.addEventListener('mousemove', onBtnMove);
        b.addEventListener('mouseleave', onBtnLeave);
        cleanups.push(() => {
          b.removeEventListener('mousemove', onBtnMove);
          b.removeEventListener('mouseleave', onBtnLeave);
        });
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cleanups.forEach((c) => c());
        if (stage) {
          const layers = stage.querySelectorAll<HTMLElement>('.l');
          layers.forEach((el) => gsap.killTweensOf(el));
        }
      };
    }
  }, []);

  const words = [
    { text: 'Gifts', em: false },
    { text: 'that', em: false },
    { text: 'say', em: false },
    { text: 'what', em: false },
    { text: 'words', em: true },
    { text: "can't.", em: false },
  ];

  return (
    <header className="hero wrap" id="hero">
      <div>
        <div className="eyebrow" id="h-eye">
          The art of thoughtful giving
        </div>
        <h1 id="h1" aria-label="Gifts that say what words can't.">
          {words.map((w, i) => (
            <span className="w" key={i} aria-hidden="true">
              <span className="wi" style={{ display: 'inline-block' }}>
                {w.em ? <em>{w.text}</em> : w.text}
              </span>
            </span>
          ))}
        </h1>
        <p className="lead" id="h-lead">
          Discover meaningful gifts, thoughtfully curated to celebrate the people who make every moment special.
        </p>
        <div className="cta-row" id="h-cta">
          <Link className="btn mag" to="/consultation">
            Find Their Perfect Gift
          </Link>
          <Link className="btn ghost mag" to="/discover">
            Explore Collections
          </Link>
        </div>
      </div>

      <div className="stage" id="stage" ref={stageRef} aria-hidden="true">
        <div className="l blob" data-d="0.012" />
        <div className="l dot" style={{ width: '14px', height: '14px', left: '10%', top: '60%' }} data-d="0.03" />
        <div
          className="l dot"
          style={{ width: '9px', height: '9px', right: '12%', top: '40%', background: 'var(--rose)' }}
          data-d="0.045"
        />
        <div className="l fl1" data-d="0.05" id="flower1" ref={flower1Ref} />
        <div className="l rib" data-d="0.04" id="ribbon1" ref={ribbon1Ref} />
        <div className="l main" data-d="0.025" id="heroGift" ref={heroGiftRef} />
        <div className="l fl2" data-d="0.06" id="flower2" ref={flower2Ref} />
        <div className="l tag" data-d="0.035">
          <small>For Meera</small>
          <div className="hand">Happy birthday, always.</div>
        </div>
      </div>
    </header>
  );
};
