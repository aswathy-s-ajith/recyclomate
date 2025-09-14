// SIGNUP
export const signup = async (req, res, supabase) => {
  const { email, password, username, full_name } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  // Insert into profiles table after successful signup
  const userId = data.user?.id;
  if (userId) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          username,
          full_name,
        },
      ]);
    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }
  }
  res.json({ user: data.user, session: data.session });
};

// LOGIN
export const login = async (req, res, supabase) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user, session: data.session });
};

// GET PROFILE (verify token)
export const getProfile = async (req, res, supabase) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ error: "No token" });

  const { data, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: error.message });

  res.json({ user: data.user });
};
