import { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ImageCarousel from "./components/ImageCarousel"; //import two carousels for the different sections
import ContentCarousel from "./components/ContentCarousel";

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About me' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact me' },
];


export default function Home() {
  // Refs for scrolling
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    contact: useRef(null),
    competitions: useRef(null),
  };


  const scrollToSection = (id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white font-sans overflow-x-hidden">
      <Navbar scrollToSection={scrollToSection} />
      {/* Hero Section */}
      <section ref={sectionRefs.home} className="pt-28 pb-10 md:pt-32 md:pb-16 px-4 sm:px-8 md:px-12 min-h-screen bg-[#181818] flex items-center">
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.9fr)_minmax(0,1fr)] items-center gap-4 md:gap-8">
          <div className="flex items-center justify-center w-full order-2 lg:order-1">
            <div className="w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] lg:w-[34rem] lg:h-[34rem] xl:w-[40rem] xl:h-[40rem] rounded-full flex items-center justify-center overflow-hidden relative bg-transparent">
              <img
                src="/images/logos/clutch-home.png"
                alt="Clutch 2026"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 w-full text-center order-1 lg:order-2">
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-500">Meet Clutch & Challenge</div>
            <div className="text-2xl sm:text-3xl md:text-2xl font-medium text-white">Vehicles for RoboCup 2026</div>


            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
            <Link
              to="/vehicles"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 sm:px-8 py-2 text-sm sm:text-base rounded-lg shadow transition-all duration-200 text-center"
            >
              Meet Our Vehicles
            </Link>
              <Link
                to="/competitions"
                className="border border-gray-400 text-gray-200 font-semibold px-4 sm:px-8 py-2 text-sm sm:text-base rounded-lg shadow transition-all duration-200 hover:bg-gray-700 text-center"
              >
              Competitions 2026
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center w-full order-3">
            <div className="w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] lg:w-[34rem] lg:h-[34rem] xl:w-[40rem] xl:h-[40rem] flex items-center justify-center overflow-hidden relative bg-transparent">
              <img
                src="/images/logos/challenge-home.png"
                alt="Challenge 2026"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Placeholder sections for navigation */}
      <section ref={sectionRefs.services} className="min-h-[500px] bg-[#222] py-16">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 gap-8">
        {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-start py-8 w-full">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-8">Who we are</h2>
            <p className="text-base sm:text-lg text-white mb-6">
            Founded in 2020, AquaCore (海洋之心) is a student team from Northeastern University, driven by a passion for underwater robotics. We specialize in developing autonomous underwater vehicles (AUVs), competing in marine robotics challenges, and advancing research in the field.
          </p>
            <p className="text-base sm:text-lg text-white mb-8">
            We love building things that go underwater and solving the challenges that come with it. We bring together skills in mechanics, electronics, programming, and systems engineering. We learn by doing, and we push each other to do better.
          </p>
            <Link to="/team" className="text-base sm:text-lg font-semibold text-white hover:text-blue-500 transition flex items-center group">
            Meet The Team <span className="ml-2 group-hover:translate-x-1 transition-transform">&raquo;</span>
          </Link>
        </div>
        {/* Team Carousel */}
          <div className="flex-1 flex justify-center items-center py-8 w-full">
          <ImageCarousel
            images={[
              '/images/team-1.jpg',
              '/images/team-2.jpg',
              '/images/team-3.png',
              //'/images/team_1.jpg',
              //'/images/team_2.webp',
              //'/images/team_3.jpg',
              //'/images/team_4.webp',
              //'/images/team_5.jpg',
            ]}
            autoPlay={4000}
          />
          </div>
        </div>
      </section>

      <section ref={sectionRefs.competitions} className="min-h-[500px] bg-[#181818] py-16">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 gap-8">
          {/* Competitions Carousel */}
          <div className="flex-1 flex justify-center items-center py-8 w-full">
            <ContentCarousel
              slides={[
                {
                  image: '/images/rstteam2025.jpg',
                  title: 'Multiple Top Honors',
                  subtitle: 'RST 2025',
                  desc: 'AquaCore delivered outstanding results at RST 2025, securing multiple first-place awards and demonstrating strong system robustness.',
                  //link: '/robosub2025',
                },
                {
                  image: '/images/urpcteam2025.jpeg',
                  title: '1st Place',
                  subtitle: 'URPC 2025',
                  desc: 'Following our successful debut last year, AquaCore proudly clinched 1st place at the URPC Competition 2025!',
                  //link: '/urpc2025',
                },
                // {
                //   image: '/images/materov2024.webp',
                //   title: 'Finalist',
                //   subtitle: 'MATE ROV 2024',
                //   desc: 'Find out about how we conquered the MATE ROV World Championship with "Guts and Glory"!',
                //   //link: '/materov2024',
                // },
                // {
                //   image: '/images/sauvc2024.jpg',
                //   title: '3rd Place',
                //   subtitle: 'SAUVC 2024',
                //   desc: 'Witness the debut of our first autonomous underwater vehicle (AUV) at the Singapore AUV Challenge.',
                //   //link: '/sauvc2024',
                // },
              ]}
              autoPlay={5000}
            />
          </div>
        {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-start py-8 w-full">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-8">Competitions</h2>
            <p className="text-base sm:text-lg text-white mb-6">
            We are active in a wide range of national and international competitions, including URPC, RoboCup, RST, CIOURC, the National Marine Vehicle Design and Manufacturing Competition, and MATE ROV.
          </p>
            <p className="text-base sm:text-lg text-white mb-8">
            These events push us to innovate, refine our underwater vehicle designs, and collaborate on cutting-edge robotics solutions.
          </p>
            <Link to="/competitions" className="text-base sm:text-lg font-semibold text-white hover:text-blue-500 transition flex items-center group">
            Learn more about our participated competitions <span className="ml-2 group-hover:translate-x-1 transition-transform">&raquo;</span>
          </Link>
        </div>


        </div>
      </section>

      <section ref={sectionRefs.about} className="min-h-[500px] bg-[#222] py-16">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 gap-8">
          {/* Right: Text */}
          <div className="flex-1 flex flex-col justify-center items-start py-8 w-full">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-8">Our Initiatives</h2>
            <p className="text-base sm:text-lg text-white mb-8">
              We are always eager to share our work and our knowledge with the community through outreach workshops, to inspire a spirit of innovation in students. Through these workshops, we hope to spark students' interest in Marine Science & Tech; to evoke curiosity and inspire students to innovate new solutions as they explore the world beyond the school curriculum.
          </p>
            <Link to="/outreach" className="text-base sm:text-lg font-semibold text-white hover:text-blue-500 transition flex items-center group">
            Click here to view our initiative efforts <span className="ml-2 group-hover:translate-x-1 transition-transform">&raquo;</span>
          </Link>
          </div>
          {/* Initiatives Carousel */}
          <div className="flex-1 flex justify-center items-center py-8 w-full">
            <ContentCarousel
              slides={[
                {
                  image: '/images/dronetalk_1.png',
                  title: 'April 2026',
                  subtitle: 'Drone Tech Talk & Demo',
                  desc: 'AquaCore hosted an engaging session on drone technology, introducing participants to flight dynamics, control systems, and autonomous navigation through a live demonstration. The event offered a hands-on look at the possibilities of unmanned aerial vehicles.',
                  //link: '/computervision',
                },
                {
                  image: '/images/rovhandson_1.png',
                  title: 'November 2025',
                  subtitle: 'ROV Hands-On Workshop',
                  desc: 'AquaCore hosted a hands-on ROV workshop where participants explored the fundamentals of underwater robotics — from buoyancy and thruster control to piloting a small ROV through an obstacle course and retrieving target objects.',
                  //link: '/marinevehicle',
                },
                // {
                //   image: '/images/blender3d_7.jpg',
                //   title: 'October 2024',
                //   subtitle: 'Blender 3D Workshop',
                //   desc: 'Mecatron organized a 2 day Blender 3D workshop, providing NTU students with hands-on training in Blender basics and Rendering, Product Design Fundamentals, and Materials and Texturing.',
                //   link: '/blender3d',
                // },
              ]}
              autoPlay={6000}
            />
          </div>
        </div>
      </section>

      <section ref={sectionRefs.portfolio} className="min-h-[400px] bg-[#1a1a1a] py-16 px-4 sm:px-8">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-8">Our Sponsors</h2>
              <p className="text-base sm:text-lg text-white max-w-2xl">
                We are grateful to our sponsors for their invaluable support. Their contributions have played a vital role in advancing our projects, research, and outreach efforts.
              </p>
            </div>

            <div className="mt-4">
              <Link to="/sponsors" className="text-base sm:text-lg font-semibold text-white hover:text-blue-500 transition flex items-center group">
                  Learn more about our partnership opportunities <span className="ml-2 group-hover:translate-x-1 transition-transform">&raquo;</span>
              </Link>
            </div>

            <div className="mt-12">
            {/* Sponsors Carousel */}
            <SponsorsCarousel />
            </div>

          </div>
      </section>
    </div>

  );
}


