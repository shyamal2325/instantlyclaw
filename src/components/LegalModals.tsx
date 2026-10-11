import React from 'react';
import { X, Shield, FileText, CheckCircle } from 'lucide-react';

interface LegalModalsProps {
  privacyOpen: boolean;
  disclosureOpen: boolean;
  onClosePrivacy: () => void;
  onCloseDisclosure: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  privacyOpen,
  disclosureOpen,
  onClosePrivacy,
  onCloseDisclosure,
}) => {
  if (!privacyOpen && !disclosureOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
      onClick={() => {
        if (privacyOpen) onClosePrivacy();
        if (disclosureOpen) onCloseDisclosure();
      }}
    >
      <div
        className="relative max-w-2xl w-full max-h-[85vh] bg-[#0F172A] rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            if (privacyOpen) onClosePrivacy();
            if (disclosureOpen) onCloseDisclosure();
          }}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {privacyOpen && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <Shield className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
            </div>
            <p className="text-xs text-slate-400">
              Last updated: October 2026
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              <section>
                <h4 className="font-semibold text-white mb-1">1. Information We Collect</h4>
                <p>
                  When you request access to explore the InstantlyClaw system, we collect your Full Name and Email Address. This information is submitted securely through our backend service to verify your access request.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">2. How We Use Your Information</h4>
                <p>
                  Your email is used to send you access credentials, introductory materials, and system walkthroughs. If you explicitly checked the optional consent box to receive product updates and marketing emails, your contact details are synchronized with our GetResponse email delivery platform.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">3. Marketing Consent &amp; Unsubscribing</h4>
                <p>
                  We strictly respect your marketing preferences. If you choose not to subscribe to promotional updates, your details are not enrolled in marketing sequences. Every email sent includes an immediate, one-click unsubscribe link at the footer.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">4. Data Protection &amp; Third-Party Services</h4>
                <p>
                  We never sell, rent, or trade your personal information to third parties. We utilize trusted infrastructure providers including GetResponse for email delivery and Meta Pixel for conversion verification according to Meta Advertising Standards.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">5. Contact &amp; Rights</h4>
                <p>
                  You have the right to inspect, correct, or request deletion of your information at any time by contacting our support team or using the unsubscribe mechanism in any correspondence.
                </p>
              </section>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onClosePrivacy}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        )}

        {disclosureOpen && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <FileText className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Partner &amp; Affiliate Disclosure</h3>
            </div>
            <p className="text-xs text-slate-400">
              FTC &amp; Meta Advertising Transparency Notice
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              <section>
                <h4 className="font-semibold text-white mb-1">Affiliate Partnership Disclosure</h4>
                <p>
                  This website operates as an independent marketing and referral partner for InstantlyClaw. If you choose to purchase InstantlyClaw through our affiliate link (JVZoo), we may receive an affiliate referral commission at no additional cost to you.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">Earnings &amp; Results Disclaimer</h4>
                <p>
                  We make no claims, promises, or guarantees regarding specific income, revenue, or business results. Success with software and AI agent automation depends upon individual effort, commercial execution, market conditions, and client demand. We do not promote unsupported claims regarding guaranteed earnings.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">Product Description</h4>
                <p>
                  InstantlyClaw provides pre-configured OpenClaw agent environments hosted in the cloud, designed to eliminate Docker, VPS, and local terminal setup complexity. Commercial rights pertain to the license granted to utilize the system in business service delivery.
                </p>
              </section>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onCloseDisclosure}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
