import axios from "axios"

export const discountProduct = async (user_id: string, product_id: string) => {
  
    const url = `http://localhost:8000/orders/decrease/${user_id}/${product_id}/`;
  
    try {
        const response = await axios.post(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
