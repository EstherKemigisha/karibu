app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.send('<p>User not found. <a href="/signup">Go back and sign up</a></p>');
    }
  
    // continue with password check...
  });
  