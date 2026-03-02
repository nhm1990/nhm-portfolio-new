<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
const { data: content } = useSectionData('contact')

const handleFormSubmit = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    // TODO: replace with real API call
    console.log('Form submitted:', formData)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(t('contact.form.successMessage'))
  } catch (error) {
    console.error('Error submitting form:', error)
    alert(t('contact.form.errorMessage'))
  }
}
</script>

<template>
  <section id="contact" class="relative py-20 bg-sage-50 bg-pattern-grid overflow-hidden">
    <!-- Decorative blobs -->
    <div class="absolute top-0 right-0 w-80 h-80 bg-mint-100 rounded-full blur-3xl opacity-30" />
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-sage-200 rounded-full blur-3xl opacity-25" />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
      <ContactSectionHeading :title="content?.title ?? ''" :subtitle="content?.subtitle ?? ''" />

      <!-- Form card -->
      <div class="bg-white rounded-2xl shadow-xl border border-sage-100 p-8 md:p-12">
        <ContactForm @on-submit="handleFormSubmit" />
        <ContactInfoLinks
          :email="content?.email"
          :linkedin="content?.linkedin"
          :github="content?.github"
        />
      </div>
    </div>
  </section>
</template>