function SponsorsCarousel() {
  const sponsors = useMemo(() => [
    //{ logo: "/images/logos/fstd_logo.webp", alt: "FSTD", logoClass: "max-h-16 max-w-44" },
    { logo: "/images/logos/zanque.png", alt: "Zanque", logoClass: "max-h-16 max-w-44" },
    { logo: "/images/logos/zanque.png", alt: "Zanque", logoClass: "max-h-16 max-w-44" },
    { logo: "/images/logos/NEU.png", alt: "NEU", logoClass: "max-h-16 max-w-44" },
    { logo: "/images/logos/zanque.png", alt: "Zanque", logoClass: "max-h-16 max-w-44" },
    { logo: "/images/logos/cehai.webp", alt: "CEHAI", logoClass: "max-h-16 max-w-44" },
    //{ logo: "/images/logos/zanque.png", alt: "Zanque", logoClass: "max-h-16 max-w-44" },
    //{ logo: "/images/logos/zanque.png", alt: "Zanque", logoClass: "max-h-16 max-w-44" },
    //{ logo: "/images/logos/zanque.png", alt: "Zanque", logoClass: "max-h-16 max-w-44" },
    //{ logo: "/images/logos/smf.webp", alt: "Singapore Maritime Foundation", logoClass: "max-h-14 max-w-40" },
    //{ logo: "/images/logos/jdf_logo.webp", alt: "James Dyson Foundation", logoClass: "max-h-14 max-w-36" },
    //{ logo: "/images/logos/dso_logo.webp", alt: "DSO", logoClass: "max-h-14 max-w-36" },
    //{ logo: "/images/logos/vectornav_logo.png", alt: "VectorNav", logoClass: "max-h-12 max-w-44" },
    //{ logo: "/images/logos/waterlinked_logo.svg", alt: "WaterLinked", logoClass: "max-h-12 max-w-44" },
    //{ logo: "/images/logos/espressif_logo.webp", alt: "Espressif", logoClass: "max-h-12 max-w-44" },
    //{ logo: "/images/logos/zen4blue_logo.webp", alt: "Zen4Blue", logoClass: "max-h-14 max-w-40" },
    //{ logo: "/images/logos/aquarian_logo.webp", alt: "Aquarian Audio", logoClass: "max-h-12 max-w-44" },
    //{ logo: "/images/logos/dwe_logo.webp", alt: "DWE", logoClass: "max-h-9 max-w-36" },
    //{ logo: "/images/logos/sonardyne_logo.webp", alt: "Sonardyne", logoClass: "max-h-12 max-w-44" },
    //{ logo: "/images/logos/rovmaker_round.png", alt: "ROV Maker", logoClass: "max-h-20 max-w-32" },
  ], []);

  const trackRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  // Measure width of one full set
  useEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      const el = trackRef.current;
      setWidth(el.scrollWidth / 2);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drag support
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStart.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !trackRef.current) return;

    const delta = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStart.current - delta;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const doubled = useMemo(() => [...sponsors, ...sponsors], [sponsors]);

  return (
    <div className="w-full overflow-hidden py-6">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10" />

        {/* Track */}
        <div
          ref={trackRef}
          className={"flex gap-8 w-max will-change-transform animate-marquee"}
          style={{
            animationDuration: `${Math.max(width / 80, 20)}s`,
            animationPlayState: isPaused ? 'paused' : 'running',  /* 关键修改 */
          }}
        >
          {doubled.map((s, i) => (
            <div
              key={`${s.alt}-${i}`}
              className="min-w-[180px] sm:min-w-[220px] h-28 sm:h-32 bg-white/25 border-white/40 backdrop-blur-xl hover:bg-white/35 rounded-lg flex items-center justify-center p-5 backdrop-blur-md hover:scale-105 transition-transform duration-300"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div className="flex h-20 w-44 items-center justify-center">
                <img
                  src={s.logo}
                  alt={s.alt}
                  className={`${s.logoClass} h-auto w-auto object-contain transition duration-300 mx-auto`}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
