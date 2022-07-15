const dataMap: Map<string, unknown> = new Map()

/**
 * react-queryを自前で用意するとこんな感じになるらしい
 * https://zenn.dev/uhyo/books/react-concurrent-handson
 */
export function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as T | undefined
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cacheKey, d))
  }
  return cachedData
}
