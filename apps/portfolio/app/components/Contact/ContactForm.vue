<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...formData.value },
    })
    submitStatus.value = 'success'
    formData.value = { name: '', email: '', subject: '', message: '' }
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col">
        <label for="name" class="text-sm font-semibold text-charcoal-900 mb-2">
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
        <label for="email" class="text-sm font-semibold text-charcoal-900 mb-2">
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
      <label for="subject" class="text-sm font-semibold text-charcoal-900 mb-2">
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
      <label for="message" class="text-sm font-semibold text-charcoal-900 mb-2">
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

    <div class="flex flex-col items-center gap-4">
      <Button
        type="submit"
        :label="t('contact.form.sendButton')"
        icon="pi pi-send"
        icon-pos="right"
        class="!bg-gradient-primary !border-0 !text-white !px-8 !py-3 !text-lg hover:!scale-105 hover:!shadow-lg hover:!shadow-mint-500/30 transition-all"
        raised
        :loading="isSubmitting"
      />

      <p v-if="submitStatus === 'success'" class="text-mint-600 font-semibold text-sm">
        <Icon name="mdi:check-circle" class="mr-1" />{{ t('contact.form.successMessage') }}
      </p>
      <p v-else-if="submitStatus === 'error'" class="text-red-500 font-semibold text-sm">
        <Icon name="mdi:alert-circle" class="mr-1" />{{ t('contact.form.errorMessage') }}
      </p>
    </div>
  </form>
</template>
