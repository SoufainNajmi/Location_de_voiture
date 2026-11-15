type SectionHeadingProps = {
  description?: string
  eyebrow?: string
  align?: 'left' | 'center'
  id?: string
  title: string
}

function SectionHeading({
  description,
  eyebrow,
  align = 'left',
  id,
  title,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
