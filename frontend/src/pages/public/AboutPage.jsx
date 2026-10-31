// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiTrendingUp, FiUsers, FiGlobe, FiPhone } from 'react-icons/fi';
// import { FaBug, FaFlask, FaCloudSun, FaBrain, FaPython, FaDatabase, FaCloud } from 'react-icons/fa';
// import { GiPlantSeed, GiLeafSwirl } from 'react-icons/gi';

// const BRAND = 'AgriVision';

// const MISSION_STATS = [
//   { value: '10K+', label: 'Happy Farmers' },
//   { value: '95%', label: 'Accuracy Rate' },
//   { value: '50+', label: 'Crop Types' },
//   { value: '24/7', label: 'Support' },
// ];

// const OFFERS = [
//   {
//     icon: <FiTrendingUp size={28} />,
//     tone: 'teal',
//     title: 'Yield Prediction',
//     text: 'Advanced machine learning models predict crop yields with 95% accuracy, helping farmers plan better and maximize profits.',
//   },
//   {
//     icon: <FaBug size={26} />,
//     tone: 'red',
//     title: 'Disease Detection',
//     text: 'Early warning system for crop diseases based on environmental conditions, preventing significant crop losses.',
//   },
//   {
//     icon: <FaFlask size={26} />,
//     tone: 'amber',
//     title: 'Fertilizer Guidance',
//     text: 'Personalized NPK recommendations based on crop type, soil conditions, and growth stage for optimal nutrition.',
//   },
//   {
//     icon: <FaCloudSun size={28} />,
//     tone: 'sky',
//     title: 'Weather Forecasting',
//     text: 'Long-term weather predictions help farmers plan planting, irrigation, and harvesting activities effectively.',
//   },
// ];

// const TECH = [
//   { icon: <FaPython size={18} />, tone: 'blue', label: 'Python & Scikit-learn' },
//   { icon: <FaDatabase size={18} />, tone: 'teal', label: 'Big Data Analytics' },
//   { icon: <FaBrain size={18} />, tone: 'amber', label: 'Machine Learning' },
//   { icon: <FaCloud size={18} />, tone: 'sky', label: 'Cloud Computing' },
// ];

// const MODEL_STATS = [
//   { value: '95%', label: 'Prediction Accuracy' },
//   { value: '1M+', label: 'Data Points' },
//   { value: '50+', label: 'Crop Varieties' },
//   { value: '10+', label: 'Years of Data' },
// ];

// const IMPACT = [
//   {
//     icon: <GiLeafSwirl size={44} />,
//     tone: 'teal',
//     title: 'Sustainable Farming',
//     text: 'Promoting eco-friendly agricultural practices through optimized resource usage and reduced chemical dependency.',
//   },
//   {
//     icon: <FiUsers size={44} />,
//     tone: 'blue',
//     title: 'Farmer Empowerment',
//     text: 'Providing smallholder farmers with access to advanced agricultural intelligence traditionally available only to large farms.',
//   },
//   {
//     icon: <FiGlobe size={44} />,
//     tone: 'sky',
//     title: 'Food Security',
//     text: 'Contributing to global food security by helping farmers increase yields and reduce post-harvest losses.',
//   },
// ];

// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 16 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, amount: 0.2 },
//   transition: { duration: 0.5, delay },
// });

// const About = () => (
//   <main className="about">
//     {/* Hero */}
//     <section className="about-hero">
//       <motion.h1
//         className="about-hero__title"
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         About {BRAND}
//       </motion.h1>
//       <motion.p
//         className="about-hero__subtitle"
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         Empowering farmers with cutting-edge AI technology for smarter, more sustainable
//         agriculture.
//       </motion.p>
//     </section>

//     {/* Our Mission */}
//     <section className="about-section">
//       <div className="about-container about-mission">
//         <motion.div {...fadeUp()}>
//           <h2 className="about-title about-title--left">Our Mission</h2>
//           <p className="about-mission__lead">
//             To revolutionize agriculture through artificial intelligence, making farming more
//             productive, sustainable, and profitable for farmers worldwide.
//           </p>
//           <p className="about-mission__text">
//             We believe that technology can solve the world&apos;s greatest agricultural challenges.
//             Our platform combines machine learning, big data analytics, and agricultural expertise
//             to provide farmers with actionable insights that drive better crop outcomes.
//           </p>
//         </motion.div>

//         <motion.div className="about-stats" {...fadeUp(0.1)}>
//           {MISSION_STATS.map((s) => (
//             <div key={s.label} className="about-stats__box">
//               <strong>{s.value}</strong>
//               <span>{s.label}</span>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>

