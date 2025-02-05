'use server'

require("dotenv").config();

export async function getUserDetails(token) {
    const response = await fetch(`${process.env.API_URL}/users/details`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (response.ok) {
        return data; // Asegúrate de que data incluye el rol del usuario
    } else {
        throw new Error(data.message);
    }
}
