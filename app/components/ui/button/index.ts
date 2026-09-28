import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,background-color,border-color,transform] duration-300 ease-premium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-border bg-background/80 text-foreground backdrop-blur-md hover:border-primary hover:text-primary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        magnetic: 'magnetic-btn font-display text-xs uppercase tracking-[0.04em]',
        'magnetic-filled':
          'magnetic-btn magnetic-btn--filled font-display text-xs uppercase tracking-[0.04em]',
        'ghost-text':
          'bg-transparent p-0 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        icon: 'size-10 p-0',
        'icon-sm': 'size-9 p-0',
        'icon-lg': 'size-12 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
