'use server'
import jsonwebtoken from 'jsonwebtoken'

require('dotenv').config()

export async function getCommerces(adminToken) {
    const response = await fetch(`${process.env.API_URL}/commerces/view-all`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${adminToken}`
        }
    })

    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export async function createCommerce(adminToken, commerce) {
    const response = await fetch(`${process.env.API_URL}/commerces/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(commerce)
    })

    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export async function modifyCommerce(adminToken, commerceNewData,commerceCIF) {
    const response = await fetch(`${process.env.API_URL}/commerces/update/${commerceCIF}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(commerceNewData)
    })

    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export async function deleteCommerce(adminToken, commerceCIF) {
    const response = await fetch(`${process.env.API_URL}/commerces/delete/${commerceCIF}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${adminToken}`
        }
    })

    if (response.ok) {
        return true
    } else {
        throw new Error(data.message)
    }
}

export async function viewToken(adminToken, commerceCIF) {
    const response = await fetch(`${process.env.API_URL}/commerces/view/${commerceCIF}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${adminToken}`
        }
    })

    const data = await response.json()
    if (response.ok) {
        return data.token
    } else {
        throw new Error(data.message)
    }
}

export async function loginCommerce(cif, token) {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        if (decoded.cif !== cif) {
            throw new Error('Token no válido')
        }
        return token
    } catch (err) {
        throw new Error('Token no válido')
    }
}
