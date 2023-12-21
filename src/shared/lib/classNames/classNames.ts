export type ModsProps = Record<string, boolean | string>

export const classNames = (cls: string, mods: ModsProps = {}, className: string[] = []) => {
  return [
    cls,
    ...Object.entries(mods)
      .filter(([cls, value]) => !!value)
      .map(([cls, value]) => cls),
    ...className.filter(Boolean),
  ].join(' ')
}
