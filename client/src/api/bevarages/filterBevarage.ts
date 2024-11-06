import axios from "axios"

export const filterBevarage = async (query: string='', flavor_id:string='', max_price:string='10000000', min_price:string='0') => {
  
    const url = `http://127.0.0.1:8000/bevarages/products/?beverage_name__contains=${query}&flavor=${flavor_id}&beverage_price__gte=${min_price}&beverage_price__lte=${max_price}`;
  
    try {
        const response = await axios.get(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
