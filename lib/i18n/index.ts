import 'server-only'
import { gl, type Dictionary } from './dictionaries/gl'
import { es } from './dictionaries/es'

const dictionaries = { gl, es }

export type Locale = keyof typeof dictionaries
export type { Dictionary }

export const locales = ['gl', 'es'] as const satisfies readonly Locale[]
export const defaultLocale: Locale = 'gl'

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale]
