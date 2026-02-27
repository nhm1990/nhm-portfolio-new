<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
const { data: content } = useSectionData('contact')

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    // Add your form submission logic here
    console.log('Form submitted:', formData.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    alert(t('contact.form.successMessage'))
  } catch (error) {
    console.error('Error submitting form:', error)
    alert(t('contact.form.errorMessage'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="relative py-20 bg-white bg-pattern-hexagons overflow-hidden">
    <!-- Hexagon Background Elements -->
    <div class="absolute top-0 right-0 w-80 h-80 bg-mint-200 rounded-full blur-3xl opacity-20" />
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-sage-200 rounded-full blur-3xl opacity-20" />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        class="text-center mb-16"
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          {{ content?.title }}
        </h2>
        <p class="text-xl text-charcoal-700">{{ content?.subtitle }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="name" class="text-sm font-semibold text-[#2C2D32] mb-2">
                {{ t('contact.form.name') }} *
              </label>
              <InputText
                id="name"
                v-model="formData.name"
                :placeholder="t('contact.form.namePlaceholder')"
                required
                class="w-full"
              />
            </div>

            <div class="flex flex-col">
              <label for="email" class="text-sm font-semibold text-[#2C2D32] mb-2">
                {{ t('contact.form.email') }} *
              </label>
              <InputText
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="t('contact.form.emailPlaceholder')"
                required
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label for="subject" class="text-sm font-semibold text-[#2C2D32] mb-2">
              {{ t('contact.form.subject') }} *
            </label>
            <InputText
              id="subject"
              v-model="formData.subject"
              :placeholder="t('contact.form.subjectPlaceholder')"
              required
              class="w-full"
            />
          </div>

          <div class="flex flex-col">
            <label for="message" class="text-sm font-semibold text-[#2C2D32] mb-2">
              {{ t('contact.form.message') }} *
            </label>
            <Textarea
              id="message"
              v-model="formData.message"
              rows="6"
              :placeholder="t('contact.form.messagePlaceholder')"
              required
              class="w-full"
            />
          </div>

          <div class="flex justify-center">
            <Button
              type="submit"
              :label="t('contact.form.sendButton')"
              icon="pi pi-send"
              icon-pos="right"
              class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0 !text-white !px-8 !py-3 !text-lg hover:!scale-105 transition-transform"
              raised
              :loading="isSubmitting"
            />
          </div>
        </form>

        <!-- Contact Info -->
        <div class="mt-12 pt-12 border-t border-gray-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <a
              :href="content?.email ? `mailto:${content?.email}` : '#'"
              class="flex flex-col items-center group hover:scale-105 transition-transform"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#7A453F] to-[#B9D1E9] rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow"
              >
                <Icon name="mdi:email" class="text-white text-2xl" />
              </div>
              <p class="text-sm text-[#2C2D32]/60">Email</p>
              <p class="font-semibold text-[#2C2D32] group-hover:text-[#7A453F] transition-colors">
                {{ content?.email }}
              </p>
            </a>

            <a
              :href="content?.linkedin ?? '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center group hover:scale-105 transition-transform"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#7A453F] to-[#B9D1E9] rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow p-2"
              >
                <NuxtImg
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="text-sm text-[#2C2D32]/60">LinkedIn</p>
              <p class="font-semibold text-[#2C2D32] group-hover:text-[#7A453F] transition-colors">
                Nicolas Hormesch
              </p>
            </a>

            <a
              :href="content?.github ?? '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center group hover:scale-105 transition-transform"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#7A453F] to-[#B9D1E9] rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow p-2"
              >
                <NuxtImg
                  src="/images/github.png"
                  alt="GitHub"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="text-sm text-[#2C2D32]/60">GitHub</p>
              <p class="font-semibold text-[#2C2D32] group-hover:text-[#7A453F] transition-colors">
                nhm1990
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
