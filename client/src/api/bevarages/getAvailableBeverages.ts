import axios from "axios"

export const getAvailableBeverages = async () => {
  
    const url = `http://localhost:8000/bevarages/products/`;
  
    try {
        const response = await axios.get(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
