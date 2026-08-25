import React, { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const Component = href ? 'a' : 'button'

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      className={`group relative inline-flex items-center justify-center overflow-hidden border border-white/30 px-6 md:px-7 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-white transition-colors duration-150 hover:text-black hover:border-white cursor-pointer select-none whitespace-nowrap ${className}`}
      {...props}
    >
      {/* Content stays elevated above the background fill */}
      <span className="relative z-10 transition-colors duration-150">
        {children}
      </span>

      {/* Bottom container with before and after matching dimensions, expanding to full width on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-full overflow-hidden
          before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-full before:bg-white before:transition-all before:duration-500 before:ease-out group-hover:before:w-full
          after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-full after:bg-white after:transition-all after:duration-500 after:ease-out group-hover:after:w-full"
      />
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
