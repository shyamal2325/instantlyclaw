export interface LeadFormData {
  fullName: string;
  email: string;
  marketingConsent: boolean;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
  consented?: boolean;
  duplicate?: boolean;
  configured?: boolean;
}

export interface GetResponseStatusResponse {
  configured: boolean;
  message?: string;
  campaignName?: string;
  campaignId?: string;
  hasApiKey?: boolean;
  hasCampaignId?: boolean;
}
