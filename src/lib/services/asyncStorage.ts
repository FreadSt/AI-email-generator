export function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken)
}

export function removeAccessToken() {
  localStorage.removeItem('accessToken')
}

export function getHideOnboarding() {
  const hideOnboarding = localStorage.getItem('hideOnboarding')
  if (hideOnboarding) {
    return JSON.parse(hideOnboarding)
  }
  return false
}

export function setHideOnboarding(hideOnboarding: boolean) {
  localStorage.setItem('hideOnboarding', JSON.stringify(hideOnboarding))
}

export function removeHideOnboarding() {
  localStorage.removeItem('hideOnboarding')
}

export function getSuccessSendCount() {
  const isFirstLogin = localStorage.getItem('successSendCount')
  if (isFirstLogin) {
    return JSON.parse(isFirstLogin)
  }
  return isFirstLogin
}

export function setSuccessSendCount(successSendCount: number) {
  localStorage.setItem('successSendCount', JSON.stringify(successSendCount))
}

export function removeSuccessSendCount() {
  localStorage.removeItem('successSendCount')
}

export function getIsRegistered() {
  const isRegistered = localStorage.getItem('isRegistered')
  if (isRegistered) {
    return JSON.parse(isRegistered)
  }
  return false
}

export function setIsRegistered(isRegistered: boolean) {
  localStorage.setItem('isRegistered', JSON.stringify(isRegistered))
}

export function removeIsRegistered() {
  localStorage.removeItem('isRegistered')
}

export function getIsGranted() {
  const isGranted = localStorage.getItem('isGranted')
  if (isGranted) {
    return JSON.parse(isGranted)
  }
  return false
}

export function setIsGranted(isGranted: boolean) {
  localStorage.setItem('isGranted', JSON.stringify(isGranted))
}

export function removeIsGranted() {
  localStorage.removeItem('isGranted')
}
