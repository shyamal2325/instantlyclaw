import React, { useState, forwardRef } from 'react';
import { User, Mail, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { LeadFormData, LeadSubmissionResponse } from '../types';
import { trackLeadEvent, trackAffiliateClick } from '../utils/metaPixel';

interface LeadCaptureFormProps {
  affiliateUrl?: string;
  onOpenPrivacy: () => void;
  onOpenDisclosure: () => void;
}

export const LeadCaptureForm = forwardRef<HTMLDivElement, LeadCaptureFormProps>(
  ({ affiliateUrl = 'https://jvz1.com/c/3334211/436489/', onOpenPrivacy, onOpenDisclosure }, ref) => {
    const [formData, setFormData] = useState<LeadFormData>({
      fullName: '',
      email: '',
      marketingConsent: false,
    });

    const [touched, setTouched] = useState<{ fullName?: boolean; email?: boolean }>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Field validation
    const fullNameError = touched.fullName
      ? !formData.fullName.trim()
        ? 'Full name is required.'
        : formData.fullName.trim().length < 2
        ? 'Full name must be at least 2 characters.'
        : null
      : null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = touched.email
      ? !formData.email.trim()
        ? 'Email address is required.'
        : !emailRegex.test(formData.email.trim())
        ? 'Please enter a valid email address.'
        : null
      : null;

    const isFormValid =
      formData.fullName.trim().length >= 2 && emailRegex.test(formData.email.trim());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
      if (submitError) setSubmitError(null);
    };

    const handleBlur = (field: 'fullName' | 'email') => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ fullName: true, email: true });

      if (!isFormValid) {
        return;
      }

      setSubmitting(true);
      setSubmitError(null);

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            marketingConsent: formData.marketingConsent,
          }),
        });

        const data: LeadSubmissionResponse = await response.json();

        if (response.ok && data.success) {
          setSubmitSuccess(true);
          setSuccessMessage(
            data.message ||
              'Thank you! Your details have been received. Continue below to explore InstantlyClaw.'
          );

          // Meta Pixel: Track Lead only after confirmed backend acceptance
          const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          const emailDomain = formData.email.split('@')[1];
          trackLeadEvent(eventId, {
            emailDomain,
            consented: formData.marketingConsent,
          });
        } else {
          setSubmitError(
            data.error ||
              'Unable to complete submission. Please check your information and try again.'
          );
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error';
        setSubmitError(`Connection error: ${message}. Please check your connection and try again.`);
      } finally {
        setSubmitting(false);
      }
    };

    const handleAffiliateClick = () => {
      trackAffiliateClick(affiliateUrl);
    };

    return (
      <div
        ref={ref}
        id="lead-capture-section"
        className="relative rounded-2xl border border-cyan-500/25 bg-[#0F172A]/90 p-6 sm:p-7 shadow-[0_0_40px_-10px_rgba(6,182,212,0.18)] backdrop-blur-sm"
      >
        {/* Subtle decorative top glow border */}
        <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        {/* Form Heading & Subtext */}
        <div className="mb-5 text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Explore the Done-For-You AI Agent System
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter your details to continue and discover how InstantlyClaw works.
          </p>
        </div>

        {/* Pre-submission state: Input form */}
        {!submitSuccess ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-medium text-slate-200 mb-1.5"
              >
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('fullName')}
                  aria-invalid={!!fullNameError}
                  aria-describedby={fullNameError ? 'fullName-error' : undefined}
                  className={`w-full rounded-xl bg-slate-900/90 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 border transition-all duration-150 focus:outline-none ${
                    fullNameError
                      ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
              </div>
              {fullNameError && (
                <p id="fullName-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{fullNameError}</span>
                </p>
              )}
            </div>

            {/* Email Address field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-200 mb-1.5"
              >
                Email Address <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your best email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  className={`w-full rounded-xl bg-slate-900/90 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 border transition-all duration-150 focus:outline-none ${
                    emailError
                      ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-700/80 hover:border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
              </div>
              {emailError && (
                <p id="email-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Marketing Consent Checkbox (Optional, Unchecked by default) */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleInputChange}
                  className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400/30 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs text-slate-300 leading-tight">
                  I agree to receive helpful product updates and marketing emails. I can unsubscribe anytime.
                </span>
              </label>
            </div>

            {/* Error Alert */}
            {submitError && (
              <div
                role="alert"
                className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                <div className="flex-1">
                  <p className="font-medium">Submission could not be completed</p>
                  <p className="text-rose-300/80 mt-0.5">{submitError}</p>
                </div>
              </div>
            )}

            {/* Initial Submit Form Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 py-3.5 px-6 font-semibold text-slate-950 text-sm sm:text-base hover:from-cyan-300 hover:to-cyan-200 transition-all duration-150 shadow-md shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying details...</span>
                </>
              ) : (
                <span>Unlock System Access &amp; Continue →</span>
              )}
            </button>
          </form>
        ) : (
          /* Post-submission state: Confirmed and Affiliate CTA revealed */
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Confirmation Banner */}
            <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/40 p-4 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-cyan-200">
                    Submission Confirmed
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>

            {/* REVEALED AFFILIATE CTA BUTTON */}
            <div className="space-y-2">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAffiliateClick}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-4 px-6 text-base sm:text-lg transition-all duration-200 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 active:scale-[0.99] group text-center cursor-pointer"
              >
                <span>Get Instant Access →</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <p className="text-center text-[11px] text-slate-400">
                Opens the official InstantlyClaw offer page in a new tab.
              </p>
            </div>
          </div>
        )}

        {/* TRUST & TRANSPARENCY NOTICES */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-left">
          <p className="text-xs text-slate-400">
            Your information is handled according to our{' '}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            .
          </p>

          <p className="text-[11px] text-slate-500 leading-normal">
            <span className="font-semibold text-slate-400">Disclosure:</span> We may earn a commission if you purchase through our partner link.{' '}
            <button
              type="button"
              onClick={onOpenDisclosure}
              className="text-slate-400 hover:text-slate-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Learn more
            </button>
          </p>
        </div>
      </div>
    );
  }
);

LeadCaptureForm.displayName = 'LeadCaptureForm';
