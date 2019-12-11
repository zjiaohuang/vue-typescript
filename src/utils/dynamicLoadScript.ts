let callbacks: Array<any> = []

const dynamicLoadScript = (src: string, callback: (error: Error | null, element?: HTMLElement) => void, checkFun: () => boolean) => {
  const existingScript = document.getElementById(src)
  const cb = callback || function () { }

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src // src url for the third-party library being loaded.
    script.id = src
    document.body.appendChild(script)
    callbacks.push(cb)
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
    onEnd(script)
  }

  if (existingScript && cb) {
    if (checkFun()) {
      cb(null, existingScript)
    } else {
      callbacks.push(cb)
    }
  }

  function stdOnEnd(script: HTMLScriptElement) {
    script.onload = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      for (const cb of callbacks) {
        cb(null, script)
      }
      callbacks.splice(0)
    }
    script.onerror = function () {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd(script: any) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      for (const cb of callbacks) {
        cb(null, script) // there is no way to catch loading errors in IE8
      }
      callbacks.splice(0)
    }
  }
}

export default dynamicLoadScript
