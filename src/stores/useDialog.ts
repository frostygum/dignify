import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface DialogActionProps {
  label?: string
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: () => void
}

export interface DialogProps {
  title?: string
  contents?: string
  actions?: {
    positive?: DialogActionProps
    negative?: DialogActionProps
  }
  closeableAction?: boolean
  closeableOverlay?: boolean
}

export const useDialogStore = defineStore('dialog', () => {
  const isOpen = ref<boolean>(false)
  const content = ref<DialogProps>()

  const open = (prop: DialogProps) => {
    content.value = prop
    isOpen.value = true
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const forcedClose = () => {
    isOpen.value = false
  }

  const setIsLoading = (action: 'negative' | 'positive', value: boolean = false) => {
    if (content.value?.actions?.[action]) {
      content.value!.actions![action].isLoading = value
    }
  }

  const setIsDisable = (action: 'negative' | 'positive', value: boolean = false) => {
    if (content.value?.actions?.[action]) {
      content.value!.actions![action].isDisabled = value
    }
  }

  return { isOpen, content, open, toggle, forcedClose, setIsLoading, setIsDisable }
})
