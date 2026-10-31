// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiTrendingUp, FiUsers, FiArrowRight } from 'react-icons/fi';
// import { GiSpottedBug, GiRoundBottomFlask, GiPlantSeed } from 'react-icons/gi';
// import { WiDaySunnyOvercast } from 'react-icons/wi';

// const FEATURES = [
//   {
//     icon: <GiPlantSeed size={26} />,
//     title: 'Crop Recommendation',
//     description:
//       'Get AI-powered suggestions for the best crops to grow based on your soil, climate, and farming conditions.',
//   },
//   {
//     icon: <FiTrendingUp size={26} />,
//     title: 'Yield Prediction',
//     description:
//       'Predict crop yields with high accuracy using weather data, soil conditions, and historical patterns.',
//   },
//   {
//     icon: <GiSpottedBug size={26} />,
//     title: 'Disease Detection',
//     description:
//       'Early detection and prevention of crop diseases to protect your harvest and reduce losses.',
//   },
//   {
//     icon: <GiRoundBottomFlask size={26} />,
//     title: 'Fertilizer Guide',
//     description:
//       'Get personalized fertilizer recommendations based on crop type, soil condition, and growth stage.',
//   },
//   {
//     icon: <WiDaySunnyOvercast size={30} />,
//     title: 'Weather Forecast',
//     description: 'Advanced weather predictions to help you plan farming activities and protect your crops.',
//   },
//   {
//     icon: <FiUsers size={26} />,
//     title: 'Farmer Connect',
//     description: 'Join our community of farmers to share knowledge, experiences, and grow together.',
//     highlighted: true,
//     ctaLabel: 'Join Now',
//   },
// ];

// const FeaturesSection = () => (
//   <section className="features">
//     <div className="features__header">
//       <h2 className="features__title">Powerful Features for Modern Farming</h2>
//       <p className="features__subtitle">
//         Leverage the power of artificial intelligence to make informed decisions and maximize
//         your agricultural productivity.
//       </p>
//     </div>

//     <div className="features__grid">
//       {FEATURES.map((feature, i) => (
//         <motion.div
//           key={feature.title}
//           className={`feature-card${feature.highlighted ? ' feature-card--highlighted' : ''}`}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-60px' }}
//           transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
//         >
//           <span className="feature-card__icon">{feature.icon}</span>
//           <h3 className="feature-card__title">{feature.title}</h3>
//           <p className="feature-card__description">{feature.description}</p>
//           <Link to="/login" className="feature-card__cta">
//             {feature.ctaLabel || 'Try Now'} <FiArrowRight size={14} />
//           </Link>
//         </motion.div>
//       ))}
//     </div>
//   </section>
// );

// export default FeaturesSection;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiUsers, FiArrowRight } from 'react-icons/fi';
import { GiSpottedBug, GiRoundBottomFlask, GiPlantSeed } from 'react-icons/gi';
import { WiDaySunnyOvercast } from 'react-icons/wi';

const FEATURES = [
  {
    icon: <GiPlantSeed size={26} />,
    title: 'Crop Recommendation',
    description:
      'Get AI-powered suggestions for the best crops to grow based on your soil, climate, and farming conditions.',
    link: '/crop-recommendation',
  },
  {
    icon: <FiTrendingUp size={26} />,
    title: 'Yield Prediction',
    description:
      'Predict crop yields with high accuracy using weather data, soil conditions, and historical patterns.',
    link: '/yield-prediction',
  },
  {
    icon: <GiSpottedBug size={26} />,
    title: 'Disease Detection',
    description:
      'Early detection and prevention of crop diseases to protect your harvest and reduce losses.',
    link: '/disease-detection',
  },
  {
    icon: <GiRoundBottomFlask size={26} />,
    title: 'Fertilizer Guide',
    description:
      'Get personalized fertilizer recommendations based on crop type, soil condition, and growth stage.',
    link: '/fertilizer-guide',
  },
  {
    icon: <WiDaySunnyOvercast size={30} />,
    title: 'Weather Forecast',
    description:
      'Advanced weather predictions to help you plan farming activities and protect your crops.',
    link: '/weather',
  },
  {
    icon: <FiUsers size={26} />,
    title: 'Farmer Connect',
    description:
      'Join our community of farmers to share knowledge, experiences, and grow together.',
    highlighted: true,
    ctaLabel: 'Join Now',
    link: '/farmer-connect',
  },
];

const FeaturesSection = () => (
  <section className="features" id="features">
    <div className="features__header">
      <h2 className="features__title">Powerful Features for Modern Farming</h2>
      <p className="features__subtitle">
        Leverage the power of artificial intelligence to make informed decisions and maximize
        your agricultural productivity.
      </p>
    </div>

    <div className="features__grid">
      {FEATURES.map((feature, i) => (
        <motion.div
          key={feature.title}
          className={`feature-card${feature.highlighted ? ' feature-card--highlighted' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
        >
          <span className="feature-card__icon">{feature.icon}</span>
          <h3 className="feature-card__title">{feature.title}</h3>
          <p className="feature-card__description">{feature.description}</p>
          <Link to={feature.link} className="feature-card__cta">
            {feature.ctaLabel || 'Try Now'} <FiArrowRight size={14} />
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;