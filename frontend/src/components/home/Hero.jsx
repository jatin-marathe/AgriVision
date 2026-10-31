import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiInfo } from 'react-icons/fi';
import { GiPlantSeed, GiLeafSwirl } from 'react-icons/gi';
import { WiDaySunnyOvercast } from 'react-icons/wi';
const floatCards = [
  { icon: <GiPlantSeed size={20} />, label: '95% Accuracy', style: { top: '18%', left: '58%' } },
  {
    icon: <GiLeafSwirl size={20} />,
    label: 'Disease Detection',
    style: { top: '46%', left: '74%' },
  },
  {
    icon: <WiDaySunnyOvercast size={26} />,
    label: 'Weather Forecast',
    style: { top: '68%', left: '55%' },
  },
];

const Hero = () => (
  <section className="hero">
    <div className="hero__content">
      <motion.h1
        className="hero__title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Smart Agriculture
        <br />
        with <span className="hero__title-accent">AI Predictions</span>
      </motion.h1>

      <motion.p
        className="hero__subtitle"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Revolutionize your farming with cutting-edge AI technology. Get accurate crop yield
        predictions, disease alerts, fertilizer recommendations, and weather forecasts all in one
        platform.
      </motion.p>

      <motion.div
        className="hero__actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >

        <Link
          to="/#features"
          className="hero__btn hero__btn--primary"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('features')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
        >
          <FiBarChart2 size={16} /> Start Predicting
        </Link>

        <Link to="/about" className="hero__btn hero__btn--outline">
          <FiInfo size={16} /> Learn More
        </Link>
      </motion.div>
    </div>

    <div className="hero__visual">
      {floatCards.map((card, i) => (
        <motion.div
          key={card.label}
          className="hero__float-card"
          style={card.style}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.3 + i * 0.15 },
            scale: { duration: 0.5, delay: 0.3 + i * 0.15 },
            y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
          }}
        >
          <span className="hero__float-icon">{card.icon}</span>
          <span>{card.label}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Hero;
