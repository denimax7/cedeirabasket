import equiposJson from '@/content/equipos.json'

export interface Categoria {
  id: string
  nameGl: string
  nameEs: string
  ages: string
  birthYears: string
  color: string
  trainingGl: string
  trainingEs: string
  coachGl: string
  coachEs: string
  descGl: string
  descEs: string
}

export const categorias: Categoria[] = equiposJson.categorias as Categoria[]
