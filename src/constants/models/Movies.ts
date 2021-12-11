export type Movie = {
  id: number,
  name: string,
  language: string,
  ticketCost?: number,
  rows?: number,
  cols?: number,
  seats?: Seats
}

export type Seats = {
  [key: string]: number[]
}