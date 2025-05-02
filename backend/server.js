const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
app.use(cors());

app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*');
  console.log("Supabase returned:", { data, error }); // 👈 Add this log
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('items').select('*');
    console.log("Supabase returned:", { data, error }); // 👈 Add this log
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  });

// server.js or authRoutes.js
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    // You might be validating credentials manually with Supabase here
    const { data, error } = await supabase.from('users').select('*')
      .eq('email', email)
      .single();
  
    if (error || !data || data.password !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Fake session/token response
    res.json({ user: { id: data.id, email: data.email, fullName: data.full_name } });
  });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
