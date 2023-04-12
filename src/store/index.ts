import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineStore('global', {
  // persist 字段中 key 是存储在本地的键名，path 是需要持久化的数据
  persist: {
    key: 'pinia',
    paths: ['user']
  },
  state: () => ({}),
  actions: {}
})

export const pinia = createPinia().use(
  createPersistedState({
    // 重新定义 pinia 持久化的 storage 使用 uniapp 的 api 进行存取
    storage: {
      getItem(key: string): string | null {
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        uni.setStorageSync(key, value)
      }
    }
  })
)
