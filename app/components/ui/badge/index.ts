import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center gap-1 border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        cart: 'h-7 min-w-7 justify-center rounded-full border-border px-2 text-xs font-normal',
        unread:
          'absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full border-transparent bg-primary px-1 text-[10px] text-background',
        flavor: 'border px-4 py-2 text-sm font-normal tracking-wide',
      },
    },
    defaultVariants: {
      variant: 'cart',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
