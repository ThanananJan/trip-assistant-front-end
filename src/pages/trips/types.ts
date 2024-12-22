export interface Trip {
  idTrip: number
  namTrip: string
  dtmCreate: Date
  members: TripMember[]
}

export interface User {
  id: number
  name: string
  trip: Trip[]
}
export interface TripUser {
  idTrip: number
  idUser: number
  isOwner: boolean
}

export interface TripTransaction {
  idTripTransaction: number
  idTrip: number
  dscTransaction: string
  amount: number
  dtmCreate: Date
  tripPayer: TripPayer | null
  tripDebtors: TripDebtor[]
}
export interface TripDebtor {
  idDebtor: number
  namDebtor: string
}
export interface TripPayer {
  idPayer: number
  namPayer: string
}

export interface TripMember {
  idTripMember: number
  namMember: string
  idTrip: number
}
export interface TripSummary {
  idTrip: number
  namTrip: string
  total: number
  members: TripMemberSummary[]
}
export interface TripMemberSummary {
  idTripMember: number
  namMember: string
  payerAmount: number
  debtorAmount: number
  balanceAmount: number
}
export interface TripMember {
  name: string
  totalPaid: number
  totalDebt: number
}
