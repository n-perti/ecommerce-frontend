'use server'

require('dotenv').config()

export async function handleRegister(userData) {
    const response = await fetch(`${process.env.API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const data = await response.text()
    if (response.ok) {
        return data
    } else {
        throw new Error('An error has ocurred')
    }

}