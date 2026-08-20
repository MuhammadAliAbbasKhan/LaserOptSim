import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastNotification } from './components/common/ToastNotification';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { CheckoutModal } from './components/common/CheckoutModal';
import { TrialModal } from './components/common/TrialModal';

import { DesignerPage } from './pages/DesignerPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ShopPage } from './pages/ShopPage';
import { SupportPage } from './pages/SupportPage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { LegalNoticePage } from './pages/LegalNoticePage';
import { PrivacyStatementPage } from './pages/PrivacyStatementPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { ServiceSpecificationPage } from './pages/ServiceSpecificationPage';
import { HowToOrderPage } from './pages/HowToOrderPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Sub-routes Pages
import { FunctionsPage } from './pages/FunctionsPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { BasicsPage } from './pages/BasicsPage';
import { ProductVideosPage } from './pages/ProductVideosPage';
import { BrochurePage } from './pages/BrochurePage';
import { PartnersPage } from './pages/PartnersPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { SystemRequirementsPage } from './pages/SystemRequirementsPage';
import { DemoVersionPage } from './pages/DemoVersionPage';
import { TutorialTipsPage } from './pages/TutorialTipsPage';
import { FAQPage } from './pages/FAQPage';
import { HandbookPage } from './pages/HandbookPage';
import { ChangelogPage } from './pages/ChangelogPage';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('designer');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminPasscode');
    if (currentPage === 'admin') {
      setCurrentPage('designer');
    }
  };

  const handleOpenCheckout = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'designer':
        return (
          <DesignerPage 
            onOpenTrial={() => setIsTrialOpen(true)}
            onOpenCheckout={handleOpenCheckout}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'applications':
        return (
          <ApplicationsPage 
            onOpenTrial={() => setIsTrialOpen(true)}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'shop':
        return (
          <ShopPage 
            onOpenCheckout={handleOpenCheckout}
            onOpenTrial={() => setIsTrialOpen(true)}
          />
        );
      case 'support':
        return <SupportPage />;
      case 'whoweare':
        return <WhoWeArePage />;
      case 'legal':
        return <LegalNoticePage />;
      case 'privacy':
        return <PrivacyStatementPage />;
      case 'terms':
        return <TermsConditionsPage />;
      case 'servicespecs':
        return <ServiceSpecificationPage />;
      case 'howtoorder':
        return (
          <HowToOrderPage 
            setCurrentPage={setCurrentPage}
            onOpenTrial={() => setIsTrialOpen(true)}
          />
        );
      case 'admin':
        return <AdminDashboardPage currentUser={currentUser} />;

      // Header Dropdown Sub-routes
      case 'functions':
        return <FunctionsPage onOpenTrial={() => setIsTrialOpen(true)} setCurrentPage={setCurrentPage} />;
      case 'benefits':
        return <BenefitsPage onOpenTrial={() => setIsTrialOpen(true)} />;
      case 'basics':
        return <BasicsPage />;
      case 'productvideos':
        return <ProductVideosPage />;
      case 'brochure':
        return <BrochurePage />;
      case 'partners':
        return <PartnersPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'systemrequirements':
        return <SystemRequirementsPage />;
      case 'demoversion':
        return <DemoVersionPage />;
      case 'tutorialtips':
        return <TutorialTipsPage setCurrentPage={setCurrentPage} />;
      case 'faq':
        return <FAQPage />;
      case 'handbook':
        return <HandbookPage />;
      case 'changelog':
        return <ChangelogPage />;

      default:
        return (
          <DesignerPage 
            onOpenTrial={() => setIsTrialOpen(true)}
            onOpenCheckout={handleOpenCheckout}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Django Response Banner Notification */}
      <ToastNotification />

      {/* BeamXpert Replica Header */}
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTrial={() => setIsTrialOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* BeamXpert Replica Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Overlay Modals */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setCurrentPage={setCurrentPage}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        setCurrentUser={setCurrentUser}
        setCurrentPage={setCurrentPage}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <TrialModal 
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
      />

    </div>
  );
};

export default App;
