const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Existing categories route
app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*');
  console.log("Supabase returned:", { data, error });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Existing products route
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('items').select('*');
  console.log("Supabase returned:", { data, error });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Updated signup route to include phone_num and address
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone_num, address } = req.body;

  if (!email || !password || !name || !phone_num || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username: name,
          email: email,
          password: hashedPassword, // Store hashed password
          phone_num: phone_num, // Store phone number
          address: address, // Store address
        },
      ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: 'User registered successfully',
      user: data,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error during registration' });
  }
});


// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Fetch user from database
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single(); // Ensure single user is returned

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password stored in the database with the provided password
    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful, return user data or token
    return res.status(200).json({
      message: 'Login successful',
      user: data,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error during login' });
  }
});



// ** Cart Routes **

// Fetch cart items for a specific user
app.get('/api/cart', async (req, res) => {
  const userId = req.query.user_id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const { data, error } = await supabase
    .from('cart')
    .select('*, items(name, price, image_url)')
    .eq('user_id', userId);

  console.log("Supabase returned cart items:", { data, error });
  if (error) {
    return res.status(500).json({ error: `Error fetching cart items: ${error.message}` });
  }

  res.json(data);
});

// Add item to the cart
app.post('/api/cart', async (req, res) => {
  const { user_id, item_id, quantity, duration } = req.body;
  const { data, error } = await supabase
    .from('cart')
    .insert([
      {
        user_id,
        item_id,
        quantity,
        duration,
      },
    ])
    .single();

  console.log("Supabase added item to cart:", { data, error });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Remove item from the cart
app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.query.user_id;

  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  console.log("Supabase removed item from cart:", { data, error });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: 'Item removed from cart' });
});

// Update item quantity in the cart
app.put('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, duration } = req.body;
  const userId = req.query.user_id;

  const { data, error } = await supabase
    .from('cart')
    .update({ quantity, duration })
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  console.log("Supabase updated cart item:", { data, error });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
