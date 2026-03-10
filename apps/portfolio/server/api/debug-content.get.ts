import { queryCollection } from '#content/server'

/**
 * Diagnostic endpoint to verify content is accessible on the server.
 * Visit /api/debug-content to check.
 * DELETE THIS FILE after debugging.
 */
export default defineEventHandler(async () => {
  try {
    const enResult = await queryCollection('content_en').path('/portfolio').first()
    const deResult = await queryCollection('content_de').path('/portfolio').first()

    const enSkills = await queryCollection('content_en').path('/skills').first()
    const deSkills = await queryCollection('content_de').path('/skills').first()

    return {
      status: 'ok',
      content_en_portfolio: enResult ? { hasData: true, hasMeta: !!enResult.meta, metaKeys: Object.keys(enResult.meta ?? {}) } : null,
      content_de_portfolio: deResult ? { hasData: true, hasMeta: !!deResult.meta, metaKeys: Object.keys(deResult.meta ?? {}) } : null,
      content_en_skills: enSkills ? { hasData: true, title: enSkills.title } : null,
      content_de_skills: deSkills ? { hasData: true, title: deSkills.title } : null,
    }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return {
      status: 'error',
      message,
    }
  }
})
