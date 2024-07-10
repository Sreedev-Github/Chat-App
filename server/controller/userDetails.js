const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken.js");

async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    const { user, message, logout } = await getUserDetailsFromToken(token);

    return response.status(200).json({
      message,
      data: user,
      logout,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true
    });
  }
}

module.exports = userDetails;
