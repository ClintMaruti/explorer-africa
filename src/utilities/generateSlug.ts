export const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/ /g, '-')
}
