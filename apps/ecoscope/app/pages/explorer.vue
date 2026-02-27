<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
  ValueFormatterParams,
  CellClassParams,
  RowSelectionOptions,
} from 'ag-grid-community'
import type { AirQualityReading } from '~/types/envdata'
import { ecoScopeTheme } from '~/utils/ecoscope-theme'

useHead({
  title: 'Data Explorer — EcoScope',
  meta: [
    {
      name: 'description',
      content: 'Explore, edit, and analyze environmental air quality data from 25+ global cities.',
    },
  ],
})

const { cityData, isLoading, error, refresh, recalculateAqi } = useEnvData()

const gridApi = ref<GridApi | null>(null)
const quickFilterText = ref('')
const rowData = ref<AirQualityReading[]>([])
const selectedRowCount = ref(0)
const editedRowCount = ref(0)
const lastRefresh = ref(new Date().toLocaleTimeString())

// Seed the grid once the API data arrives; preserve user edits on subsequent refreshes
watch(cityData, (data) => {
  if (data.length && !rowData.value.length) {
    rowData.value = [...data]
    lastRefresh.value = new Date().toLocaleTimeString()
  }
}, { immediate: true })

// --- AG Grid Column Definitions ---

/**
 * Returns cell background style based on pollution thresholds.
 * Green → Yellow → Orange → Red
 */
function pollutantCellStyle(
  params: CellClassParams,
  thresholds: [number, number, number],
): Record<string, string> | undefined {
  const val = params.value as number
  if (val == null) return undefined
  if (val <= thresholds[0]) return { backgroundColor: '#dcfce7', color: '#166534' }
  if (val <= thresholds[1]) return { backgroundColor: '#fef9c3', color: '#854d0e' }
  if (val <= thresholds[2]) return { backgroundColor: '#fed7aa', color: '#9a3412' }
  return { backgroundColor: '#fecaca', color: '#991b1b' }
}

const numberFormatter = (params: ValueFormatterParams): string => {
  const val = params.value as number | null
  return val != null ? val.toFixed(1) : ''
}

const intFormatter = (params: ValueFormatterParams): string => {
  const val = params.value as number | null
  return val != null ? Math.round(val).toString() : ''
}

/**
 * Inline HTML cell renderer for AQI badge.
 * Uses inline styles to avoid Tailwind purging issues.
 */
function aqiCellRenderer(params: { value: number }): string {
  const v = params.value
  let bg: string
  let color: string

  if (v <= 50) {
    bg = '#dcfce7'; color = '#166534'
  } else if (v <= 100) {
    bg = '#fef9c3'; color = '#854d0e'
  } else if (v <= 150) {
    bg = '#fed7aa'; color = '#9a3412'
  } else if (v <= 200) {
    bg = '#fecaca'; color = '#991b1b'
  } else if (v <= 300) {
    bg = '#e9d5ff'; color = '#6b21a8'
  } else {
    bg = '#7f1d1d'; color = '#ffffff'
  }

  return `<span style="display:inline-flex;align-items:center;padding:2px 12px;border-radius:9999px;font-size:12px;font-weight:700;background:${bg};color:${color}">${v}</span>`
}

/**
 * Inline HTML cell renderer for AQI status text badge.
 */
