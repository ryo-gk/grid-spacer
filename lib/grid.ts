export interface Option {
  containerClass: string
  spacerClass?: string
  spacerTag?: string
  type?: 'fill' | 'fit'
}

export type CssStyles = Partial<Record<keyof CSSStyleDeclaration, string>>
const SHIM_CLASS = 'shim'

export function useGrid(options: Option) {
  let container: Element | null

  const containerClass = toClassSelector(options.containerClass)
  const spacerClass = options.spacerClass ? toClassName(options.spacerClass) : 'spacer'
  const spacerTag = options.spacerTag ?? 'div'
  const type = options.type ?? 'fit'

  window.addEventListener('resize', adjustSpacer)

  const observer = new MutationObserver((_, observer) => {
    observer.disconnect()

    adjustSpacer()

    container && observer.observe(container, { childList: true })
  })

  function execute() {
    container = document.querySelector(containerClass)

    adjustSpacer()

    container && observer.observe(container, { childList: true })
  }

  function adjustSpacer() {
    document.querySelectorAll(`${containerClass} ${toClassSelector(spacerClass)}.${SHIM_CLASS}`)
      .forEach(n => n.remove())

    container = document.querySelector(containerClass)

    const trackCount = container?.childElementCount ?? 0
    const perRow = getPerRow(container)
    const mod = perRow !== 0 ? trackCount % perRow : 0
    const lack = mod !== 0 ? perRow - mod : 0

    const fragment = createSpacers(lack, spacerTag, spacerClass, type)

    container?.appendChild(fragment!)
  }

  return {
    execute
  }
}

function toClassSelector(name: string) {
  return name.startsWith('.') ? name : '.' + name
}

function toClassName(name: string) {
  return name.startsWith('.') ? name.slice(1) : name
}

function createSpacers(size: number, tag: string, classes: string, type: 'fill' | 'fit') {
  let fragment = document.createDocumentFragment()

  if (size === 0) {
    return fragment
  }

  if (type === 'fill') {
    const spacer = createSpacer(tag, classes, { gridColumn: `span ${size}`})

    fragment.appendChild(spacer)

    return fragment
  }

  if (type === 'fit') {
    for (let i = 0; i < size; i++) {
      fragment.appendChild(createSpacer(tag, classes))
    }
  }

  return fragment
}

function createSpacer(tag: string, classes?: string, styles?: CssStyles) {
  const spacer = document.createElement(tag)

  if (classes) {
    spacer.className = `${classes} ${SHIM_CLASS}`
  }

  if (styles) {
    for (const s in styles) {
      spacer.style[s] = styles[s]!
    }
  }

  return spacer
}

function getPerRow(container: Element | null) {
  return container
    ? window.getComputedStyle(container).getPropertyValue('grid-template-columns').split('px ').length
    : 0
}