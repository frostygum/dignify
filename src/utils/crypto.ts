
export const generateMD5 = (s: string): number => {
  return s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)
}