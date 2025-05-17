// Example: signup function for user registration

export const signup = async (userData) => {
  try {
    // Simulate a request (replace this with a real API call)
    const response = await fakeRegisterApi(userData);

    // Save token and user info to localStorage (optional)
    localStorage.setItem("kwuo_auth_token", response.token);
    localStorage.setItem("kwuo_user", JSON.stringify(response.user));

    return response;
  } catch (error) {
    throw new Error(error.message || "Signup failed");
  }
};

// Simulated fake API (for demo purposes)
const fakeRegisterApi = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email === "existing@example.com") {
        reject(new Error("User already exists"));
      } else {
        resolve({
          token: "demo_token_123",
          user: {
            id: 1,
            name: userData.name,
            email: userData.email,
          },
        });
      }
    }, 1000); // 1s delay
  });
};
