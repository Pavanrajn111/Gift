import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const giantRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatusMessage('Enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const res = await axios.post('/api/v1/newsletter', { email: trimmed });
      setStatusMessage(res.data?.message || 'Thank you for subscribing to CHARIS thoughtfulness.');
      setEmail('');
    } catch (err: any) {
      if (err.response?.data?.message) {
        setStatusMessage(err.response.data.message);
      } else {
        setStatusMessage('Thank you for subscribing to CHARIS thoughtfulness.');
        setEmail('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const giant = giantRef.current;
    if (!giant) return;

    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const spans = giant.querySelectorAll('span');

    const handleMouseMove = (e: MouseEvent) => {
      spans.forEach(s => {
        const r = s.getBoundingClientRect();
        const cxp = r.left + r.width / 2;
        const cyp = r.top + r.height / 2;
        const dx = e.clientX - cxp;
        const dy = e.clientY - cyp;
        const d = Math.hypot(dx, dy);
        const k = Math.max(0, 1 - d / 380);

        gsap.to(s, {
          x: dx * 0.12 * k,
          y: dy * 0.1 * k - 8 * k,
          duration: 0.4,
          overwrite: 'auto',
        });
        s.style.setProperty('--gx', `${e.clientX - r.left}px`);
        s.style.setProperty('--gy', `${e.clientY - r.top}px`);
      });
    };

    const handleMouseLeave = () => {
      spans.forEach(s => {
        gsap.to(s, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        });
        s.style.removeProperty('--gx');
        s.style.removeProperty('--gy');
      });
    };

    giant.addEventListener('mousemove', handleMouseMove);
    giant.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      giant.removeEventListener('mousemove', handleMouseMove);
      giant.removeEventListener('mouseleave', handleMouseLeave);
      spans.forEach(s => gsap.killTweensOf(s));
    };
  }, []);

  return (
    <footer className="full" id="footer">
      <div className="wrap">
        <div className="news">
          <div>
            <h2>A little more thoughtfulness in your inbox.</h2>
            <p>Discover thoughtful gifting ideas, new collections, and inspiration for meaningful moments.</p>
          </div>
          <form className="nform" id="nform" onSubmit={handleSubscribe} noValidate>
            <label htmlFor="nemail" style={{ position: 'absolute', left: '-9999px' }}>
              Email address
            </label>
            <input
              id="nemail"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button className="btn gold" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
            <div className="nmsg" id="nmsg" role="status">
              {statusMessage}
            </div>
          </form>
        </div>

        <div className="fnav">
          <Link to="/discover">Discover</Link>
          <Link to="/occasions">Occasions</Link>
          <Link to="/consultation">Consultation</Link>
          <Link to="/gift-studio">Gift Studio</Link>
          <Link to="/dashboard">Account</Link>
          <Link to="/discover?category=home_decor">Collections</Link>
        </div>

        <div className="giant" id="giant" ref={giantRef} aria-label="CHARIS">
          {'CHARIS'.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>

        <div className="fbot">
          <span>© 2026 CHARIS. AI-Powered Personalized Gifting Platform.</span>
          <button className="top-btn" id="totop" type="button" onClick={scrollToTop}>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
