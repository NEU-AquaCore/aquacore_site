import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OutreachPage() {
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    contact: useRef(null),
    competitions: useRef(null),
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white flex flex-col items-center pt-8 sm:pt-0">
      {/* Outreach Hero Banner */}
      <section
        className="relative w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-24 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/outreach_banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-500 mb-8">Outreach</h1>
          <p className="max-w-4xl text-lg sm:text-xl leading-relaxed">
            We are eager to share our work and knowledge with the community through outreach activities, aiming to inspire a spirit of innovation in students. Through these experiences, we hope to spark curiosity about marine science and technology — encouraging young learners to explore beyond the classroom and develop their own creative solutions.
          </p>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="w-full bg-[#1a1a1a] py-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold text-blue-500 mb-8 text-center">Workshops</h2>
          <p className="text-lg text-white mb-12 text-center max-w-3xl mx-auto">
            We promote knowledge sharing through interactive sessions and live demonstrations on underwater robotics, drone technology, 3D printing, and other related technologies — tailored for students and the public with content adaptable to different interests and skill levels.
          </p>
          <div className="flex justify-center">
            <WorkshopsCarousel />
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section ref={sectionRefs.services}
      className="min-h-[500px] w-full bg-[#2a2626] flex flex-col md:flex-row items-center justify-center py-12">
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 gap-8">
    
      {/* Left: Workshops Text */}
      <div className="flex-1 flex flex-col justify-center items-start py-8">
        <h2 className="text-4xl font-extrabold text-blue-500 mb-8">Volunteering</h2>
        <p className="text-lg text-white mb-6">
            We collaborate with schools, community organizations, and public venues to offer introductory workshops and hands-on activities on marine science and technology for students and the general public.
        </p>
      </div>

      {/* Right: Carousel */}
      <div className="flex-1 flex justify-center items-center py-8">
        <VolunteerCarousel />
      </div>
      </div>  
    </section>

      {/* E-Resources Section */}
      <section className="w-full bg-[#1a1a1a] py-16">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 gap-8">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-start py-8">
            <h2 className="text-4xl font-extrabold text-blue-500 mb-6">E-Resources Initiatives</h2>
            <p className="text-lg text-white mb-6">
              We have also created an interactive e-resource! It is a great conversation starter to educate children about microplastics, which are ubiquitous pollutants in the marine environment.
            </p>
            <a 
              href="/game" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-gray-400 text-gray-200 font-semibold px-8 py-2 rounded-lg shadow transition hover:bg-blue-500 hover:text-white inline-block text-center cursor-pointer"
            >
              Click to try!
            </a>
          </div>

          {/* Right: Video */}
          <div className="flex-1 flex justify-center items-center py-8 max-w-xl w-full">
            <video
              src="/images/eresource_video.mp4"
              controls
              className="rounded-xl w-full h-auto max-h-[600px] object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}

function WorkshopsCarousel() {
  const slides = [ {
      image: '/images/dronetalk_1.png',
      title: 'April 2026',
      subtitle: 'Drone Tech Talk & Demo',
      desc: 'AquaCore hosted an engaging session on drone technology, welcoming students and tech enthusiasts to explore the world of unmanned aerial vehicles. From understanding flight dynamics and control systems to witnessing a live demonstration of obstacle avoidance and autonomous navigation, this event brought together theory and practice in a hands-on, interactive setting. Participants also got the chance to ask questions and discuss real-world applications — from aerial surveying to search and rescue operations.',
      link: '/yyss',
    },
    {
      image: '/images/rovhandson_1.png',
      title: 'November 2025',
      subtitle: 'ROV Hands-On Workshop',
      desc: 'AquaCore hosted a hands-on ROV workshop where participants explored the fundamentals of underwater robotics — from buoyancy and thruster control to maneuvering a small ROV through an obstacle course and retrieving target objects. The session offered an interactive introduction to remotely operated vehicles and their real-world applications in underwater inspection and environmental monitoring.',
      link: '/3dpen',
    },
    {
      image: '/images/3dprinting_1.jpg',
      title: 'October 2025',
      subtitle: '3D Printing Workshop',
      desc: 'AquaCore hosted a 3D Printing Workshop, bringing together students eager to explore the world of additive manufacturing. From understanding how 3D printers work layer by layer to designing their own models and watching them come to life, participants got a comprehensive hands-on experience. The session covered slicing software, material selection, and troubleshooting common print issues — equipping attendees with the skills to turn their ideas into physical objects.',
      link: '/marinevehicle',
    }, ];

    const [idx, setIdx] = useState(0);

  // Autoplay every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center">
      {/* Slide content */}
      <div className="flex flex-col md:flex-row bg-[#232323] rounded-xl overflow-hidden shadow-lg">
        {/* Left: Image */}
        <img
          src={slides[idx].image}
          alt={slides[idx].subtitle}
          className="w-full md:w-1/2 h-80 md:h-auto object-cover"
        />

        {/* Right: Text */}
        <div className="p-6 flex flex-col justify-center md:w-1/2">
          <div className="text-sm font-bold text-white mb-1">{slides[idx].title}</div>
          <div className="text-2xl font-extrabold text-white mb-2">{slides[idx].subtitle}</div>
          <div className="text-base text-white mb-4">{slides[idx].desc}</div>
          {/* <Link
            to={slides[idx].link}
            className="text-base font-semibold text-white hover:text-blue-500 transition flex items-center group"
          >
            Read More Here
            <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link> */}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex space-x-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full ${
              i === idx ? 'bg-blue-500' : 'bg-white/60'
            } border border-white transition`}
          />
        ))}
      </div>
    </div>
  );
}

function VolunteerCarousel() {
  const images = [
    '/images/volunteer-1.JPG',
    '/images/volunteer-2.JPG',
    '/images/volunteer-3.JPG',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-xl h-[400px] rounded-xl overflow-hidden mx-auto">
      <img
        src={images[currentIndex]}
        alt=""
        className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
      />

      {/* For image dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-blue-500' : 'bg-white/50'} border border-white`}
          />
        ))}
      </div>
    </div>
  );
}