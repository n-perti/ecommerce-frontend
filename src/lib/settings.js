'use server'


require("dotenv").config();

export async function updateUser(token, userDetails) {
    const response = await fetch(`${process.env.API_URL}/users/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}
