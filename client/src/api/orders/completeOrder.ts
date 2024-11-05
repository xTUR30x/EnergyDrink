import axios from "axios"

export const completeOrder = async (id: string) => {
  
    const url = `http://localhost:8000/orders/${id}/complete-order/`;
  
    try {
        const response = await axios.post(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
