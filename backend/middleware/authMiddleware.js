// middleware/authMiddleware.js
// This middleware protects routes by verifying the Supabase JWT.

const supabase = require('../config/supabaseClient');

const protect = async (req, res, next) => {
  let token;

  // 1. Check for the Authorization header and ensure it's a Bearer token.
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the header.
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token with Supabase. `getUser` validates the token and returns the user if valid.
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({ success: false, message: 'Not authorized, token failed.' });
      }

      // 4. Fetch the user's profile from our custom 'users' table.
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('id, username, created_at')
        .eq('id', user.id)
        .single();
      
      if (profileError || !userProfile) {
        return res.status(401).json({ success: false, message: 'Not authorized, user profile not found.' });
      }

      // 5. Attach the user profile to the request object for use in protected routes.
      req.user = userProfile;
      
      next();
    } catch (error) {
      console.error('Authentication Middleware Error:', error);
      return res.status(401).json({ success: false, message: 'Not authorized, token is invalid.' });
    }
  }

  // If no token is found in the header.
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};

module.exports = { protect };

