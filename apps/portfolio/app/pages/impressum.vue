<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

useHead({
  title: t('impressum.pageTitle'),
})
</script>

<template>
  <div class="min-h-screen pt-28 pb-16 bg-[#FFFFF8]">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        class="text-4xl md:text-5xl font-bold mb-8 pb-2 bg-gradient-text bg-clip-text text-transparent"
      >
        {{ t('impressum.title') }}
      </h1>

      <!-- Angaben gemäß § 5 DDG -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-charcoal-800 mb-4">
          {{ t('impressum.infoTitle') }}
        </h2>
        <p class="text-charcoal-700 leading-relaxed">
          Nicolas Hormesch<br />
          Maxstraße 69<br />
          67059 Ludwigshafen am Rhein<br />
          {{ t('impressum.country') }}
        </p>
      </section>

      <!-- Kontakt -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-charcoal-800 mb-4">
          {{ t('impressum.contactTitle') }}
        </h2>
        <p class="text-charcoal-700 leading-relaxed">
          {{ t('impressum.email') }}:
          <a href="mailto:nhormesch@posteo.de" class="text-moss-600 hover:text-moss-800 underline">
            nhormesch@posteo.de
          </a>
        </p>
      </section>

      <!-- Verantwortlich für den Inhalt -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-charcoal-800 mb-4">
          {{ t('impressum.responsibleTitle') }}
        </h2>
        <p class="text-charcoal-700 leading-relaxed">
          Nicolas Hormesch<br />
          Maxstraße 69<br />
          67059 Ludwigshafen am Rhein
        </p>
      </section>

      <!-- Haftungsausschluss -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-charcoal-800 mb-4">
          {{ t('impressum.disclaimerTitle') }}
        </h2>

        <h3 class="text-lg font-semibold text-charcoal-800 mt-6 mb-2">
          {{ t('impressum.liabilityContentTitle') }}
        </h3>
        <p class="text-charcoal-700 leading-relaxed">
          {{ t('impressum.liabilityContentText') }}
        </p>

        <h3 class="text-lg font-semibold text-charcoal-800 mt-6 mb-2">
          {{ t('impressum.liabilityLinksTitle') }}
        </h3>
        <p class="text-charcoal-700 leading-relaxed">
          {{ t('impressum.liabilityLinksText') }}
        </p>
      </section>

      <!-- Urheberrecht -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-charcoal-800 mb-4">
          {{ t('impressum.copyrightTitle') }}
        </h2>
        <p class="text-charcoal-700 leading-relaxed">
          {{ t('impressum.copyrightText') }}
        </p>
      </section>

      <!-- Hosting -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-charcoal-800 mb-4">
          {{ t('impressum.hostingTitle') }}
        </h2>
        <p class="text-charcoal-700 leading-relaxed">
          {{ t('impressum.hostingText') }}
        </p>
        <p class="text-charcoal-700 leading-relaxed mt-2">
          Vercel Inc.<br />
          440 N Barranca Ave #4133<br />
          Covina, CA 91723<br />
          USA
        </p>
      </section>

      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-moss-600 hover:text-moss-800 transition-colors mt-4"
      >
        <Icon name="mdi:arrow-left" class="text-xl" />
        {{ t('impressum.backHome') }}
      </NuxtLink>
    </div>
  </div>
</template>
