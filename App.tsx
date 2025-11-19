import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteFormModal from './components/QuoteModal';
import InsuranceFormModal from './components/InsuranceFormModal';
import LoadingSpinner from './components/LoadingSpinner';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { QuoteDetails } from './types';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const PuntaSalPage = lazy(() => import('./pages/PuntaSalPage'));
const IquitosLodgePage = lazy(() => import('./pages/IquitosLodgePage'));
const CuscoPage = lazy(() => import('./pages/CuscoPage'));
const CubaPage = lazy(() => import('./pages/CubaPage'));
const CartagenaPage = lazy(() => import('./pages/CartagenaPage'));
const EuropaPage = lazy(() => import('./pages/EuropaPage'));

type Page = 'home' | 'punta-sal' | 'iquitos' | 'cusco' | 'cuba' | 'cartagena' | 'europa';

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  // Default to 'punta-sal' instead of 'home'
  const [activePage, setActivePage] = useState<Page>('punta-sal');
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  const [shouldScrollToCalendar, setShouldScrollToCalendar] = useState(false);

  const openQuoteModal = (details?: QuoteDetails) => {
    setQuoteDetails(details || null);
    setIsQuoteModalOpen(true);
  };
  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteDetails(null);
  };

  const openInsuranceModal = () => setIsInsuranceModalOpen(true);
  const closeInsuranceModal = () => setIsInsuranceModalOpen(false);
  
  const handleGoBack = () => {
    setActivePage('home');
    window.scrollTo(0, 0);
  };

  const handlePackageSelect = (id: number) => {
    let page: Page = 'home';
    switch (id) {
      case 1: page = 'punta-sal'; break;
      case 2: page = 'iquitos'; break;
      case 3: page = 'cusco'; break;
      case 7: page = 'cuba'; break;
      case 8: page = 'cartagena'; break;
      case 9: page = 'europa'; break;
      default:
        openQuoteModal();
        return;
    }
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const handleHeaderCotizaClick = (details?: QuoteDetails) => {
    // Redirect to Punta Sal calendar section regardless of details
    setActivePage('punta-sal');
    setShouldScrollToCalendar(true);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'punta-sal': 
        return (
          <PuntaSalPage 
            onOpenQuote={openQuoteModal} 
            shouldScrollToCalendar={shouldScrollToCalendar}
            onScrollComplete={() => setShouldScrollToCalendar(false)}
          />
        );
      case 'iquitos': return <IquitosLodgePage onOpenQuote={openQuoteModal} />;
      case 'cusco': return <CuscoPage onOpenQuote={openQuoteModal} />;
      case 'cuba': return <CubaPage onOpenQuote={openQuoteModal} />;
      case 'cartagena': return <CartagenaPage onOpenQuote={openQuoteModal} />;
      case 'europa': return <EuropaPage onOpenQuote={openQuoteModal} />;
      case 'home':
      default:
        return <HomePage onPackageSelect={handlePackageSelect} onOpenQuote={openQuoteModal} onOpenInsurance={openInsuranceModal} />;
    }
  };

  return (
    <div className="bg-white text-[#0D2B5B]">
      {/* showBack forced to false to prevent navigation to home */}
      <Header onOpenQuote={handleHeaderCotizaClick} showBack={false} onBack={handleGoBack} />
      <main className={activePage !== 'home' ? 'pt-20' : ''}>
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
      <QuoteFormModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} details={quoteDetails} />
      <InsuranceFormModal isOpen={isInsuranceModalOpen} onClose={closeInsuranceModal} />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default App;
