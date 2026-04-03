import en from '~/locales/en.json'
import de from '~/locales/de.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as {
    setLocaleMessage: (locale: string, messages: Record<string, unknown>) => void
  }
  i18n.setLocaleMessage('en', en)
  i18n.setLocaleMessage('de', de)
})
