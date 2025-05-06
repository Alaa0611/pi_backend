const fetch = require('node-fetch');

exports.verifyRecaptcha = async (req, res, next) => {
  const { recaptchaToken } = req.body;

  // Check if the reCAPTCHA token is provided
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token is required' });
  }

  try {
    // Verify the reCAPTCHA token with Google's API
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const data = await response.json();

    // Check if the reCAPTCHA verification was successful
    if (!data.success) {
      return res.status(400).json({ error: 'Invalid reCAPTCHA token' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors during the verification process
    res.status(500).json({ error: 'Failed to verify reCAPTCHA', details: error.message });
  }
};
