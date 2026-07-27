import eventsJson from '@/content/events.json'

export interface ClubEvent {
  id: string
  titleGl: string
  titleEs: string
  date: string
  endDate: string
  locationGl: string
  locationEs: string
  type: 'partido' | 'torneo' | 'campamento' | 'outro'
}

export const proximoEvento: ClubEvent = eventsJson.proximoEvento as ClubEvent
