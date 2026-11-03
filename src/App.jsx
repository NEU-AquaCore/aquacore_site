import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
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
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#181818]" aria-busy="true" />}>
        <Outlet />
      </Suspense>
      <Footer />
      {/* <Toast /> */}
    </>
  );
}

export default App;
