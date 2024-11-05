import axios from "axios"

export const getUserOrders = async (id: string) => {
  
    const url = `http://localhost:8000/orders/${id}/orders`;
  
    try {
        const response = await axios.get(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
