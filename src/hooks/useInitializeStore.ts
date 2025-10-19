import { ref } from 'vue'

export function useInitializeStore(method: () => Promise<void>) {
  const initialized = ref(false)
  const loading = ref(false)

  ;(async function () {
    loading.value = true
    await method()
    initialized.value = true
    loading.value = false
  })()

  return { initialized, loading }
}