function statusCellRenderer(params: { value: string }): string {
  const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
    'Good': { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
    'Moderate': { bg: '#fef9c3', color: '#854d0e', border: '#fef08a' },
    'Unhealthy for Sensitive Groups': { bg: '#fed7aa', color: '#9a3412', border: '#fdba74' },
    'Unhealthy': { bg: '#fecaca', color: '#991b1b', border: '#fca5a5' },
    'Very Unhealthy': { bg: '#e9d5ff', color: '#6b21a8', border: '#c4b5fd' },
    'Hazardous': { bg: '#7f1d1d', color: '#ffffff', border: '#991b1b' },
  }

  const style = statusStyles[params.value] ?? { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' }
  return `<span style="display:inline-flex;align-items:center;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:${style.bg};color:${style.color};border:1px solid ${style.border}">${params.value}</span>`
}

/**
 * Renders a small edited indicator dot.
 */
function editedCellRenderer(params: { value: boolean }): string {
  if (!params.value) return ''
  return '<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;color:#14b8a6"><span style="width:8px;height:8px;border-radius:50%;background:#14b8a6;display:inline-block"></span>Edited</span>'
}

const columnDefs: ColDef[] = [
  {
    headerName: '',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: 'left',
    sortable: false,
    filter: false,
    resizable: false,
  },
  {
    headerName: 'City',
    field: 'city',
    pinned: 'left',
    width: 140,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    editable: false,
  },
  {
    headerName: 'Country',
    field: 'country',
    width: 150,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    editable: false,
  },
  {
    headerName: 'Continent',
    field: 'continent',
    width: 140,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    editable: false,
  },
  {
    headerName: 'PM2.5 (µg/m³)',
    field: 'pm25',
    width: 150,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
    cellStyle: (params: CellClassParams) => pollutantCellStyle(params, [12, 35, 55]),
    valueSetter: (params) => {
      const newVal = Number(params.newValue)
      if (isNaN(newVal) || newVal < 0 || newVal > 500) return false
      params.data.pm25 = Math.round(newVal * 10) / 10
      return true
    },
  },
  {
    headerName: 'PM10 (µg/m³)',
    field: 'pm10',
    width: 145,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
    cellStyle: (params: CellClassParams) => pollutantCellStyle(params, [20, 50, 100]),
    valueSetter: (params) => {
      const newVal = Number(params.newValue)
      if (isNaN(newVal) || newVal < 0 || newVal > 600) return false
      params.data.pm10 = Math.round(newVal * 10) / 10
      return true
    },
  },
  {
    headerName: 'NO₂ (µg/m³)',
    field: 'no2',
    width: 140,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
    cellStyle: (params: CellClassParams) => pollutantCellStyle(params, [40, 100, 200]),
  },
  {
    headerName: 'SO₂ (µg/m³)',
    field: 'so2',
    width: 140,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
    cellStyle: (params: CellClassParams) => pollutantCellStyle(params, [20, 50, 100]),
  },
  {
    headerName: 'O₃ (µg/m³)',
    field: 'o3',
    width: 130,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
    cellStyle: (params: CellClassParams) => pollutantCellStyle(params, [60, 120, 180]),
  },
  {
    headerName: 'CO (µg/m³)',
    field: 'co',
    width: 130,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
  },
  {
    headerName: 'AQI',
    field: 'aqi',
    width: 110,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: false,
    cellRenderer: aqiCellRenderer,
    sort: 'asc',
  },
  {
    headerName: 'Status',
    field: 'aqiStatus',
    width: 220,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    editable: false,
    cellRenderer: statusCellRenderer,
  },
  {
    headerName: 'Temp (°C)',
    field: 'temperature',
    width: 120,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
  },
  {
    headerName: 'Humidity (%)',
    field: 'humidity',
    width: 130,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: intFormatter,
    valueSetter: (params) => {
      const newVal = Number(params.newValue)
      if (isNaN(newVal) || newVal < 0 || newVal > 100) return false
      params.data.humidity = Math.round(newVal)
      return true
    },
  },
  {
    headerName: 'Wind (km/h)',
    field: 'windSpeed',
    width: 130,
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    editable: true,
    valueFormatter: numberFormatter,
  },
  {
    headerName: 'Modified',
    field: 'isEdited',
    width: 100,
    filter: false,
    sortable: true,
    editable: false,
    cellRenderer: editedCellRenderer,
  },
]

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  minWidth: 80,
}

const rowSelection: RowSelectionOptions = {
  mode: 'multiRow',
}

// --- Event Handlers ---

function onGridReady(event: GridReadyEvent): void {
  gridApi.value = event.api
}

function onCellValueChanged(event: CellValueChangedEvent): void {
  const data = event.data as AirQualityReading
  if (['pm25', 'pm10', 'no2', 'so2', 'o3', 'co'].includes(event.colDef.field ?? '')) {
    const { aqi, aqiStatus } = recalculateAqi(data.pm25)
    data.aqi = aqi
    data.aqiStatus = aqiStatus
    data.isEdited = true
    event.api.refreshCells({ rowNodes: [event.node], force: true })
  }
  updateEditedCount()
}

function onSelectionChanged(): void {
  selectedRowCount.value = gridApi.value?.getSelectedRows().length ?? 0
}

// --- Toolbar Actions ---

function exportCsv(): void {
  gridApi.value?.exportDataAsCsv({
    fileName: `ecoscope-data-${new Date().toISOString().slice(0, 10)}.csv`,
    columnSeparator: ';',
  })
}

function refreshData(): void {
  rowData.value = []
  selectedRowCount.value = 0
  editedRowCount.value = 0
  refresh()
  lastRefresh.value = new Date().toLocaleTimeString()
}

function resetFilters(): void {
  gridApi.value?.setFilterModel(null)
  quickFilterText.value = ''
}

function autoSizeColumns(): void {
  gridApi.value?.autoSizeAllColumns()
}

function updateEditedCount(): void {
  editedRowCount.value = rowData.value.filter((r) => r.isEdited).length
}

