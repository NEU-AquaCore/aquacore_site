import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowRight, FiCompass, FiCpu, FiRadio } from 'react-icons/fi';
import ImageCarousel from './components/ImageCarousel';

const vehicles = [
  { name: 'Clutch', image: '/images/logos/clutch-home.png', path: '/clutch', label: 'Precision through engineering.' },
  { name: 'Challenge', image: '/images/logos/challenge-home.png', path: '/challenge', label: 'Built for the next challenge.' },
];
const disciplines = [
  { icon: FiCompass, title: 'Mechanical', text: 'From the first CAD sketch to a watertight frame. We design, build, test, and keep refining.' },
  { icon: FiCpu, title: 'Electrical', text: 'Power, sensing, and control. The connected systems that bring our vehicles to life.' },
  { icon: FiRadio, title: 'Software', text: 'Perception, navigation, and autonomy. Helping our robots make sense of the underwater world.' },
];

export default function Home() {
  return (
    <div className="aqua-home">
      <section className="aqua-hero">
        <div className="aqua-container aqua-hero-layout">
          <Link to="/clutch" className="aqua-hero-vehicle aqua-hero-vehicle-left" aria-label="Explore Clutch 2026">
            <img src="/images/logos/clutch-home.png" alt="Clutch autonomous underwater vehicle" fetchPriority="high" decoding="async" />
            <span>Clutch <small>2026</small></span>
          </Link>
          <div className="aqua-hero-copy">
            <p className="aqua-eyebrow">Northeastern University · 海洋之心</p>
            <h1>We are <br />NEU AquaCore</h1>
            <p className="aqua-hero-subtitle">Vehicles for RoboCup 2026</p>
            <p className="aqua-hero-description">A student team with a passion for underwater robotics. We learn by doing and build better together.</p>
            <div className="aqua-button-row"><Link to="/vehicles" className="aqua-button">Meet our vehicles <FiArrowRight /></Link><Link to="/competitions" className="aqua-button aqua-button-outline">Competitions 2026</Link></div>
          </div>
          <Link to="/challenge" className="aqua-hero-vehicle aqua-hero-vehicle-right" aria-label="Explore Challenge 2026">
            <img src="/images/logos/challenge-home.png" alt="Challenge autonomous underwater vehicle" decoding="async" />
            <span>Challenge <small>2026</small></span>
          </Link>
        </div>
      </section>

      <section className="aqua-partner-strip"><div className="aqua-container"><p className="aqua-eyebrow">Supported by<br /><strong>a shared vision</strong></p><img src="/images/logos/NEU.png" alt="Northeastern University" loading="lazy" /><img src="/images/logos/neu_rse_logo.jpg" alt="NEU Faculty of Robot Science and Engineering" loading="lazy" /><img src="/images/logos/neu_amsil_logo.png" alt="Aerial and Maritime Swarm Intelligence Laboratory" loading="lazy" /><Link to="/sponsors" className="aqua-text-link">Our sponsors <FiArrowUpRight /></Link></div></section>

      <section id="our-story" className="aqua-section aqua-container aqua-story">
        <div className="aqua-story-copy"><p className="aqua-eyebrow">About AquaCore</p><h2>Who we are</h2><p>Founded in 2020, AquaCore (海洋之心) is a student team from Northeastern University with a shared passion for underwater robotics.</p><p>We bring mechanics, electronics, and software together to solve real engineering challenges. We learn by doing, build as a team, and push each other to go further.</p><Link to="/team" className="aqua-text-link">The people behind the robots <FiArrowUpRight /></Link><div className="aqua-story-facts"><div><strong>2020</strong><span>Our story begins</span></div><div><strong>NEU</strong><span>Our home in Shenyang</span></div><div><strong>AUV</strong><span>Our shared passion</span></div></div></div>
        <div className="aqua-story-photo"><ImageCarousel images={['/images/team-1.jpg', '/images/team-2.jpg', '/images/team-3.png']} /><span className="aqua-photo-caption">Different minds. One direction.</span></div>
      </section>

      <section className="aqua-section aqua-section-tinted"><div className="aqua-container"><div className="aqua-section-heading"><div><p className="aqua-eyebrow">Our vehicles</p><h2>Meet our vehicles</h2></div><Link to="/vehicles" className="aqua-text-link">Explore all vehicles <FiArrowUpRight /></Link></div><div className="aqua-fleet-grid">{vehicles.map((vehicle) => <Link key={vehicle.name} to={vehicle.path} className="aqua-vehicle-card"><div className="aqua-card-topline"><span className="aqua-eyebrow">Autonomous underwater vehicle</span><span>2026</span></div><div className="aqua-vehicle-image"><img src={vehicle.image} alt={vehicle.name} loading="lazy" decoding="async" /></div><div className="aqua-vehicle-card-bottom"><div><h3>{vehicle.name} <span>2026</span></h3><p>{vehicle.label}</p></div><span className="aqua-circle-arrow"><FiArrowUpRight /></span></div></Link>)}</div></div></section>

      <section className="aqua-section aqua-container"><div className="aqua-section-heading"><div><p className="aqua-eyebrow">Our expertise</p><h2>Different skills. One team.</h2></div><p className="aqua-section-aside">Every vehicle is the result of different skills<br />working toward the same horizon.</p></div><div className="aqua-discipline-grid">{disciplines.map((item) => <article className="aqua-discipline-card" key={item.title}><div className="aqua-card-topline"><item.icon /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

      <section className="aqua-section aqua-container aqua-journal"><div className="aqua-section-heading"><div><p className="aqua-eyebrow">What we do</p><h2>Competitions & outreach</h2></div></div><div className="aqua-journal-grid"><Link to="/competitions" className="aqua-journal-card"><div className="aqua-journal-image"><img src="/images/urpcteam2025.jpeg" alt="AquaCore team at URPC 2025" loading="lazy" /><span>COMPETITIONS</span></div><div className="aqua-journal-title"><h3>Putting our ideas to the test.</h3><FiArrowUpRight /></div><p>From URPC to RoboCup and beyond. Explore the challenges that drive our engineering.</p></Link><Link to="/outreach" className="aqua-journal-card"><div className="aqua-journal-image"><img src="/images/rovhandson_1.png" alt="Hands-on robotics workshop" loading="lazy" /><span>COMMUNITY & OUTREACH</span></div><div className="aqua-journal-title"><h3>Curiosity is better shared.</h3><FiArrowUpRight /></div><p>Workshops, conversations, and hands-on learning beyond the classroom.</p></Link></div></section>

      <section className="aqua-container aqua-join-banner"><div><p className="aqua-eyebrow">Join AquaCore</p><h2>Build with us.</h2><p>Bring your curiosity. Let's build something that goes further.</p></div><Link to="/joinus" className="aqua-button">Join the team <FiArrowUpRight /></Link></section>
    </div>
  );
}
