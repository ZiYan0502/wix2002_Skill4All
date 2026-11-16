const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isSiswamail(email) {
  return typeof email === 'string' && email.trim().toLowerCase().endsWith('@siswa.um.edu.my');
}

// POST /api/v1/auth/register
router.post('/register', async (req, res) => { 
  const { name, email, password, role = 'STUDENT' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedRole = role.toUpperCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!['STUDENT', 'NGO_ADMIN'].includes(normalizedRole)) {
    return res.status(400).json({ error: 'Invalid role specified.' });
  }

  if (normalizedRole === 'STUDENT' && !isSiswamail(normalizedEmail)) {
    return res.status(400).json({
      error: 'Students must register using a valid UM Siswamail (@siswa.um.edu.my) account.'
    });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        name: name.trim(),
        role: normalizedRole
      }
    }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({
    status: 'success',
    message: 'Registration successful. Please check your email inbox to verify your account.',
    data: {
      userId: data.user?.id,
      email: data.user?.email,
      role: normalizedRole
    }
  });
});

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  const userRole = data.user.user_metadata?.role || 'STUDENT';

  // Ensure student accounts always hold a valid Siswamail address
  if (userRole === 'STUDENT' && !isSiswamail(normalizedEmail)) {
    return res.status(403).json({
      error: 'Student accounts must use a UM Siswamail (@siswa.um.edu.my) address.'
    });
  }

  return res.status(200).json({
    status: 'success',
    token: data.session.access_token,
    user: {
      id: data.user.id,
      name: data.user.user_metadata?.name,
      email: data.user.email,
      role: userRole
    }
  });
});

// GET /api/v1/auth/me (Verify logged-in user token)
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization token.' });
  }

  const token = authHeader.split(' ')[1];
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired session.' });
  }

  return res.status(200).json({
    user: {
      id: data.user.id,
      name: data.user.user_metadata?.name,
      email: data.user.email,
      role: data.user.user_metadata?.role || 'STUDENT'
    }
  });
});

module.exports = router;