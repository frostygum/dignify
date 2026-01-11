import type { HTMLAttributes } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

export const dyNavigationBottomItemVariants = cva('rounded-lg mx-3 my-2 text-xs', {
  variants: {
    variant: {
      default: '',
      active: '',
      primary: 'text-primary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type DyNavigationBottomItemVariants = VariantProps<typeof dyNavigationBottomItemVariants>

export interface DyNavigationBottomItemProps {
  label?: string
  name?: string,
  variant?: DyNavigationBottomItemVariants['variant']
  icon?: string
  click?: () => void
  class?: HTMLAttributes['class']
}

export interface DyNavigationBottomProps {
  items?: DyNavigationBottomItemProps[]
  activeMenu?: string,
  isMobile?: boolean
  duration?: number,
  timestamp?: number,
  title?: string,
  artist?: string,
  cover?: string,
  isPlaying?: boolean,
  hasPlayer?: boolean,
  togglePlayer?: () => void,
  handleClick?: () => void
}
