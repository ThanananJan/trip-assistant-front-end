import apiService from '@/services/ApiTripAssistantService'

export default class TripService {
  async GetTrips() {
    const response = await apiService().get('trips')
    return response.data
  }
  async GetTrip(idTrip: number) {
    const response = await apiService().get(`trips/${idTrip}`)
    return response.data
  }
  async GetTripSummary(idTrip: number) {
    const response = await apiService().get(`trips/${idTrip}/summary`)
    return response.data
  }
  async GetTripTransactions(idTrip: number) {
    const response = await apiService().get(`trips/${idTrip}/transactions`)
    return response.data
  }
  async DeleteTrip(idTrip: number) {
    const response = await apiService().delete(`trips/${idTrip}`)
    return response.data
  }
  async CreateTrip(data: any) {
    const response = await apiService().post(`trips`, data)
    return response.data
  }
  async UpdateTrip(data: any) {
    const response = await apiService().put(`trips`, data)
    return response.data
  }
  async GetTripTransaction(idTripTransaction: number) {
    const response = await apiService().get(`transactions/${idTripTransaction}`)
    return response.data
  }
  async DeleteTripTransaction(idTripTransaction: number) {
    const response = await apiService().delete(`transactions/${idTripTransaction}`)
    return response.data
  }
  async CreateTripTransaction(data: any) {
    const response = await apiService().post(`transactions`, data)
    return response.data
  }
  async UpdateTripTransaction(data: any) {
    const response = await apiService().put(`transactions`, data)
    return response.data
  }

  async ShareTrip(idTrip: number) {
    const response = await apiService().post(`trips/${idTrip}/share`)
    return response.data
  }
}
