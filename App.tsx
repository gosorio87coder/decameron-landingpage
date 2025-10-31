import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteFormModal from './components/QuoteModal';
import LoadingSpinner from './components/LoadingSpinner';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { QuoteDetails } from './types';

// Lazy load the single page component we need
const PuntaSalPage = lazy(() => import('./pages/PuntaSalPage'));

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);

  const openQuoteModal = (details?: QuoteDetails) => {
    setQuoteDetails(details || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteDetails(null);
  };

  return (
    <div className="bg-white text-[#0D2B5B]">
      <Header onOpenQuote={openQuoteModal} />
      <main className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <PuntaSalPage onOpenQuote={openQuoteModal} />
        </Suspense>
      </main>
      <Footer />
      <QuoteFormModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} details={quoteDetails} />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default App;