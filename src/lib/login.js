'use server';

require("dotenv").config();

export async function handleLogIn({ email, password }) {
  const response = await fetch(`${process.env.API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.text();
  if (response.ok) {
    console.log(data);
    return data;
    
  } else {
    throw new Error("Invalid email or password");
  }
}
