import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Toggle } from './Toggle.vue'

export const toggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-foreground data-[state=on]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default:
          'border border-border bg-transparent text-muted-foreground hover:border-border hover:text-foreground',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        pill: 'rounded-full border-0 bg-transparent px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground data-[state=on]:bg-secondary data-[state=on]:text-foreground',
        weight:
          'cursor-pointer border border-border bg-transparent px-4 py-2 text-sm data-[state=on]:border-foreground data-[state=on]:text-foreground data-[state=off]:text-muted-foreground data-[state=off]:hover:border-foreground/70 data-[state=off]:hover:bg-accent/50 data-[state=off]:hover:text-foreground',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
