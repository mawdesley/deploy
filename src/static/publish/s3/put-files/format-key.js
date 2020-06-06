let { sep } = require('path')

module.exports = function formatKey (params) {
  let { file, fingerprint, publicDir, prefix, staticManifest } = params

  // Remove the public dir so the S3 path (called 'Key') is relative
  let Key = file.replace(`${publicDir}${sep}`, '')
  if (Key.startsWith(sep)) Key = Key.substr(1)

  // If fingerprint is set to 'external', don't mutate the file Key, it's assumed to be fingerprinted
  if (fingerprint && (fingerprint !== 'external') && Key !== 'static.json') {
    Key = staticManifest[Key]
  }

  // Prepend prefix if present
  if (prefix) Key = `${prefix}/${Key}`

  return Key
}