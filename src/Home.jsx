import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCompass, FiCpu, FiRadio } from 'react-icons/fi';
import ImageCarousel from './components/ImageCarousel';
import { teamPhotos, fieldPhotos } from './data/teamPhotos';

const vehicles = [
  { name: 'Clutch', image: '/images/logos/clutch-cutout.webp', path: '/clutch', label: 'Precision through engineering.', description: 'A compact frame. A considered design. Meet the vehicle we build, test, and refine together.' },
  { name: 'Challenge', image: '/images/logos/challenge-cutout.webp', path: '/challenge', label: 'Built for the next challenge.', description: 'Mechanics, electronics, and autonomy come together in our next underwater vehicle.' },
];
const disciplines = [
  { icon: FiCompass, title: 'Mechanical', text: 'From the first CAD sketch to a watertight frame. We design, build, test, and keep refining.' },
  { icon: FiCpu, title: 'Electrical', text: 'Power, sensing, and control. The connected systems that bring our vehicles to life.' },
  { icon: FiRadio, title: 'Software', text: 'Perception, navigation, and autonomy. Helping our robots make sense of the underwater world.' },
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const vehicle = vehicles[selected];

  return (
    <div className="aqua-home">
      <section className="aqua-hero aqua-container">
        <div className="aqua-hero-layout">
          <div className="aqua-hero-copy">
            <p className="aqua-hero-intro">Northeastern University <span>海洋之心</span></p>
            <h1>We build<br />for the depths.</h1>
            <p className="aqua-hero-description">We are NEU AquaCore. A student team turning curiosity into underwater robotics, one idea and one poolside test at a time.</p>
            <div className="aqua-button-row">
              <Link to="/vehicles" viewTransition className="aqua-button">Explore our vehicles</Link>
              <Link to="/team" viewTransition className="aqua-text-link">Meet the team <FiArrowUpRight /></Link>
            </div>
            <div className="aqua-hero-note"><span className="aqua-status-dot" />Student minds. Ocean possibilities.</div>
          </div>
          <div className="aqua-showcase">
            <div className="aqua-showcase-top"><span>Our underwater vehicles</span><span>2026</span></div>
            <div className="aqua-showcase-image">
              <img key={vehicle.name} src={vehicle.image} alt={`${vehicle.name} autonomous underwater vehicle`} width={selected === 0 ? 694 : 768} height={selected === 0 ? 555 : 582} fetchPriority="high" decoding="async" />
            </div>
            <div className="aqua-showcase-bottom">
              <div><h2>{vehicle.name}</h2><p>Autonomous underwater vehicle</p></div>
              <Link to={vehicle.path} viewTransition className="aqua-showcase-link" aria-label={`Explore ${vehicle.name} in 3D`}><FiArrowUpRight /></Link>
            </div>
            <div className="aqua-vehicle-switch" role="group" aria-label="Choose a vehicle">
              {vehicles.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}<span>2026</span></button>)}
            </div>
          </div>
        </div>
        <div className="aqua-hero-baseline"><span>Learn by doing. Build better together.</span><a href="#our-story">Discover AquaCore <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="aqua-partner-strip" aria-label="University supporters">
        <div className="aqua-container"><p>At home at<br /><strong>Northeastern University</strong></p>
          <img src="/images/logos/NEU.png" alt="Northeastern University" width="171" height="60" loading="lazy" />
          <img src="/images/logos/neu_rse_logo.jpg" alt="Faculty of Robot Science and Engineering" width="210" height="60" loading="lazy" />
          <img src="/images/logos/neu_amsil_logo.png" alt="Aerial and Maritime Swarm Intelligence Laboratory" width="210" height="60" loading="lazy" />
          <Link to="/sponsors" viewTransition className="aqua-text-link">Our supporters <FiArrowUpRight /></Link>
        </div>
      </section>

      <section id="our-story" className="aqua-section aqua-container aqua-story">
        <div className="aqua-story-copy"><p className="aqua-section-label">The people behind the robots</p><h2>A shared curiosity.<br />A hands-on team.</h2>
          <p>Founded in 2020, AquaCore (海洋之心) is a student team from Northeastern University with a shared passion for underwater robotics.</p>
          <p>In the lab and at the pool, we bring mechanics, electronics, and software together. We learn from every test and build on every idea.</p>
          <Link to="/team" viewTransition className="aqua-text-link">Get to know AquaCore <FiArrowUpRight /></Link>
          <div className="aqua-story-facts"><div><strong>2020</strong><span>Our story begins</span></div><div><strong>Shenyang</strong><span>Our home at NEU</span></div><div><strong>Together</strong><span>How we build</span></div></div>
        </div>
        <div className="aqua-story-photo"><ImageCarousel images={teamPhotos} autoPlay={0} /></div>
      </section>

      <section className="aqua-section aqua-section-tinted"><div className="aqua-container">
        <div className="aqua-section-heading"><div><p className="aqua-section-label">Designed here. Tested underwater.</p><h2>Meet the fleet.</h2></div><Link to="/vehicles" viewTransition className="aqua-text-link">Explore in 3D <FiArrowUpRight /></Link></div>
        <div className="aqua-fleet-grid">{vehicles.map(item => <article key={item.name} className="aqua-fleet-item"><Link to={item.path} viewTransition className="aqua-vehicle-card">
          <div className="aqua-vehicle-image"><img src={item.image} alt={`${item.name} vehicle`} width={item.name === 'Clutch' ? 694 : 768} height={item.name === 'Clutch' ? 555 : 582} loading="lazy" decoding="async" /></div>
          <div className="aqua-vehicle-card-bottom"><div><h3>{item.name}<span>2026</span></h3><p>{item.label}</p></div><FiArrowUpRight aria-hidden="true" /></div>
        </Link><p className="aqua-fleet-description">{item.description}</p></article>)}</div>
      </div></section>

      <section className="aqua-section aqua-container aqua-engineering">
        <div className="aqua-section-heading"><div><p className="aqua-section-label">How it comes together</p><h2>Different skills.<br />One direction.</h2></div><p className="aqua-section-aside">Every vehicle starts with a conversation <br />between disciplines.</p></div>
        <div className="aqua-engineering-layout"><figure className="aqua-engineering-photo"><img src={fieldPhotos[2].src} alt={fieldPhotos[2].alt} width={fieldPhotos[2].width} height={fieldPhotos[2].height} loading="lazy" decoding="async" /><figcaption>From the workbench to the water.</figcaption></figure>
          <div className="aqua-disciplines">{disciplines.map(item => <article className="aqua-discipline-row" key={item.title}><item.icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="aqua-section aqua-container aqua-journal"><div className="aqua-section-heading"><div><p className="aqua-section-label">Beyond the workbench</p><h2>In the water.<br />Out in the world.</h2></div></div>
        <div className="aqua-journal-grid"><Link to="/competitions" viewTransition className="aqua-journal-card"><div className="aqua-journal-image"><img src={fieldPhotos[0].src} alt={fieldPhotos[0].alt} width={fieldPhotos[0].width} height={fieldPhotos[0].height} loading="lazy" decoding="async" /></div><p className="aqua-journal-category">Competitions</p><div className="aqua-journal-title"><h3>Putting ideas to the test.</h3><FiArrowUpRight /></div><p>Explore the challenges that drive our engineering, from URPC to RoboCup and beyond.</p></Link>
          <Link to="/outreach" viewTransition className="aqua-journal-card"><div className="aqua-journal-image"><img src="/images/rovhandson_1.png" alt="Hands-on robotics workshop" width="1200" height="800" loading="lazy" decoding="async" /></div><p className="aqua-journal-category">Community & outreach</p><div className="aqua-journal-title"><h3>Curiosity is better shared.</h3><FiArrowUpRight /></div><p>Workshops, conversations, and hands-on learning beyond the classroom.</p></Link></div>
      </section>

      <section className="aqua-container aqua-join-banner">
        <div className="aqua-join-copy"><p>Bring your curiosity.</p><h2>Let’s build<br />what comes next.</h2><p className="aqua-join-description">Find your place in a team that learns by doing.</p><Link to="/joinus" viewTransition className="aqua-button">Join AquaCore</Link></div>
        <picture className="aqua-join-art">
          <source media="(max-width: 680px)" srcSet="/images/brand/aquacore-art-square.webp" width="1000" height="947" />
          <img src="/images/brand/aquacore-art-wide.webp" alt="AquaCore illustration with our wave emblem, an underwater robot, code, electronics and a propeller" width="1600" height="900" loading="lazy" decoding="async" />
        </picture>
      </section>
    </div>
  );
}
