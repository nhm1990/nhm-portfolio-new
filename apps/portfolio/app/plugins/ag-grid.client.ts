import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import {
  AllCommunityModule as ChartsAllCommunityModule,
  ModuleRegistry as ChartsModuleRegistry,
} from 'ag-charts-community'

export default defineNuxtPlugin(() => {
  // Register AG Grid community modules
  ModuleRegistry.registerModules([AllCommunityModule])
  // Register all AG Charts community modules (line, bar, area, donut, axes, etc.)
  ChartsModuleRegistry.registerModules([ChartsAllCommunityModule])
})
