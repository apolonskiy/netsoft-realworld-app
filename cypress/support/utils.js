export const randomString = (length = 8) => {
  let randString = ''
  let randomAscii
  for (let i = 0; i < length; i += 1) {
    randomAscii = Math.floor(Math.random() * 25 + 97)
    randString += String.fromCharCode(randomAscii)
  }
  return randString
}
export const randomName = (pattern = '{}', length = 8) => {
  if (pattern.indexOf('{}') === -1) {
    throw new Error(`patterns "${pattern}" does not contain "{}"`)
  }
  return pattern.replace('{}', randomString(length))
}
