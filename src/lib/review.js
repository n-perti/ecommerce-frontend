'use server'

require('dotenv').config()

export async function createReview(review, userToken, webCommerce) {
    const response = await fetch(`${process.env.API_URL}/webCommerce/review/${webCommerce}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(review)
    })

    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}