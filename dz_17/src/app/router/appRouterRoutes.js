import { frontRoutes } from '@/shared/config/routes/frontRoutes'

// Збираємо всі сторінки у папці pages
const pages = import.meta.glob('../../pages/**/*.jsx')

const pagesList = Object.keys(frontRoutes.pages)

export const appRouterRoutes = pagesList.map((page) => {
  // Якщо page вже містить .jsx, не додаємо ще раз
  const path = page.endsWith('.jsx')
    ? `../../pages/${page}`
    : `../../pages/${page}.jsx`

  return {
    ...frontRoutes.pages[page],
    lazy: async () => {
      const importer = pages[path]
      if (!importer) throw new Error(`Page module not found: ${path}`)
      const mod = await importer()
      return { Component: mod.default }
    },
  }
})
