import axios from "axios"

export const removeFromCart = async (user_id: string, beverage_id: string) => {
  
    const url = `http://localhost:8000/orders/remove/${user_id}/${beverage_id}`;
  
    try {
        const response = await axios.delete(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
