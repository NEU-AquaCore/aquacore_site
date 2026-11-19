import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiGithub, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi';
import { FaBilibili } from 'react-icons/fa6';
import aquacoreLogo from './assets/logos/aquacoreWheelLogo.webp';

const email = 'neu_aquacore@163.com';
export default function Footer() {
  return (
    <footer className="aqua-footer">
      <div className="aqua-container aqua-footer-grid">
        <div className="aqua-footer-about">
          <Link to="/" className="aqua-brand"><img src={aquacoreLogo} alt="" width="40" height="40" loading="lazy" /><span>AQUACORE<small>NEU · 海洋之心</small></span></Link>
          <p>Student minds. Ocean possibilities.<br />Underwater robotics at Northeastern University.</p>
          <div className="aqua-socials">
            <a href="https://github.com/NEU-AquaCore" target="_blank" rel="noopener noreferrer" aria-label="AquaCore on GitHub"><FiGithub /></a>
            <a href="https://www.instagram.com/neu_aquacore" target="_blank" rel="noopener noreferrer" aria-label="AquaCore on Instagram"><FiInstagram /></a>
            <a href="https://space.bilibili.com/3707042529282584" target="_blank" rel="noopener noreferrer" aria-label="AquaCore on Bilibili"><FaBilibili /></a>
            <a href={`mailto:${email}`} aria-label="Email AquaCore"><FiMail /></a>
          </div>
        </div>
        <div className="aqua-footer-links"><span className="aqua-eyebrow">Explore</span><Link to="/vehicles">Our vehicles</Link><Link to="/team">The team</Link><Link to="/competitions">Competitions</Link></div>
        <div className="aqua-footer-links"><span className="aqua-eyebrow">Connect</span><Link to="/outreach">Outreach</Link><Link to="/sponsors">Our sponsors</Link><Link to="/joinus">Join the team</Link><Link to="/contact">Contact us</Link></div>
        <div className="aqua-footer-contact"><span className="aqua-eyebrow">Let&apos;s build something</span><a href={`mailto:${email}`}>{email}<FiArrowUpRight /></a><p>Northeastern University<br />Shenyang, China</p><details className="aqua-mail-options"><summary>More ways to email</summary><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer">Open Gmail <FiArrowUpRight /></a><a href={`https://outlook.live.com/mail/0/deeplink/compose?to=${email}`} target="_blank" rel="noopener noreferrer">Open Outlook <FiArrowUpRight /></a></details></div>
      </div>
      <div className="aqua-container aqua-footer-bottom">
        <span>© {new Date().getFullYear()} AquaCore NEU</span>
        <span>Built with curiosity. Made for the ocean.</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">ICP备2026055680号-1</a>
        <a href="#main-content">Back to top <FiArrowUp /></a>
      </div>
    </footer>
  );
}
