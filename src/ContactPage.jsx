import React, { useRef, useState, useEffect } from 'react';
import { FaEnvelope, FaMapPin } from 'react-icons/fa';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    contact: useRef(null),
    competitions: useRef(null),
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.setAttribute("data-use-service-core", "");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#181818] text-white flex flex-col items-center">
      {/* Contact Hero Banner */}
      <section
        className="relative w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-24 bg-cover bg-center text-white"
        //style={{ backgroundImage: "url('/images/sauvc2025.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-500 mb-8">Contact Us</h1>
          <p className="max-w-4xl text-lg sm:text-xl leading-relaxed">
            If you would like more information about our projects, the research and development activities of AquaCore, or have any other questions, please feel free to drop us a message.
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section ref={sectionRefs.services}
      className="min-h-[500px] w-full bg-[#2a2626] flex flex-col md:flex-row items-center justify-center py-12">
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 gap-8">
    
      {/* Left: Text */}
      <div className="flex-1 flex flex-col justify-center items-start py-8">
        <h2 className="text-4xl font-extrabold text-blue-500 mb-8">Get in touch!</h2>
          <p>
            We would love to hear from you! Whether you are interested in sponsoring our initiatives or would like us to run an outreach event at your school, organization, or venue — feel free to get in touch! We are always open to meaningful collaborations and new opportunities to make a difference.
          </p>
          <div className="flex items-center gap-2 mt-8"><FaEnvelope className="text-blue-400 text-xl" /><b>neu_aquacore@163.com</b></div>
      </div>

      {/* Right: Carousel */}
      <div className="flex-1 flex justify-center items-center py-8">
        <ImageCarousel />
      </div>
      </div>  
    </section>

    <ContactForm />

      {/* Instagram Feed Section */}
      {/* <section className="w-full bg-[#1a1a1a] py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-500 mb-6">Latest Happenings</h2>
          <p className="text-white mb-8">Catch up on what we are doing by following us on Instagram (@ntu_mecatron)!</p>
          <div className="elfsight-app-464a0d58-a8ab-4e30-8545-5edcb53f33d5" data-elfsight-app-lazy></div>
        </div>
      </section> */}

      {/* Maps Section */}
      <section className="w-full bg-[#2a2626] py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-500 mb-6">Visit Us</h2>

          <div className="flex justify-center items-center gap-2 text-white text-lg mb-6">
            <FaMapPin className="text-blue-400 text-xl" />
            <span>No.195 Chuangxin Road, Hunnan District, Shenyang, China, 110169</span>
          </div>

          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.amap.com/place/B0FFJKL6RQ"  //谷歌地图地址https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2980.9940308333494!2d123.41979107630478!3d41.65587097929847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDM5JzIxLjEiTiAxMjPCsDI1JzIwLjUiRQ!5e0!3m2!1szh-CN!2sus!4v1785396680107!5m2!1szh-CN!2sus
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}

function ImageCarousel() {
  const images = [
    // '/images/contactus_2.webp',
    // '/images/contactus_1.webp',
    // '/images/contactus_3.webp',
    // '/images/sauvc2024.jpg',
    // '/images/materov2024.webp',
    '/images/team-1.jpg',
    '/images/team-2.jpg',
    '/images/team-3.png',
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