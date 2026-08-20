import React, { useState } from 'react';
import { Search, Globe, User, ShieldCheck, Download, Sparkles, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Header = ({ currentPage, setCurrentPage, onOpenSearch, onOpenAuth, currentUser, onLogout, onOpenTrial }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  
  // State for active open dropdown menu & mobile drawer
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm font-sans border-b border-slate-200 overflow-x-hidden">
      {/* Top Header Row (Logo, Search, Language Switcher) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-2">
        
        {/* Logo Block (BeamXpert Replica Logo Layout) */}
        <div 
          onClick={() => handleNavClick('designer')}
          className="cursor-pointer group flex flex-col select-none"
        >
          <div className="flex items-center gap-2">
            {/* Geometric Optical Icon */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-md flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M20 4L4 20" />
                <circle cx="12" cy="12" r="3" fill="#ffffff" />
              </svg>
            </div>
            {/* Brand Title */}
            <div className="flex items-baseline">
              <span className="text-xl sm:text-3xl font-medium tracking-tight text-slate-800">LaserOpt</span>
              <span className="text-xl sm:text-3xl font-bold tracking-tight text-blue-600">Sim</span>
            </div>
          </div>

          {/* Underline Divider & Tagline */}
          <div className="w-full mt-0.5 sm:mt-1">
            <div className="h-[2px] sm:h-[2.5px] w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 rounded-full"></div>
            <span className="text-[10px] sm:text-sm font-normal text-cyan-600 tracking-wider block mt-0.5 font-sans">
              {t('slogan')}
            </span>
          </div>
        </div>

        {/* Right Top Controls (Search & Language Switcher DE | EN) */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {/* Quick Search Icon */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
            title="Search Site"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">{t('search')}</span>
          </button>

          {/* Language Switcher DE | EN */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1 text-xs font-semibold">
            <button 
              onClick={() => toggleLanguage('DE')}
              className={`px-2.5 py-1 rounded transition-colors ${lang === 'DE' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              DE
            </button>
            <span className="text-slate-300 px-1">|</span>
            <button 
              onClick={() => toggleLanguage('EN')}
              className={`px-2.5 py-1 rounded transition-colors ${lang === 'EN' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              EN
            </button>
          </div>

          {/* User Authenticated Widget vs Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                <User className="w-4 h-4 text-cyan-400" />
                <span className="max-w-[120px] truncate">{currentUser.username}</span>
                <span className="bg-blue-600 text-white text-[10px] uppercase px-1.5 py-0.5 rounded font-bold">
                  {currentUser.is_admin ? 'ADMIN' : (currentUser.plan_tier || 'FREE')}
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded-lg transition-colors"
                title="Log Out of Workspace"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="text-xs font-bold text-slate-700 hover:text-blue-600 px-3.5 py-1.5 border border-slate-300 rounded-lg hover:border-blue-500 transition-colors shadow-sm bg-white"
            >
              {t('login')}
            </button>
          )}
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Visible when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#e5ebf2] border-t border-[#c5d3e2] p-4 space-y-3 font-sans text-xs font-semibold text-slate-800">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">LaserOptSimDESIGNER</div>
            <button onClick={() => handleNavClick('designer')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">Software Overview</button>
            <button onClick={() => handleNavClick('functions')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subFunctions')}</button>
            <button onClick={() => handleNavClick('benefits')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subBenefits')}</button>
            <button onClick={() => handleNavClick('basics')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subBasics')}</button>
            <button onClick={() => handleNavClick('productvideos')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subProductVideos')}</button>
            <button onClick={() => handleNavClick('brochure')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subBrochure')}</button>
            <button onClick={() => handleNavClick('systemrequirements')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subSysReqs')}</button>
          </div>
          <div className="border-t border-slate-300 pt-2 space-y-1">
            <button onClick={() => handleNavClick('applications')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block font-bold text-blue-700">{t('navApplications')}</button>
            <button onClick={() => handleNavClick('shop')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block font-bold text-blue-700">Pricing Store ⚡</button>
          </div>
          <div className="border-t border-slate-300 pt-2 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">Support & Docs</div>
            <button onClick={() => handleNavClick('tutorialtips')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subTutorialTips')}</button>
            <button onClick={() => handleNavClick('faq')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subFaq')}</button>
            <button onClick={() => handleNavClick('handbook')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subHandbook')}</button>
            <button onClick={() => handleNavClick('changelog')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subChangelog')}</button>
          </div>
          <div className="border-t border-slate-300 pt-2 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">Company</div>
            <button onClick={() => handleNavClick('whoweare')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">Who We Are</button>
            <button onClick={() => handleNavClick('partners')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subPartners')}</button>
            <button onClick={() => handleNavClick('testimonials')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 block">{t('subTestimonials')}</button>
          </div>
        </div>
      )}

      {/* Desktop Main Navigation Bar */}
      <div className="hidden md:block w-full bg-[#e5ebf2] border-t border-[#d5dfeb] border-b border-[#c5d3e2] shadow-sm relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between">
          {/* Main Links with Dropdowns */}
          <nav className="flex items-center flex-wrap">
            
            {/* LaserOptSimDESIGNER Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('designer')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('designer')}
                className={`beam-nav-link ${currentPage === 'designer' || ['functions', 'benefits', 'basics', 'productvideos', 'brochure', 'systemrequirements', 'demoversion'].includes(currentPage) ? 'active' : ''}`}
              >
                <span>{t('navDesigner')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'designer' && (
                <div className="absolute left-0 top-full bg-white border border-slate-200 rounded-b-xl shadow-xl w-64 z-50 py-2 text-xs font-medium text-slate-800">
                  <button onClick={() => handleNavClick('functions')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subFunctions')}
                  </button>
                  <button onClick={() => handleNavClick('benefits')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subBenefits')}
                  </button>
                  <button onClick={() => handleNavClick('basics')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subBasics')}
                  </button>
                  <button onClick={() => handleNavClick('productvideos')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subProductVideos')}
                  </button>
                  <button onClick={() => handleNavClick('brochure')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subBrochure')}
                  </button>
                  <button onClick={() => handleNavClick('systemrequirements')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subSysReqs')}
                  </button>
                  <button onClick={() => handleNavClick('demoversion')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subDemoVersion')}
                  </button>
                </div>
              )}
            </div>
            
            {/* APPLICATIONS Link */}
            <button
              onClick={() => handleNavClick('applications')}
              className={`beam-nav-link ${currentPage === 'applications' ? 'active' : ''}`}
            >
              {t('navApplications')}
            </button>
            
            {/* SHOP Link */}
            <button
              onClick={() => handleNavClick('shop')}
              className={`beam-nav-link ${currentPage === 'shop' ? 'active' : ''}`}
            >
              {t('navShop')}
            </button>
            
            {/* SUPPORT Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('support')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('support')}
                className={`beam-nav-link ${currentPage === 'support' || ['tutorialtips', 'faq', 'handbook', 'changelog'].includes(currentPage) ? 'active' : ''}`}
              >
                <span>{t('navSupport')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'support' && (
                <div className="absolute left-0 top-full bg-white border border-slate-200 rounded-b-xl shadow-xl w-72 z-50 py-2 text-xs font-medium text-slate-800">
                  <button onClick={() => handleNavClick('tutorialtips')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subTutorialTips')}
                  </button>
                  <button onClick={() => handleNavClick('faq')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subFaq')}
                  </button>
                  <button onClick={() => handleNavClick('handbook')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subHandbook')}
                  </button>
                  <button onClick={() => handleNavClick('changelog')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subChangelog')}
                  </button>
                </div>
              )}
            </div>
            
            {/* WHO WE ARE Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('whoweare')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('whoweare')}
                className={`beam-nav-link ${currentPage === 'whoweare' || ['partners', 'testimonials'].includes(currentPage) ? 'active' : ''}`}
              >
                <span>{t('navWhoWeAre')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'whoweare' && (
                <div className="absolute left-0 top-full bg-white border border-slate-200 rounded-b-xl shadow-xl w-56 z-50 py-2 text-xs font-medium text-slate-800">
                  <button onClick={() => handleNavClick('whoweare')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block font-semibold">
                    Company Overview
                  </button>
                  <button onClick={() => handleNavClick('partners')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subPartners')}
                  </button>
                  <button onClick={() => handleNavClick('testimonials')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 block">
                    {t('subTestimonials')}
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* Right Nav Options (Get Premium License CTA) */}
          <div className="flex items-center gap-3 py-2">
            <button
              onClick={() => handleNavClick('shop')}
              className="glow-btn-primary text-xs py-1.5 px-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Premium License ⚡</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