// Apply quick filter when text changes
watch(quickFilterText, (text) => {
  gridApi.value?.setGridOption('quickFilterText', text)
})
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Environmental Data Explorer</h1>
        <p class="text-slate-500">
          Analyze, edit, and export global air quality data. Double-click any highlighted cell to
          edit — AQI recalculates automatically.
        </p>
      </div>

      <!-- Feature Pills -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="feature in [
            '✏️ Inline Editing',
            '🔍 Column Filters',
            '↕️ Multi-Sort',
            '✅ Validation',
            '📊 Auto AQI',
            '📁 CSV Export',
            '🔎 Quick Search',
            '📌 Pinned Columns',
          ]"
          :key="feature"
          class="px-3 py-1 text-xs font-medium bg-white border border-slate-200 rounded-full text-slate-600"
        >
          {{ feature }}
        </span>
      </div>

      <!-- Toolbar -->
      <div
        class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4 bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
      >
        <!-- Search -->
        <div class="relative flex-1 max-w-md">
          <Icon
            name="mdi:magnify"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
          />
          <input
            v-model="quickFilterText"
            type="text"
            placeholder="Quick filter across all columns..."
            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
          >
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            @click="exportCsv"
          >
            <Icon name="mdi:download" class="text-base" />
            Export CSV
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
            @click="refreshData"
          >
            <Icon name="mdi:refresh" class="text-base" />
            Refresh
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
            @click="resetFilters"
          >
            <Icon name="mdi:filter-remove-outline" class="text-base" />
            Clear Filters
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
            @click="autoSizeColumns"
          >
            <Icon name="mdi:arrow-expand-horizontal" class="text-base" />
            Auto-fit
          </button>
        </div>
      </div>

      <!-- AG Grid -->
      <ClientOnly>
        <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm" style="height: 620px; width: 100%">
          <!-- Loading overlay while API data is being fetched -->
          <div
            v-if="isLoading && !rowData.length"
            class="h-full flex items-center justify-center bg-white"
          >
            <div class="text-center">
              <Icon name="mdi:loading" class="text-4xl text-teal-500 mb-3 animate-spin" />
              <p class="text-slate-500 text-sm font-medium">Fetching live air quality data…</p>
              <p class="text-slate-400 text-xs mt-1">Querying Open-Meteo for 25 cities</p>
            </div>
          </div>
          <AgGridVue
            v-else
            :theme="ecoScopeTheme"
            :row-data="rowData"
            :column-defs="columnDefs"
            :default-col-def="defaultColDef"
            :row-selection="rowSelection"
            :pagination="true"
            :pagination-page-size="15"
            :pagination-page-size-selector="[10, 15, 25, 50]"
            :animate-rows="true"
            :enable-cell-text-selection="true"
            :suppress-row-click-selection="true"
            :undo-redo-cell-editing="true"
            style="height: 100%; width: 100%"
            @grid-ready="onGridReady"
            @cell-value-changed="onCellValueChanged"
            @selection-changed="onSelectionChanged"
          />
        </div>
        <template #fallback>
          <div
            class="h-[620px] bg-white rounded-xl border border-slate-200 animate-pulse flex items-center justify-center"
          >
            <div class="text-center">
              <Icon name="mdi:table-large" class="text-4xl text-slate-300 mb-3" />
              <p class="text-slate-400">Loading Data Explorer...</p>
            </div>
          </div>
        </template>
      </ClientOnly>

      <!-- Status Bar -->
      <div
        class="flex flex-wrap items-center justify-between mt-3 px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-500"
      >
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5">
            <Icon name="mdi:city-variant-outline" class="text-base text-teal-500" />
            {{ rowData.length }} cities
          </span>
          <span v-if="selectedRowCount > 0" class="flex items-center gap-1.5">
            <Icon name="mdi:check-circle" class="text-base text-blue-500" />
            {{ selectedRowCount }} selected
          </span>
          <span v-if="editedRowCount > 0" class="flex items-center gap-1.5">
            <Icon name="mdi:pencil" class="text-base text-teal-500" />
            {{ editedRowCount }} edited
          </span>
        </div>
        <span class="flex items-center gap-1.5 text-xs text-slate-400">
          <Icon name="mdi:clock-outline" class="text-sm" />
          Last refresh: {{ lastRefresh }}
        </span>
      </div>

      <!-- Help Tips -->
      <div class="mt-8 grid md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl p-5 border border-slate-200">
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:pencil-outline" class="text-teal-500 text-lg" />
            <h3 class="font-semibold text-slate-900">Inline Editing</h3>
          </div>
          <p class="text-sm text-slate-500">
            Double-click any colored cell to edit pollutant values. The AQI and Status columns
            recalculate automatically with validation.
          </p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-slate-200">
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:filter-outline" class="text-emerald-500 text-lg" />
            <h3 class="font-semibold text-slate-900">Smart Filtering</h3>
          </div>
          <p class="text-sm text-slate-500">
            Use floating filters below column headers for precise filtering. Supports text, number
            ranges, and multi-column sorting.
          </p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-slate-200">
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:download-outline" class="text-cyan-500 text-lg" />
            <h3 class="font-semibold text-slate-900">Data Export</h3>
          </div>
          <p class="text-sm text-slate-500">
            Export the current filtered view as CSV. Select specific rows with checkboxes and use
            Ctrl+Z for undo after editing.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
