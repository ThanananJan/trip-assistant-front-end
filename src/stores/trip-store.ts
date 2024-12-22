import TripService from '@/services/TripService'
import { Trip, TripTransaction } from './../pages/trips/types'
import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', {
  state: () => {
    return {
      loading: false,
    }
  },
  getters: {},
  persist: true,
  actions: {
    async load() {
      this.loading = false
    },

    async create(trip: Trip) {
      return await new TripService().CreateTrip(trip)
    },
    async update(trip: Trip) {
      return await new TripService().UpdateTrip(trip)
    },
    async delete(trip: Trip) {
      return await new TripService().DeleteTrip(trip.idTrip)
    },

    formateDate(date: Date) {
      return new Date(date).toLocaleDateString('gb', { day: 'numeric', month: 'short', year: 'numeric' })
    },

    async createTransaction(tran: TripTransaction) {
      return await new TripService().CreateTripTransaction(tran)
    },
    async updateTransaction(tran: TripTransaction) {
      return await new TripService().UpdateTripTransaction(tran)
    },
    async deleteTransaction(tran: TripTransaction) {
      return await new TripService().DeleteTripTransaction(tran.idTripTransaction)
    },
    async getTripSummary(idTrip: number) {
      return await new TripService().GetTripSummary(idTrip)
    },
    async getTripTransaction(idTrip: number) {
      return await new TripService().GetTripTransactions(idTrip)
    },
    async getTrips() {
      return await new TripService().GetTrips()
    },
    async getTrip(idTrip: number) {
      return await new TripService().GetTrip(idTrip)
    },
    async getTripUpdate(idTrip: number) {
      return await this.getTrip(idTrip)
    },
    getTripCreate() {
      return { dtmCreate: new Date(), idTrip: 0, members: [], namTrip: '' }
    },
    getTransactionCreate(idTrip: number) {
      return {
        dtmCreate: new Date(),
        idTripTransaction: 0,
        dscTransaction: '',
        amount: 0,
        tripDebtors: [],
        tripPayer: null,
        idTrip: idTrip,
      }
    },
    async getTransactionUpdate(idTripTransaction: number) {
      return await new TripService().GetTripTransaction(idTripTransaction)
    },
  },
})
