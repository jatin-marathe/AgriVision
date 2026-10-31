import Navbar from '../../components/home/Navbar';
import Hero from '../../components/home/Hero';
import FeaturesSection from '../../components/home/FeaturesSection';
import HowItWorks from '../../components/home/HowItWorks';
import Footer from '../../components/home/Footer';

const HomePage = () => (
    <div className="home-page">
        <Navbar />
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <Footer />
    </div>
);

export default HomePage;
