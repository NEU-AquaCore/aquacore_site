import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './aqua-theme.css';
// import Toast from './Toast';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      // Native dialog dismissal can restore its opener during the same update.
      const frame = requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="aqua-skip-link">Skip to content</a>
      <Navbar />
      <div id="main-content" className="aqua-content" tabIndex={-1}>
      <Suspense fallback={<div className="aqua-page-loading" role="status">Loading AquaCore…</div>}>
        <Outlet />
      </Suspense>
      </div>
      <Footer />
      {/* <Toast /> */}
    </>
  );
}

export default App;