//     {/* What We Offer */}
//     <section className="about-section about-section--soft">
//       <div className="about-container">
//         <motion.div className="about-heading" {...fadeUp()}>
//           <h2 className="about-title">What We Offer</h2>
//           <p className="about-subtitle">Comprehensive agricultural intelligence solutions</p>
//         </motion.div>

//         <div className="about-offers">
//           {OFFERS.map((o, i) => (
//             <motion.div key={o.title} className="about-offer" {...fadeUp(i * 0.08)}>
//               <span className={`about-offer__icon about-tone--${o.tone}`}>{o.icon}</span>
//               <div>
//                 <h3>{o.title}</h3>
//                 <p>{o.text}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* Our Technology */}
//     <section className="about-section">
//       <div className="about-container about-tech">
//         <motion.div {...fadeUp()}>
//           <h2 className="about-title about-title--left">Our Technology</h2>
//           <p className="about-mission__text">
//             {BRAND} is built on state-of-the-art machine learning algorithms trained on extensive
//             agricultural datasets from around the world. Our models continuously learn and improve,
//             providing increasingly accurate predictions.
//           </p>
//           <div className="about-tech__chips">
//             {TECH.map((t) => (
//               <div key={t.label} className="about-tech__chip">
//                 <span className={`about-tone--${t.tone}`}>{t.icon}</span>
//                 {t.label}
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div className="about-models" {...fadeUp(0.1)}>
//           <h3>Our AI Models</h3>
//           <div className="about-models__grid">
//             {MODEL_STATS.map((s) => (
//               <div key={s.label}>
//                 <strong>{s.value}</strong>
//                 <span>{s.label}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>

//     {/* Our Impact */}
//     <section className="about-section about-section--soft">
//       <div className="about-container">
//         <motion.div className="about-heading" {...fadeUp()}>
//           <h2 className="about-title">Our Impact</h2>
//           <p className="about-subtitle">Making a difference in agricultural communities worldwide</p>
//         </motion.div>

//         <div className="about-impact">
//           {IMPACT.map((item, i) => (
//             <motion.div key={item.title} className="about-impact__card" {...fadeUp(i * 0.1)}>
//               <span className={`about-impact__icon about-tone--${item.tone}`}>{item.icon}</span>
//               <h3>{item.title}</h3>
//               <p>{item.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* CTA */}
//     <section className="about-section about-cta">
//       <motion.div {...fadeUp()}>
//         <h2 className="about-title">Ready to Transform Your Farming?</h2>
//         <p className="about-cta__text">
//           Join thousands of farmers who are already using {BRAND} to make smarter farming
//           decisions.
//         </p>
//         <div className="about-cta__actions">
//           <Link to="/register" className="about-btn about-btn--primary">
//             <GiPlantSeed size={18} /> Start Predicting
//           </Link>
//           <a href="mailto:info@agrivision.app" className="about-btn about-btn--outline">
//             <FiPhone size={16} /> Contact Us
//           </a>
//         </div>
//       </motion.div>
//     </section>
//   </main>
// );

// export default About;


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiUsers, FiGlobe, FiPhone } from 'react-icons/fi';
import { FaBug, FaFlask, FaCloudSun, FaBrain, FaPython, FaDatabase, FaCloud } from 'react-icons/fa';
import { GiPlantSeed, GiLeafSwirl } from 'react-icons/gi';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';

const BRAND = 'AgriVision';

const MISSION_STATS = [
  { value: '10K+', label: 'Happy Farmers' },
  { value: '95%', label: 'Accuracy Rate' },
  { value: '50+', label: 'Crop Types' },
  { value: '24/7', label: 'Support' },
];

const OFFERS = [
  { icon: <FiTrendingUp size={28} />, tone: 'teal', title: 'Yield Prediction', text: 'Advanced machine learning models predict crop yields with 95% accuracy, helping farmers plan better and maximize profits.' },
  { icon: <FaBug size={26} />, tone: 'red', title: 'Disease Detection', text: 'Early warning system for crop diseases based on environmental conditions, preventing significant crop losses.' },
  { icon: <FaFlask size={26} />, tone: 'amber', title: 'Fertilizer Guidance', text: 'Personalized NPK recommendations based on crop type, soil conditions, and growth stage for optimal nutrition.' },
  { icon: <FaCloudSun size={28} />, tone: 'sky', title: 'Weather Forecasting', text: 'Long-term weather predictions help farmers plan planting, irrigation, and harvesting activities effectively.' },
];

