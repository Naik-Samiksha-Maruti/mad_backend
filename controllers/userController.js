const { ok, fail } = require('../utils/response');
const { findUserById, updateUserById } = require('../models/userModel');

async function getProfile(req, res) {
  try {
    const userId = Number(req.params.id);
    if (!userId) return fail(res, 'Valid user id is required');

    const user = await findUserById(userId);
    if (!user) return fail(res, 'User not found');

    return ok(res, 'Profile fetched', {
      user_id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return fail(res, 'Failed to fetch profile');
  }
}

async function updateProfile(req, res) {
  try {
    const { user_id, name, mobile, address } = req.body || {};
    if (!user_id || !name || !mobile || !address) {
      return fail(res, 'user_id, name, mobile and address are required');
    }

    const user = await findUserById(Number(user_id));
    if (!user) return fail(res, 'User not found');

    await updateUserById(Number(user_id), { name, mobile, address });
    return ok(res, 'Profile updated', {
      user_id: Number(user_id),
      name,
      email: user.email,
      mobile,
      address
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return fail(res, 'Failed to update profile');
  }
}

module.exports = { getProfile, updateProfile };
