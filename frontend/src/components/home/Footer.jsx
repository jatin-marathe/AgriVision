import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';

const FOOTER_COLUMNS = [
  {
    heading: 'Features',
    links: [
      { label: 'Crop Recommendation', path: '/crop-recommendation' },
      { label: 'Yield Prediction', path: '/yield-prediction' },
      { label: 'Disease Alert', path: '/disease-detection' },
      { label: 'Fertilizer Guide', path: '/fertilizer-guide' },
      { label: 'Weather Forecast', path: '/' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Crop Calendar', path: '/' },
      { label: 'Best Practices', path: '/' },
      { label: 'Market Prices', path: '/' },
      { label: 'Support', path: '/' },
    ],
  },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__grid">
      <div className="site-footer__brand-col">
        <span className="site-footer__brand">
          <GiPlantSeed size={20} /> AgriVision
        </span>
        <p className="site-footer__tagline" style={{ color: 'var(--color-bg-alt)' }}>
          Empowering farmers with AI-driven agricultural insights for sustainable and productive
          farming.
        </p>
        <div className="site-footer__social">
          <a href="#" aria-label="Facebook"><FiFacebook size={16} /></a>
          <a href="#" aria-label="Twitter"><FiTwitter size={16} /></a>
          <a href="#" aria-label="Instagram"><FiInstagram size={16} /></a>
          <a href="#" aria-label="LinkedIn"><FiLinkedin size={16} /></a>
        </div>
      </div>

      {FOOTER_COLUMNS.map((col) => (
        <div key={col.heading} className="site-footer__col">
          <h4>{col.heading}</h4>
          <ul>
            {col.links.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="site-footer__col">
        <h4>Contact Info</h4>
        <ul className="site-footer__contact">
          <li><FiMapPin size={14} /> 123 Agriculture St, Farm City</li>
          <li><FiPhone size={14} /> +91 84216 33999</li>
          <li><FiMail size={14} /> jatinmarathe6107@gmail.com</li>
        </ul>
      </div>
    </div>

    <div className="site-footer__bottom">
      <span>© {new Date().getFullYear()} AgriVision. All rights reserved.</span>
      <div className="site-footer__bottom-links">
        <Link to="/login">Privacy Policy</Link>
        <Link to="/login">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
