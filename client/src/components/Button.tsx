import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type SharedProps = {
  children: ReactNode
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonProps = SharedProps &
  (
    | ({ href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        keyof SharedProps | 'href'
      >)
    | ({ href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        keyof SharedProps
      >)
  )

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-black text-brand-paper hover:bg-ink/85',
  accent: 'bg-brand-gold text-brand-black hover:bg-gold-hover',
  secondary:
    'border border-line bg-surface text-ink hover:border-brand-gold hover:bg-subtle',
  ghost: 'text-ink hover:bg-subtle',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-sm',
  lg: 'min-h-14 px-6 text-base',
}

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string | undefined,
) {
  return [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

function Button(props: ButtonProps) {
  const { children, className, size = 'md', variant = 'primary' } = props
  const classes = buttonClassName(variant, size, className)

  if (props.href !== undefined) {
    const { href, ...linkProps } = props
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  )
}

export default Button
