import axios from "axios"

export const addProductToCart = async (user_id: string, product_id: string) => {
  
    const url = `http://localhost:8000/orders/${user_id}/add/${product_id}/`;
  
    try {
        const response = await axios.post(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
