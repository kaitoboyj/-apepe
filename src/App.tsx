import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RevolutionBanner from './components/RevolutionBanner'
import EVMSection from './components/EVMSection'
import CompetitiveAdvantage from './components/CompetitiveAdvantage'
import FeatureCards from './components/FeatureCards'
import Footer from './components/Footer'
import Draggable3DApe from './components/Draggable3DApe'

function App() {
  return (
    <div className="relative min-h-screen bg-apepe-bg">
      <ParticleBackground />
      <Draggable3DApe />
      <Navbar />
      <main>
        <Hero />
        <RevolutionBanner />
        <EVMSection />
        <CompetitiveAdvantage />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  )
}

export default App
