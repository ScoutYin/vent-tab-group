export const throttle = (fn, threshhold) => {
  let timer
  let start = +new Date()
  let maxWait = threshhold || 160
  return (...args) => {
    let now = +new Date()
    clearTimeout(timer)
    if (now - start > maxWait) {
      fn(...args)
      start = now
    } else {
      timer = setTimeout(() => {
        fn(...args)
      }, maxWait)
    }
  }
}
