import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './aqua-theme.css';
// import Toast from './Toast';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
      <Suspense fallback={<div className="min-h-screen bg-[#181818]" aria-busy="true" />}>
        <Outlet />
      </Suspense>
      </div>
      <Footer />
      {/* <Toast /> */}
    </>
  );
}

export default App;
