type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[] = []
): string {
  const result = [cls, ...additional.filter(Boolean)];
  for (let key in mods) {
    if (mods[key]) result.push(key);
  }
  return result.join(" ");
}
