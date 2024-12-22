export const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || 'Please enter a valid email address'
  },
  required: (v: any) => !!v || 'This field is required',
}
export function avatarColor(userName: string) {
  const colors = ['#E78895', '#F6995C', '#51829B', '#F6995C', '#EADFB4']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}
export function formateNumber(val: number) {
  return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
export function formateAmountBath(val: number, digit: number = 0) {
  val = Number(val)
  return '฿' + val.toFixed(digit).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
