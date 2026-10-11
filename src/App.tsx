import React, { useRef, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BenefitsList } from './components/BenefitsList';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { ProductDashboardPreview } from './components/ProductDashboardPreview';
import { LegalModals } from './components/LegalModals';
import { DevStatusBadge } from './components/DevStatusBadge';
import { initMetaPixel } from './utils/metaPixel';

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Meta Pixel if pixel ID is present in environment
    initMetaPixel();
  }, []);

  const handleFocusForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = formRef.current.querySelector('input') as HTMLInputElement | null;
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dev / API Status Banner */}
      <DevStatusBadge />

      {/* Top Bar Header */}
      <Header
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenDisclosure={() => setDisclosureOpen(true)}
        onFocusForm={handleFocusForm}
      />

      {/* MAIN SINGLE-SECTION HERO LAYOUT */}
      <main className="flex-1 flex items-center py-6 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* LEFT COLUMN (Desktop): Headline, Subheadline, Benefits, Form */}
            <div className="lg:col-span-7 flex flex-col text-left">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-white leading-[1.15]">
                Launch Your Own{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400">
                  AI Agent Team
                </span>{' '}
                — Without Writing a Single Line of Code
              </h1>

              {/* Subheadline */}
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
                Discover a Done-For-You OpenClaw System with Cloud Hosting, Pre-Built AI Agents, 15 Skills, and Commercial Rights. Get started without complicated technical setup.
              </p>

              {/* Key Product Benefits */}
              <BenefitsList />

              {/* MOBILE ONLY: Product Screenshot positioned between Benefits and Form */}
              <div className="block lg:hidden my-6">
                <ProductDashboardPreview onFocusForm={handleFocusForm} />
              </div>

              {/* Email Capture Form (reveals Affiliate CTA upon submission) */}
              <div className="mt-2">
                <LeadCaptureForm
                  ref={formRef}
                  onOpenPrivacy={() => setPrivacyOpen(true)}
                  onOpenDisclosure={() => setDisclosureOpen(true)}
                />
              </div>
            </div>

            {/* RIGHT COLUMN (Desktop): Product Dashboard Screenshot with subtle cyan glow */}
            <div className="hidden lg:block lg:col-span-5 sticky top-24 self-center">
              <ProductDashboardPreview onFocusForm={handleFocusForm} />
            </div>

          </div>
        </div>
      </main>

      {/* QUIET COMPLIANCE FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#0B1220] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">InstantlyClaw</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Done-For-You OpenClaw System</span>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => setDisclosureOpen(true)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Affiliate Disclosure
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
          </div>
        </div>
      </footer>

      {/* Accessible Legal Modals */}
      <LegalModals
        privacyOpen={privacyOpen}
        disclosureOpen={disclosureOpen}
        onClosePrivacy={() => setPrivacyOpen(false)}
        onCloseDisclosure={() => setDisclosureOpen(false)}
      />
    </div>
  );
}
