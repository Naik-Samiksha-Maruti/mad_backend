const bcrypt = require('bcryptjs');
const { ok, fail } = require('../utils/response');
const { createUser, findUserByEmail } = require('../models/userModel');

async function signUp(req, res) {
  try {
    const { name, email, mobile, address, password } = req.body || {};

    if (!name || !email || !mobile || !address || !password) {
      return fail(res, 'All signup fields are required');
    }
    if (String(password).length < 6) {
      return fail(res, 'Password must be at least 6 characters');
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return fail(res, 'Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = await createUser({
      name,
      email,
      mobile,
      address,
      passwordHash
    });

    return ok(res, 'Signup Successful', {
      user_id: userId,
      name,
      email,
      mobile,
      address
    });
  } catch (error) {
    console.error('Signup error:', error);
    return fail(res, 'Signup failed');
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return fail(res, 'Email and password are required');
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return fail(res, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return fail(res, 'Invalid email or password');
    }

    return ok(res, 'Login Successful', {
      user_id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address
    });
  } catch (error) {
    console.error('Login error:', error);
    return fail(res, 'Login failed');
  }
}

module.exports = { signUp, login };
