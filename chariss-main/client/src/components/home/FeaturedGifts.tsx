import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { useBag } from '../../context/BagContext';
import { useWishlist } from '../../context/WishlistContext';
import { CURATED_PRODUCTS } from '../../data/mockData';
import { getProductImage } from '../../utils/imageRegistry';
import { getProductArtSVG } from '../../utils/charisArt';
import type { Product } from '../../types';

export const FeaturedGifts: React.FC = () => {
  const { addToBag, setIsBagOpen } = useBag();
  const { wishlist, toggleWishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>(CURATED_PRODUCTS.slice(0, 6));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const showToastNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  useEffect(() => {
    let isMounted = true;
    axios
      .get('/api/v1/products/featured')
      .then((res) => {
        if (isMounted && res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setProducts(res.data.data);
        }
      })
      .catch(() => {
        // Fallback to local CURATED_PRODUCTS
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentProduct = products[currentIndex] || products[0];
  const isWish = currentProduct ? wishlist.includes(currentProduct.id) : false;

  const selectProduct = (newIndex: number, animate = true) => {
    const total = products.length;
    const i = (newIndex + total) % total;
    if (i === currentIndex) return;

    setCurrentIndex(i);

    // Scroll thumbnail into view
    const rail = railRef.current;
    if (rail) {
      const btn = rail.querySelectorAll<HTMLButtonElement>('.th')[i];
      if (btn) btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && animate) {
      const parts = ['#pobj', '#pcat', '#pname2', '#pdesc', '#ptags', '#pprice'];
      gsap.killTweensOf(parts);
      gsap.to(parts, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          gsap.set(parts, { y: 0 });
          gsap.fromTo('#pobj', { opacity: 0 }, { opacity: 1, duration: 0.3 });
          gsap.fromTo(['#pcat', '#pname2', '#pdesc'], { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.35 });
          gsap.fromTo('#ptags span', { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.3, delay: 0.1 });
          gsap.to('#pprice', { opacity: 1, duration: 0.3 });
        },
      });
    }
  };

  const handleAddBag = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentProduct) return;
    addToBag(currentProduct, 1);
    setIsBagOpen(true);
    showToastNotification(`${currentProduct.name} added to bag`);

    // Flying particle effect
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bagBtn = document.getElementById('bagbtn');
    if (!reduced && bagBtn) {
      const startRect = e.currentTarget.getBoundingClientRect();
      const endRect = bagBtn.getBoundingClientRect();
      const flyDot = document.createElement('div');
      flyDot.className = 'fly';
      flyDot.style.left = `${startRect.left + startRect.width / 2 - 13}px`;
      flyDot.style.top = `${startRect.top + startRect.height / 2 - 13}px`;
      document.body.appendChild(flyDot);

      gsap.to(flyDot, {
        x: endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2),
        y: endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2),
        scale: 0.35,
        duration: 0.75,
        ease: 'power2.in',
        onComplete: () => {
          flyDot.remove();
          gsap.fromTo(bagBtn, { scale: 1.3 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
        },
      });
    }
  };

  const handleToggleWishlist = () => {
    if (!currentProduct) return;
    toggleWishlist(currentProduct.id);
    if (isWish) {
      showToastNotification(`Removed from wishlist`);
    } else {
      showToastNotification(`${currentProduct.name} saved to wishlist`);
    }
  };

  // 3D tilt and pointer interactions
  useEffect(() => {
    const pst = stageRef.current;
    const pobj = objRef.current;
    if (!pst || !pobj) return;

    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      const r = pst.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      pobj.style.transform = `rotateY(${(x * 16).toFixed(1)}deg) rotateX(${(-y * 16).toFixed(1)}deg)`;
      pst.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      pst.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      pst.style.setProperty('--sx', `${-x * 30}px`);
    };

    const handleMouseLeave = () => {
      pobj.style.transform = '';
      pst.style.setProperty('--mx', '50%');
      pst.style.setProperty('--my', '40%');
      pst.style.setProperty('--sx', '0px');
    };

    if (fine && !reduced) {
      pst.addEventListener('mousemove', handleMouseMove);
      pst.addEventListener('mouseleave', handleMouseLeave);
    }

    let startX: number | null = null;
    const handlePointerDown = (e: PointerEvent) => {
      startX = e.clientX;
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (startX === null) return;
      const diff = e.clientX - startX;
      startX = null;
      if (Math.abs(diff) > 50) {
        selectProduct(currentIndex + (diff < 0 ? 1 : -1));
      }
    };

    pst.addEventListener('pointerdown', handlePointerDown);
    pst.addEventListener('pointerup', handlePointerUp);

    return () => {
      pst.removeEventListener('mousemove', handleMouseMove);
      pst.removeEventListener('mouseleave', handleMouseLeave);
      pst.removeEventListener('pointerdown', handlePointerDown);
      pst.removeEventListener('pointerup', handlePointerUp);
    };
  }, [currentIndex, products]);

  if (!currentProduct) return null;

  const imgSrc = getProductImage(currentProduct);

  return (
    <section id="gifts" className="wrap sec-pad">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Featured gifts</div>
          <h2 style={{ marginTop: '0.8rem' }}>A small exhibition of things worth giving.</h2>
        </div>
        <p>
          Curated artisan creations calibrated for genuine emotional connection. Connected directly to live catalogue and bag inventory.
        </p>
      </div>

      <div className="stagebox">
        {/* Left Info Column */}
        <div className="pinfo" id="pleft">
          <div className="eyebrow" id="pcat">
            {currentProduct.categoryName || 'Home'} • {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </div>
          <h3 id="pname2">{currentProduct.name}</h3>
          <p id="pdesc">{currentProduct.description}</p>
          <div className="tags" id="ptags">
            {currentProduct.tags?.map((t, idx) => (
              <span key={idx}>{t}</span>
            ))}
          </div>
        </div>

        {/* Center 3D Stage Spotlight */}
        <div
          className="spot-stage"
          id="pstage"
          ref={stageRef}
          tabIndex={0}
          aria-label="Product spotlight. Use left and right arrow keys to browse."
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') selectProduct(currentIndex + 1);
            if (e.key === 'ArrowLeft') selectProduct(currentIndex - 1);
          }}
        >
          <div className="obj" id="pobj" ref={objRef}>
            <img
              src={imgSrc}
              alt={currentProduct.name}
              className="w-full h-auto object-cover rounded-lg aspect-square"
              onError={(e) => {
                // Inline SVG art fallback
                const parent = (e.currentTarget as HTMLElement).parentElement;
                if (parent) {
                  parent.innerHTML = getProductArtSVG(currentProduct.tags?.[0]?.toLowerCase() || 'candle');
                }
              }}
            />
          </div>
          <div className="shadow" />
        </div>

        {/* Right Action Column */}
        <div className="pinfo">
          <div className="eyebrow">Price in Indian Rupees</div>
          <div className="price" id="pprice">
            ₹{currentProduct.price.toLocaleString('en-IN')}
          </div>
          <div className="pact">
            <button className="btn" id="addbag" type="button" onClick={handleAddBag}>
              Add to Bag
            </button>
            <button
              className={`heart ${isWish ? 'on' : ''}`}
              id="wish"
              type="button"
              aria-label={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWish}
              onClick={handleToggleWishlist}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 20.5S3.5 15 3.5 9A4.7 4.7 0 0 1 12 6.8 4.7 4.7 0 0 1 20.5 9c0 6-8.5 11.5-8.5 11.5z" />
              </svg>
            </button>
          </div>
          <div style={{ marginTop: '1.2rem' }}>
            <Link
              to="/discover"
              className="seelink"
              style={{ color: 'var(--ink)', borderColor: 'var(--ink)', fontSize: '0.78rem' }}
            >
              View all {products.length}+ gifts ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Thumbnail Navigation Rail */}
      <div className="rail" id="rail" ref={railRef} role="tablist" aria-label="Featured gifts">
        {products.map((p, i) => (
          <button
            key={p.id || i}
            className="th"
            role="tab"
            type="button"
            aria-selected={i === currentIndex}
            onClick={() => selectProduct(i)}
          >
            <img
              src={getProductImage(p)}
              alt={p.name}
              onError={(e) => {
                const parent = (e.currentTarget as HTMLElement).parentElement;
                if (parent) {
                  parent.innerHTML = getProductArtSVG(p.tags?.[0]?.toLowerCase() || 'candle');
                }
              }}
            />
            <div style={{ marginTop: '0.4rem', fontWeight: 600 }}>{p.name}</div>
          </button>
        ))}
      </div>

      {/* Interactive Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
        {toastMessage}
      </div>
    </section>
  );
};
