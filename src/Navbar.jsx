import { useState, useRef, useEffect, useId } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiMenu, FiX, FiSearch, FiArrowRight } from 'react-icons/fi';
import aquacoreLogo from './assets/logos/aquacoreWheelLogo.webp';
import AppearanceControl from './components/AppearanceControl';

const links = [
  { label: 'Team', path: '/team' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Competitions', path: '/competitions' },
  { label: 'Outreach', path: '/outreach' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Contact', path: '/contact' },
];
const searchable = [
  ...links, { label: 'Home', path: '/' }, { label: 'Clutch 2026', path: '/clutch' },
  { label: 'Challenge 2026', path: '/challenge' },
  { label: 'Join Us', path: '/joinus' }, { label: 'Microplastics Game', path: '/game' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const menuButton = useRef(null);
  const searchButton = useRef(null);
  const searchDialog = useRef(null);
  const searchInput = useRef(null);
  const returnSearchFocus = useRef(true);
  const menuId = useId();
  const searchId = useId();

  useEffect(() => {
    setMenuOpen(false);
    setQuery('');
    returnSearchFocus.current = false;
    searchDialog.current?.close();
  }, [location.pathname]);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [menuOpen]);

  function openSearch() {
    setMenuOpen(false);
    returnSearchFocus.current = true;
    searchDialog.current?.showModal();
    setSearchOpen(true);
    searchInput.current?.focus();
  }
  function closeSearch() {
    searchDialog.current?.close();
  }
  const results = searchable.filter(item => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <>
      <header className="aqua-header">
        <div className="aqua-container aqua-header-inner">
          <Link to="/" viewTransition className="aqua-brand" aria-label="AquaCore home">
            <img src={aquacoreLogo} alt="" width="42" height="42" decoding="async" />
            <span>AQUACORE<small>NEU · 海洋之心</small></span>
          </Link>
          <nav id={menuId} className={`aqua-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {links.map(item => <NavLink key={item.path} viewTransition to={item.path}>{item.label}</NavLink>)}
            <Link to="/joinus" className="aqua-button aqua-button-small aqua-mobile-join">Join the team <FiArrowUpRight /></Link>
          </nav>
          <div className="aqua-header-actions">
            <AppearanceControl />
            <button ref={searchButton} type="button" className="aqua-icon-button" aria-label="Search pages" aria-haspopup="dialog" aria-expanded={searchOpen} onClick={openSearch}><FiSearch /></button>
            <Link to="/joinus" className="aqua-button aqua-button-small aqua-desktop-join">Join the team <FiArrowUpRight /></Link>
            <button ref={menuButton} type="button" className="aqua-icon-button aqua-menu-toggle" aria-expanded={menuOpen} aria-controls={menuId} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
          </div>
        </div>
      </header>
      {menuOpen && <button className="aqua-menu-backdrop" aria-label="Close navigation" tabIndex={-1} onClick={() => setMenuOpen(false)} />}
      <dialog ref={searchDialog} className="aqua-search-dialog" aria-labelledby={searchId} onClose={() => { setSearchOpen(false); setQuery(''); if (returnSearchFocus.current) searchButton.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) closeSearch(); }}>
        <div className="aqua-search-title"><h2 id={searchId}>Explore AquaCore</h2><button type="button" className="aqua-icon-button" aria-label="Close search" onClick={closeSearch}><FiX /></button></div>
        <label className="aqua-search-input"><FiSearch /><span className="sr-only">Search pages</span><input ref={searchInput} value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a vehicle, team, or page…" /></label>
        <div className="aqua-search-results" aria-live="polite">{results.length ? results.map(item => <Link key={item.path} to={item.path} onClick={() => { returnSearchFocus.current = false; closeSearch(); }}>{item.label}<FiArrowRight /></Link>) : <p>No pages found. Try “vehicles” or “team”.</p>}</div>
        <p className="aqua-search-hint">ESC to close · TAB to browse · ENTER to open</p>
      </dialog>
    </>
  );
}
