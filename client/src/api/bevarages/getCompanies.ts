import axios from "axios"

export const getCompanies = async () => {
  
    const url = `http://localhost:8000/bevarages/companies/`;
  
    try {
        const response = await axios.get(url)
        const { status, data } = response
        return { status, data }
    } catch (error) {
        console.error('Error al realizar la petición:', error)
        return { error }
    }
}
