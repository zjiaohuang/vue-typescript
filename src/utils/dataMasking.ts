// 脱敏函数

export function mobileMasking(mobile: string): string {
  let newMobile: string = mobile
  if (mobile.length > 7) {
    newMobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return newMobile
}

export function emailMasking(email: string): string {
  let newEmail = email
  if (String(email).indexOf('@') > 0) {
    const str: String[] = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (let i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    newEmail = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return newEmail
}

export function bankCardMasking(bankCard: string): string {
  return ''
}