const TECH = [
  { icon: <FaPython size={18} />, tone: 'blue', label: 'Python & Scikit-learn' },
  { icon: <FaDatabase size={18} />, tone: 'teal', label: 'Big Data Analytics' },
  { icon: <FaBrain size={18} />, tone: 'amber', label: 'Machine Learning' },
  { icon: <FaCloud size={18} />, tone: 'sky', label: 'Cloud Computing' },
];

const MODEL_STATS = [
  { value: '95%', label: 'Prediction Accuracy' },
  { value: '1M+', label: 'Data Points' },
  { value: '50+', label: 'Crop Varieties' },
  { value: '10+', label: 'Years of Data' },
];

const IMPACT = [
  { icon: <GiLeafSwirl size={44} />, tone: 'teal', title: 'Sustainable Farming', text: 'Promoting eco-friendly agricultural practices through optimized resource usage and reduced chemical dependency.' },
  { icon: <FiUsers size={44} />, tone: 'blue', title: 'Farmer Empowerment', text: 'Providing smallholder farmers with access to advanced agricultural intelligence traditionally available only to large farms.' },
  { icon: <FiGlobe size={44} />, tone: 'sky', title: 'Food Security', text: 'Contributing to global food security by helping farmers increase yields and reduce post-harvest losses.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const AboutPage = () => (
  <div className="about-page">
    <Navbar />

    <main className="about">
      <section className="about-hero">
        <motion.h1 className="about-hero__title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          About {BRAND}
        </motion.h1>
        <motion.p className="about-hero__subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          Empowering farmers with cutting-edge AI technology for smarter, more sustainable agriculture.
        </motion.p>
      </section>

      <section className="about-section">
        <div className="about-container about-mission">
          <motion.div {...fadeUp()}>
            <h2 className="about-title about-title--left">Our Mission</h2>
            <p className="about-mission__lead">
              To revolutionize agriculture through artificial intelligence, making farming more
              productive, sustainable, and profitable for farmers worldwide.
            </p>
            <p className="about-mission__text">
              We believe that technology can solve the world&apos;s greatest agricultural challenges.
              Our platform combines machine learning, big data analytics, and agricultural expertise
              to provide farmers with actionable insights that drive better crop outcomes.
            </p>
          </motion.div>

          <motion.div className="about-stats" {...fadeUp(0.1)}>
            {MISSION_STATS.map((s) => (
              <div key={s.label} className="about-stats__box">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="about-section about-section--soft">
        <div className="about-container">
          <motion.div className="about-heading" {...fadeUp()}>
            <h2 className="about-title">What We Offer</h2>
            <p className="about-subtitle">Comprehensive agricultural intelligence solutions</p>
          </motion.div>

          <div className="about-offers">
            {OFFERS.map((o, i) => (
              <motion.div key={o.title} className="about-offer" {...fadeUp(i * 0.08)}>
                <span className={`about-offer__icon about-tone--${o.tone}`}>{o.icon}</span>
                <div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container about-tech">
          <motion.div {...fadeUp()}>
            <h2 className="about-title about-title--left">Our Technology</h2>
            <p className="about-mission__text">
              {BRAND} is built on state-of-the-art machine learning algorithms trained on extensive
              agricultural datasets from around the world. Our models continuously learn and improve,
              providing increasingly accurate predictions.
            </p>
            <div className="about-tech__chips">
              {TECH.map((t) => (
                <div key={t.label} className="about-tech__chip">
                  <span className={`about-tone--${t.tone}`}>{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="about-models" {...fadeUp(0.1)}>
            <h3>Our AI Models</h3>
            <div className="about-models__grid">
              {MODEL_STATS.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about-section about-section--soft">
        <div className="about-container">
          <motion.div className="about-heading" {...fadeUp()}>
            <h2 className="about-title">Our Impact</h2>
            <p className="about-subtitle">Making a difference in agricultural communities worldwide</p>
          </motion.div>

          <div className="about-impact">
            {IMPACT.map((item, i) => (
              <motion.div key={item.title} className="about-impact__card" {...fadeUp(i * 0.1)}>
                <span className={`about-impact__icon about-tone--${item.tone}`}>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-cta">
        <motion.div {...fadeUp()}>
          <h2 className="about-title">Ready to Transform Your Farming?</h2>
          <p className="about-cta__text">
            Join thousands of farmers who are already using {BRAND} to make smarter farming decisions.
          </p>
          <div className="about-cta__actions">
            <Link to="/register" className="about-btn about-btn--primary">
              <GiPlantSeed size={18} /> Start Predicting
            </Link>
            <a href="mailto:info@agrivision.app" className="about-btn about-btn--outline">
              <FiPhone size={16} /> Contact Us
            </a>
          </div>
        </motion.div>
      </section>
    </main>

    <Footer />
  </div>
);

export default AboutPage;