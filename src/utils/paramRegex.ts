export const paramRegex = (name?: string) => new RegExp(`((?<=--)${name || '[a-z]'}+)|((?<==).+)`, 'gi')
