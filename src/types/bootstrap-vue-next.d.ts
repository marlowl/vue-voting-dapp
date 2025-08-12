declare module 'bootstrap-vue-next' {
  import { Plugin } from 'vue'
  // Provide only the pieces we actually consume; extend as needed.
  export const bootstrapPlugin: Plugin
}
