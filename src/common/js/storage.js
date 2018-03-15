/* eslint-disable */
import storage from 'good-storage'

const USER_KEY = '__user__'
const POSITION_KEY = '__position__'

export function setUserInfo(obj) {
  storage.session.set(USER_KEY, obj)
}

export function getUserInfo() {
  return storage.session.get(USER_KEY, {})
}

export function setPosition(obj) {
  storage.session.set(POSITION_KEY, obj)
}

export function getPosition() {
  return storage.session.get(POSITION_KEY, {})
}

export function clearStorage() {
  storage.session.clear()
}
