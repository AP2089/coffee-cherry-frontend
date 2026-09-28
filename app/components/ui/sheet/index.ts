import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Sheet } from './Sheet.vue'
export { default as SheetContent } from './SheetContent.vue'

export const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  },
)

export type SheetVariants = VariantProps<typeof sheetVariants>
