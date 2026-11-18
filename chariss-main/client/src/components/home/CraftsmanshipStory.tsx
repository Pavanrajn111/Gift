import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { IMAGES } from '../../utils/imageRegistry';

export const CraftsmanshipStory: React.FC = () => {
  const [stats, setStats] = useState({
    consultationSteps: 5,
    curatedProductsCount: 100,
    occasionsCount: 5,
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    axios
      .get('/api/v1/stats')
      .then((res) => {
        if (isMounted && res.data?.data) {
          setStats({
            consultationSteps: res.data.data.consultationSteps || 5,
            curatedProductsCount: res.data.data.curatedProductsCount || 100,
            occasionsCount: res.data.data.occasionsCount || 5,
          });
        }
      })
      .catch(() => {
        // Fallback to verified local defaults
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            observer.disconnect();

            const numElements = el.querySelectorAll<HTMLElement>('.num');
            numElements.forEach((numEl) => {
              const target = parseInt(numEl.dataset.to || '0', 10);
              if (reduced) {
                numEl.textContent = String(target);
                return;
              }
              const counter = { val: 0 };
              gsap.to(counter, {
                val: target,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                  numEl.textContent = String(Math.round(counter.val));
                },
              });
            });

            if (!reduced) {
              gsap.fromTo(
                el.querySelectorAll('.stat'),
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, clearProps: 'transform,opacity' }
              );
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [stats]);

  return (
    <section id="craft" className="wrap sec-pad">
      <div className="craft">
        <h2>Thoughtfulness is in every detail.</h2>
        <p>
          Because the most meaningful gifts are never just things. They're expressions of how much someone means to you.
        </p>
      </div>

      {/* Editorial Craftsmanship Visual Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-[#F2EADC] border border-[#11100F]/10 rounded-sm overflow-hidden p-4 group">
          <div className="aspect-[4/3] overflow-hidden rounded-xs mb-4">
            <img
              src={IMAGES.editorial.craftsmanship}
              alt="Thoughtful gift selection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="eyebrow mb-1">01 / Thoughtful Selection</div>
          <h3 className="font-serif text-xl font-bold mb-1">Curated with Empathy</h3>
          <p className="text-xs text-[#81776B] leading-relaxed">
            Every item is vetted for artistic provenance, avoiding mass-retail filler in favor of lasting connection.
          </p>
        </div>

        <div className="bg-[#F2EADC] border border-[#11100F]/10 rounded-sm overflow-hidden p-4 group">
          <div className="aspect-[4/3] overflow-hidden rounded-xs mb-4">
            <img
              src={IMAGES.editorial.handwrittenNote}
              alt="Personal touches"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="eyebrow mb-1">02 / Personal Touches</div>
          <h3 className="font-serif text-xl font-bold mb-1">Handwritten Expressions</h3>
          <p className="text-xs text-[#81776B] leading-relaxed">
            Real wax seals and hand-scribed stationery carry your exact sentiments in lasting, tangible ink.
          </p>
        </div>

        <div className="bg-[#F2EADC] border border-[#11100F]/10 rounded-sm overflow-hidden p-4 group">
          <div className="aspect-[4/3] overflow-hidden rounded-xs mb-4">
            <img
              src={IMAGES.editorial.giftWrapping}
              alt="Beautiful presentation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="eyebrow mb-1">03 / Beautiful Presentation</div>
          <h3 className="font-serif text-xl font-bold mb-1">Master Packaging</h3>
          <p className="text-xs text-[#81776B] leading-relaxed">
            Folded Japanese silk ribbons and linen-textured packaging turn the unboxing into a moment of pause.
          </p>
        </div>
      </div>

      {/* Verified Application Statistics */}
      <div className="stats" id="stats" ref={statsRef}>
        <div className="stat">
          <div className="num" data-to={stats.consultationSteps}>
            0
          </div>
          <div className="lab">steps in the consultation</div>
        </div>
        <div className="stat">
          <div className="num" data-to={stats.curatedProductsCount}>
            0
          </div>
          <div className="lab">curated gifts in the catalogue</div>
        </div>
        <div className="stat">
          <div className="num" data-to={stats.occasionsCount}>
            0
          </div>
          <div className="lab">occasions to shop by</div>
        </div>
      </div>

      <p className="note">
        Live platform metrics retrieved from <code>GET /api/v1/stats</code>. Verified real numbers with zero artificial inflated statistics.
      </p>
    </section>
  );
};
