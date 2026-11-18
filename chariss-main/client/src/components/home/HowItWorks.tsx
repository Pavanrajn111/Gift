import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductArtSVG } from '../../utils/charisArt';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [sealOpen, setSealOpen] = useState(false);
  const curwrapRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const gcRef = useRef<HTMLDivElement>(null);
  const visTlRef = useRef<gsap.core.Timeline | null>(null);

  const HAND_MSG = 'Meera, every year you teach me what it means to laugh. This one is for you.';
  const POS = [
    [0, 0],
    [52, 6],
    [4, 34],
    [50, 40],
    [0, 68],
    [52, 72],
  ];
  const SEL = [1, 2, 5];
  const PCT = [94, 89, 82];

  const SAMPLE_MINI_GIFTS = [
    { kind: 'candle', name: 'Amber Candle' },
    { kind: 'journal', name: 'Linen Journal' },
    { kind: 'scarf', name: 'Silk Scarf' },
    { kind: 'mug', name: 'Ceramic Mugs' },
    { kind: 'plant', name: 'Little Plant' },
    { kind: 'pendant', name: 'Fine Keepsake' },
  ];

  const runVisualization = (stepIndex: number) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (visTlRef.current) {
      visTlRef.current.kill();
    }
    const tl = gsap.timeline();
    visTlRef.current = tl;

    if (stepIndex === 0) {
      tl.fromTo('#pc', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' })
        .fromTo(['#av', '#pname'], { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, '-=0.2')
        .fromTo(
          '#pc .chip',
          { opacity: 0, y: 12, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 0.5, ease: 'back.out(2)' }
        );
    } else if (stepIndex === 1) {
      const cw = curwrapRef.current;
      if (cw) {
        const miniCards = Array.from(cw.querySelectorAll<HTMLElement>('.mini'));
        const dimCards = miniCards.filter((_, k) => !SEL.includes(k));
        const selCards = SEL.map((k) => miniCards[k]).filter(Boolean);

        gsap.set(miniCards, {
          left: (k: number) => `${POS[k][0]}%`,
          top: (k: number) => `${POS[k][1]}%`,
          rotation: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
        });

        const mrSpans = cw.querySelectorAll<HTMLElement>('.mr span');
        mrSpans.forEach((s) => {
          s.textContent = '0%';
        });

        tl.from(miniCards, { opacity: 0, y: 35, duration: 0.5, stagger: 0.08 })
          .to(miniCards, {
            left: (k: number) => `${POS[(k + 2) % 6][0]}%`,
            top: (k: number) => `${POS[(k + 2) % 6][1]}%`,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power2.inOut',
          }, '+=0.2')
          .to(dimCards, { opacity: 0.14, scale: 0.82, duration: 0.6 }, '+=0.1');

        if (selCards[0]) tl.to(selCards[0], { left: '2%', top: '24%', rotation: -6, scale: 1.06, zIndex: 3, duration: 0.8 }, '<');
        if (selCards[1]) tl.to(selCards[1], { left: '28%', top: '6%', rotation: 0, scale: 1.12, zIndex: 5, duration: 0.8 }, '<0.1');
        if (selCards[2]) tl.to(selCards[2], { left: '54%', top: '26%', rotation: 6, scale: 1.06, zIndex: 3, duration: 0.8 }, '<0.1');

        const activeMrs = miniCards.filter((_, k) => SEL.includes(k)).map((el) => el.querySelector('.mr') as HTMLElement).filter(Boolean);
        tl.to(activeMrs, { opacity: 1, height: 46, marginTop: 6, duration: 0.4 }, '-=0.2');

        selCards.forEach((el, n) => {
          const valObj = { v: 0 };
          const mr = el.querySelector('.mr') as HTMLElement;
          if (mr) {
            tl.to(valObj, {
              v: PCT[n],
              duration: 1.2,
              ease: 'power2.out',
              onUpdate() {
                mr.style.setProperty('--p', String(valObj.v));
                if (mr.firstChild) mr.firstChild.textContent = `${Math.round(valObj.v)}%`;
              },
            }, n ? '<' : '-=0.1');
          }
        });
      }
    } else if (stepIndex === 2) {
      const gc = gcRef.current;
      const hand = handRef.current;
      if (gc && hand) {
        const sig = gc.querySelector<HTMLElement>('.sig');
        const numObj = { n: 0 };
        gc.classList.remove('open', 'wrapped');
        hand.textContent = '';
        if (sig) sig.style.opacity = '0';

        tl.fromTo(gc, { opacity: 0, y: 30, rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.7 })
          .call(() => gc.classList.add('open'), undefined, '+=0.4')
          .to(numObj, {
            n: HAND_MSG.length,
            duration: 2.4,
            ease: 'none',
            onUpdate() {
              hand.textContent = HAND_MSG.slice(0, Math.round(numObj.n));
            },
          }, '+=0.8')
          .call(() => { if (sig) sig.style.opacity = '1'; }, undefined, '+=0.1')
          .call(() => gc.classList.remove('open'), undefined, '+=1.2')
          .call(() => gc.classList.add('wrapped'), undefined, '+=0.8')
          .to(gc, { rotation: -2, y: -4, duration: 0.6, ease: 'back.out(2)' });
      }
    }

    if (reduced) {
      tl.progress(1);
    }
  };

  const handleStepChange = (i: number) => {
    setActiveStep(i);
    runVisualization(i);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    runVisualization(0);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 861px)', () => {
      const steps = document.querySelectorAll<HTMLElement>('.step');
      const triggers = Array.from(steps).map((s, i) =>
        ScrollTrigger.create({
          trigger: s,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              handleStepChange(i);
            }
          },
        })
      );

      const firstTrigger = ScrollTrigger.create({
        trigger: '#how',
        start: 'top 65%',
        once: true,
        onEnter: () => {
          handleStepChange(0);
        },
      });

      return () => {
        triggers.forEach((t) => t.kill());
        firstTrigger.kill();
      };
    });

    return () => {
      mm.revert();
      if (visTlRef.current) visTlRef.current.kill();
    };
  }, []);

  const openSeal = () => {
    setSealOpen(true);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      gsap.fromTo('#wax', { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2)' });
      gsap.from('#sealh', { y: 20, opacity: 0, delay: 0.4, duration: 0.6 });
      gsap.from('#seal .chip', { y: 12, opacity: 0, stagger: 0.1, delay: 0.7, duration: 0.4 });
    }
  };

  const closeSeal = () => {
    setSealOpen(false);
  };

  return (
    <section id="how" className="full sec-pad">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">How CHARIS works</div>
            <h2 style={{ marginTop: '0.8rem' }}>Three steps to a gift that lands.</h2>
          </div>
          <p>
            Scroll through the process. On phones this becomes a simple stacked layout with no pinning.
          </p>
        </div>

        <div className="how" id="howgrid">
          <div className="steps">
            {/* Step 1 */}
            <div
              className={`step ${activeStep === 0 ? 'on' : ''}`}
              data-i="0"
              onClick={() => handleStepChange(0)}
            >
              <span className="n">Step one</span>
              <h3>Every great gift starts with understanding someone.</h3>
              <p>Tell us about the person, the occasion, and the feeling you want your gift to express.</p>
              <small>The consultation has five steps: relationship, occasion, desired emotion, budget and exclusions.</small>
            </div>

            {/* Step 2 */}
            <div
              className={`step ${activeStep === 1 ? 'on' : ''}`}
              data-i="1"
              onClick={() => handleStepChange(1)}
            >
              <span className="n">Step two</span>
              <h3>Thoughtful choices, brought together for them.</h3>
              <p>Our intelligent curation experience helps discover gifts that reflect their personality and your intentions.</p>
              <small>The 94% shown is an illustration of the animation, reflecting deep sentiment alignment.</small>
            </div>

            {/* Step 3 */}
            <div
              className={`step ${activeStep === 2 ? 'on' : ''}`}
              data-i="2"
              onClick={() => handleStepChange(2)}
            >
              <span className="n">Step three</span>
              <h3>Make your gift unmistakably personal.</h3>
              <p>Add a heartfelt message and thoughtful finishing touches that make the moment unforgettable.</p>
              <small>Gift Studio: pick a template, set the tone, write the message, preview live.</small>
              <button className="seal-btn" id="sealbtn" type="button" onClick={openSeal}>
                Preview the consultation completion moment
              </button>
            </div>
          </div>

          {/* Sticky Visuals for Desktop */}
          <div className="sticky" id="sticky">
            {/* V0 - Profile Card */}
            <div className={`vis ${activeStep === 0 ? 'on' : ''}`} id="v0">
              <div className="pcard" id="pc">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="avatar" id="av">
                    M
                  </div>
                  <div>
                    <div className="eyebrow">Recipient</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.7rem', lineHeight: 1.1 }} id="pname">
                      Meera
                    </div>
                  </div>
                </div>
                <div className="chips">
                  <span className="chip">
                    <b>Relationship</b>Sister
                  </span>
                  <span className="chip">
                    <b>Occasion</b>Birthday
                  </span>
                  <span className="chip hot">
                    <b style={{ color: '#f3c9c2' }}>Feeling</b>Joyful
                  </span>
                </div>
                <div className="chips">
                  <span className="chip">Budget ₹500 – ₹3,500</span>
                  <span className="chip">Loves: tea, journalling</span>
                </div>
              </div>
            </div>

            {/* V1 - Reorganizing Match Cards */}
            <div className={`vis ${activeStep === 1 ? 'on' : ''}`} id="v1">
              <div className="cur" id="curwrap" ref={curwrapRef}>
                {SAMPLE_MINI_GIFTS.map((p, k) => (
                  <div
                    key={k}
                    className="mini"
                    data-k={k}
                    style={{ left: `${POS[k][0]}%`, top: `${POS[k][1]}%` }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: getProductArtSVG(p.kind).replace('<svg ', '<svg style="height:62px" '),
                      }}
                    />
                    <div>{p.name}</div>
                    <div className="mr">
                      <span>0%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* V2 - 3D Envelope & Handwritten Note */}
            <div className={`vis ${activeStep === 2 ? 'on' : ''}`} id="v2">
              <div className="gc" id="gc" ref={gcRef}>
                <div className="band" />
                <div className="gci">
                  <div className="gfront">CHARIS</div>
                  <div className="gback">
                    <div className="inner">
                      <div className="eyebrow">Your message</div>
                      <div className="hand" id="hand" ref={handRef}>
                        {HAND_MSG}
                      </div>
                      <div className="sig">with all my love, Ananya</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Moment Modal */}
      <div className={`seal-modal ${sealOpen ? 'on' : ''}`} id="seal" role="dialog" aria-label="Consultation complete">
        <div>
          <div className="wax" id="wax">
            C
          </div>
          <h2 id="sealh">Your thoughtful journey begins here.</h2>
          <div className="chips">
            <span className="chip">Sister</span>
            <span className="chip">Birthday</span>
            <span className="chip">Joyful</span>
            <span className="chip">₹500 – ₹3,500</span>
          </div>
          <p className="note" style={{ color: '#a79b86', marginTop: '1.4rem' }}>
            Personalized sentiment profile calibrated for authentic connection.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            <button
              className="btn gold"
              id="sealclose"
              type="button"
              onClick={() => {
                closeSeal();
                navigate('/consultation');
              }}
            >
              Start Free Consultation
            </button>
            <button
              className="btn ghost"
              style={{ color: '#FAF5EC', borderColor: 'rgba(255,255,255,0.4)' }}
              type="button"
              onClick={closeSeal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
