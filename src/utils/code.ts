import rc4 from 'crypto-js/rc4'
import encUtf8 from 'crypto-js/enc-utf8'

const key = '1234@abc'

/**
 * 使用RC4加密字符串
 * @param {string} val 待加密字符串
 * @param {string} [cipherKey=key] 密钥，默认使用key
 * @returns
 */
export function encrypt(val: string, cipherKey: string = key) {
  return rc4.encrypt(val, cipherKey).toString()
}

/**
 * 使用RC4解密字符串
 * @param {string} val 待解密字符串
 * @param {string} [cipherKey=key] 密钥，默认使用key
 * @returns
 */
export function decrypt(val: string, cipherKey: string = key) {
  let decryptVal = rc4.decrypt(val, cipherKey)
  return encUtf8.stringify(decryptVal)
}
