import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollytellingLayout } from './components/layout/ScrollytellingLayout';
import { ProgressBar } from './components/ui/ProgressBar';
import { LightboxProvider } from './context/LightboxContext';
import { ImageLightbox } from './components/lightbox/ImageLightbox';
import { timelineData } from './data/timelineData';

function App() {
  return (
    <LightboxProvider phases={timelineData.phases}>
      <ProgressBar />
      <Header metadata={timelineData.metadata} />
      <main>
        <ScrollytellingLayout phases={timelineData.phases} />
      </main>
      <Footer />
      <ImageLightbox />
    </LightboxProvider>
  );
}

export default App;
