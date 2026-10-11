import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Route: Check GetResponse Integration Status
  app.get('/api/status', async (_req, res) => {
    const apiKey = process.env.GETRESPONSE_API_KEY || '';
    const campaignId = process.env.GETRESPONSE_CAMPAIGN_ID || '';

    if (!apiKey || !campaignId) {
      return res.json({
        configured: false,
        message: 'GetResponse credentials are not configured. Please set GETRESPONSE_API_KEY and GETRESPONSE_CAMPAIGN_ID.',
        hasApiKey: !!apiKey,
        hasCampaignId: !!campaignId,
      });
    }

    try {
      const response = await fetch(`https://api.getresponse.com/v3/campaigns/${campaignId}`, {
        headers: {
          'X-Auth-Token': `api-key ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return res.json({
          configured: false,
          message: `GetResponse API returned ${response.status}: ${(errorData as { message?: string }).message || 'Invalid key or campaign.'}`,
          hasApiKey: true,
          hasCampaignId: true,
        });
      }

      const campaign = await response.json() as { name?: string; campaignId?: string };
      return res.json({
        configured: true,
        campaignName: campaign.name || 'OpenClaw',
        campaignId: campaign.campaignId || campaignId,
        hasApiKey: true,
        hasCampaignId: true,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown network error';
      return res.json({
        configured: false,
        message: `Failed to connect to GetResponse: ${errorMessage}`,
        hasApiKey: true,
        hasCampaignId: true,
      });
    }
  });

  // API Route: Lead Capture & Contact Subscription
  app.post('/api/subscribe', async (req, res) => {
    const { name, email, marketingConsent } = req.body || {};

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid full name (minimum 2 characters).',
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const apiKey = process.env.GETRESPONSE_API_KEY || '';
    const campaignId = process.env.GETRESPONSE_CAMPAIGN_ID || '';

    // Check credentials configuration
    if (!apiKey || !campaignId) {
      return res.status(503).json({
        success: false,
        configured: false,
        error: 'GetResponse credentials are not configured on the server. Please set GETRESPONSE_API_KEY and GETRESPONSE_CAMPAIGN_ID.',
      });
    }

    // If marketing consent was NOT granted:
    // As per requirement: "Only subscribe users to marketing emails if they explicitly consent."
    if (!marketingConsent) {
      console.log(`[Lead Recorded] ${trimmedName} <${trimmedEmail}> (Marketing consent: false - skipped GetResponse campaign)`);
      return res.json({
        success: true,
        consented: false,
        message: 'Thank you! Your details have been received. Continue below to explore InstantlyClaw.',
      });
    }

    // If marketing consent WAS granted: submit contact to GetResponse
    try {
      const getResponsePayload = {
        name: trimmedName,
        email: trimmedEmail,
        campaign: {
          campaignId: campaignId,
        },
        dayOfCycle: 0,
      };

      const grRes = await fetch('https://api.getresponse.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': `api-key ${apiKey}`,
        },
        body: JSON.stringify(getResponsePayload),
      });

      // 202 Accepted or 201 Created
      if (grRes.status === 201 || grRes.status === 202) {
        console.log(`[GetResponse Success] Added contact: ${trimmedEmail} to campaign ${campaignId}`);
        return res.json({
          success: true,
          consented: true,
          message: 'Thank you! Your details have been received. Continue below to explore InstantlyClaw.',
        });
      }

      // 409 Conflict: Contact already exists in this campaign
      if (grRes.status === 409) {
        console.log(`[GetResponse Info] Contact already exists: ${trimmedEmail}`);
        return res.json({
          success: true,
          consented: true,
          duplicate: true,
          message: 'Thank you! Your details have been received. Continue below to explore InstantlyClaw.',
        });
      }

      // Handle GetResponse error responses
      const errorBody = await grRes.json().catch(() => ({}));
      const grError = errorBody as { message?: string; codeDescription?: string };
      console.error(`[GetResponse Error ${grRes.status}]`, errorBody);

      if (grRes.status === 400) {
        return res.status(400).json({
          success: false,
          error: grError.message || grError.codeDescription || 'Invalid email address format according to provider.',
        });
      }

      return res.status(502).json({
        success: false,
        error: grError.message || 'Unable to register contact with email service. Please try again.',
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown network failure';
      console.error('[GetResponse Request Exception]', err);
      return res.status(500).json({
        success: false,
        error: `Submission service error: ${errorMessage}`,
      });
    }
  });

  // Serve Frontend
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: port,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[InstantlyClaw Server] Listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('[InstantlyClaw Server Startup Error]', err);
  process.exit(1);
});
