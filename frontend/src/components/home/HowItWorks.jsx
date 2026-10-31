import { motion } from 'framer-motion';
import { FiUpload, FiCpu, FiPieChart } from 'react-icons/fi';

const STEPS = [
  {
    icon: <FiUpload size={26} />,
    title: 'Input Data',
    description:
      'Enter your farm details, crop information, and environmental conditions through our user-friendly interface.',
  },
  {
    icon: <FiCpu size={26} />,
    title: 'AI Analysis',
    description:
      'Our advanced machine learning algorithms analyze your data and generate accurate predictions and recommendations.',
  },
  {
    icon: <FiPieChart size={26} />,
    title: 'Get Results',
    description:
      'Receive detailed insights, predictions, and actionable recommendations to optimize your farming practices.',
  },
];

const HowItWorks = () => (
  <section className="how-it-works">
    <div className="how-it-works__header">
      <h2 className="how-it-works__title">How It Works</h2>
      <p className="how-it-works__subtitle">
        Our AI-powered platform makes agricultural predictions simple and accurate in just three
        steps.
      </p>
    </div>

    <div className="how-it-works__steps">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.title}
          className="how-it-works__step"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.12 }}
        >
          <span className="how-it-works__badge">{i + 1}</span>
          <span className="how-it-works__icon">{step.icon}</span>
          <h3 className="how-it-works__step-title">{step.title}</h3>
          <p className="how-it-works__step-description">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
