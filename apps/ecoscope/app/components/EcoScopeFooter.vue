<template>
  <footer class="bg-slate-900 border-t border-slate-800 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Branding -->
        <div class="flex items-center gap-3">
          <div
            class="w-7 h-7 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center"
          >
            <Icon name="mdi:leaf" class="text-white text-sm" />
          </div>
          <span class="text-sm text-slate-400">
            EcoScope — Environmental Data Intelligence Platform
          </span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 text-sm text-slate-500">
          <span>
            Data powered by
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-teal-500 hover:text-teal-400 transition-colors"
            >
              Open-Meteo
            </a>
          </span>
          <span class="text-slate-700">•</span>
          <span>
            Built with
            <a
              href="https://www.ag-grid.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-teal-500 hover:text-teal-400 transition-colors"
            >
              AG Grid
            </a>
            &
            <a
              href="https://www.ag-grid.com/charts/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-teal-500 hover:text-teal-400 transition-colors"
            >
              AG Charts
            </a>
          </span>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
        <p>
          &copy; {{ new Date().getFullYear() }} Nicolas Hormesch. Demo Application for Portfolio.
        </p>
      </div>
    </div>
  </footer>
</template>
