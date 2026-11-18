import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBag } from '../../context/BagContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { totalCount, setIsBagOpen } = useBag();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`top ${scrolled ? 'scrolled' : ''}`} id="nav">
        <div className="in">
          <Link className="mark" to="/">CHARIS</Link>
          <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''}>Discover</Link>
            </li>
            <li>
              <Link to="/occasions" className={location.pathname === '/occasions' ? 'active' : ''}>Occasions</Link>
            </li>
            <li>
              <Link to="/consultation" className={location.pathname === '/consultation' ? 'active' : ''}>Consultation</Link>
            </li>
            <li>
              <Link to="/gift-studio" className={location.pathname === '/gift-studio' ? 'active' : ''}>Gift Studio</Link>
            </li>
          </ul>
          <div className="acts">
            <Link className="ic" to="/dashboard" aria-label="Account">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5"/></svg>
            </Link>
            <Link className="ic" to="/dashboard" aria-label="Wishlist">
              <svg viewBox="0 0 24 24"><path d="M12 20.5S3.5 15 3.5 9A4.7 4.7 0 0 1 12 6.8 4.7 4.7 0 0 1 20.5 9c0 6-8.5 11.5-8.5 11.5z"/></svg>
              <span className="badge" id="wcount" data-n={wishlist.length}>{wishlist.length}</span>
            </Link>
            <button
              className="ic"
              type="button"
              aria-label="Shopping bag"
              id="bagbtn"
              onClick={() => setIsBagOpen(true)}
            >
              <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>
              <span className="badge" id="bcount" data-n={totalCount}>{totalCount}</span>
            </button>
            <button
              className="ic burger"
              type="button"
              id="burger"
              aria-label="Menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(prev => !prev)}
            >
              <svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`} id="drawer">
        <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
        <Link to="/discover" onClick={() => setDrawerOpen(false)}>Discover</Link>
        <Link to="/occasions" onClick={() => setDrawerOpen(false)}>Occasions</Link>
        <Link to="/consultation" onClick={() => setDrawerOpen(false)}>Consultation</Link>
        <Link to="/gift-studio" onClick={() => setDrawerOpen(false)}>Gift Studio</Link>
      </div>
    </>
  );
};
