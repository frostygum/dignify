import { cva, type VariantProps } from 'class-variance-authority'

export const dyNavigationHeaderVariants = cva(
  'flex items-center text-gray-700 h-14 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600',
  {
    variants: {
      variant: {
        default: '',
        leftControl: 'pr-4',
        rightControl: 'pl-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const dyNavigationHeaderTextVariants = cva(
  'flex-auto w-100 font-medium truncate text-ellipsis overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-start',
        center: 'text-center',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type DyNavigationHeaderVariants = VariantProps<typeof dyNavigationHeaderVariants>
export type DyNavigationHeaderTextVariants = VariantProps<typeof dyNavigationHeaderTextVariants>
