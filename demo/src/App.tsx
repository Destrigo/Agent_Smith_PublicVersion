import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import AgentTrace from './components/AgentTrace'
import BenchmarkSection from './components/BenchmarkSection'
import Footer from './components/Footer'

const App = () => (
  <div className="min-h-screen bg-bg text-slate-200">
    <Navbar />
    <main>
      <Hero />
      <HowItWorks />
      <AgentTrace />
      <BenchmarkSection />
    </main>
    <Footer />
  </div>
)

export default App
