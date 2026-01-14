<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner";
import { reactiveOmit } from "@vueuse/core";
import { Toaster as Sonner } from "vue-sonner";
import DyIcon from "../icon/DyIcon.vue";
import { mdiAlertOutline, mdiCheckCircleOutline, mdiCloseCircleOutline, mdiInformationOutline, mdiLoading } from "@mdi/js";

const props = defineProps<ToasterProps>()
const delegatedProps = reactiveOmit(props, "toastOptions")
</script>

<template>
  <Sonner
    class="toaster group"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }"
    v-bind="delegatedProps"
  >
    <template #success-icon>
      <DyIcon :path="mdiCheckCircleOutline" />
    </template>
    <template #info-icon>
      <DyIcon :path="mdiInformationOutline" />
    </template>
    <template #warning-icon>
      <DyIcon :path="mdiAlertOutline" />
    </template>
    <template #error-icon>
      <DyIcon :path="mdiCloseCircleOutline" />
    </template>
    <template #loading-icon>
      <div>
        <DyIcon :path="mdiLoading" class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <DyIcon :path="mdiCloseCircleOutline" />
    </template>
  </Sonner>
</template>
