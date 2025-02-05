'use server'

require('dotenv').config()

export async function getWebCommerces() {
    try {
        const response = await fetch(`${process.env.API_URL}/webCommerce/all`, {
            method: 'GET'
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) {
        return data
        }
    } catch (error) {
        throw new Error('Error fetching webcommerces')
    }

}

export async function getWebCommerceByCIF(commerceCIF) {
    try {
        console.log(commerceCIF)
        const response = await fetch(`${process.env.API_URL}/webCommerce/view/${commerceCIF}`, {
            method: 'GET'
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) {
        return data
        }
    } catch (error) {
        throw new Error('Error fetching webcommerces')
    }

}

export async function createWebCommerce(token, values) {
    try {
        const response = await fetch(`${process.env.API_URL}/webCommerce/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(values)
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) {
        return data
        }
    } catch (error) {
        throw new Error('Error creating webcommerce')
    }
}

export async function updateWebCommerce(token, values) {
    try {
        const response = await fetch(`${process.env.API_URL}/webCommerce/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(values)
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) {
        return data
        }
    } catch (error) {
        throw new Error('Error updating webcommerce')
    }
}

export async function deleteWebCommerce(token, commerceCIF, action) {
    try {
        const response = await fetch(`${process.env.API_URL}/webCommerce/${commerceCIF}?action=${action}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`
            }
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) {
        return data
        }
    } catch (error) {
        throw new Error('Error deleting webcommerce')
    }
}

export async function uploadWebCommercePhotos(token, commerceCIF, image) {
    try {
        const formData = new FormData();
        formData.append('photos', image); // Adjust the key if necessary

        const response = await fetch(`${process.env.API_URL}/webCommerce/upload/${commerceCIF}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `${token}`,
            },
            body: formData,
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Error uploading photos');
        }
    } catch (error) {
        console.error('Error uploading photos:', error);
        throw error;
    }
}

export async function uploadCommercePhoto(token, commerceCIF, image) {
    try {
      const formData = new FormData();
      formData.append('image', image); // Ajusta la clave según lo que espera el backend
  
      const response = await fetch(`${process.env.API_URL}/webCommerce/upload/${commerceCIF}`, {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`, // Asegúrate de que el formato del token sea correcto
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorDetails = await response.json();
        throw new Error(`Error uploading photo: ${errorDetails.message}`);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  }

export async function getUserInterested(token, commerceCIF) {
    try {
        const response = await fetch(`${process.env.API_URL}/users/interest/`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) {
        return data
        }
    } catch (error) {
        throw new Error('Error fetching user interested')
    }
}
