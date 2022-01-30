import { fromPairs } from "ramda"

export type Params = {
  [key: string]: any
}

const useSearchParams = (searchString: string) => {
  const urlSearchParams: any = new URLSearchParams(searchString)

  const updatedPairs = new Array()
  /* eslint-disable-next-line */
  for (const pair of urlSearchParams.entries()) {
    updatedPairs.push(pair)
  }

  const searchParams: Params = fromPairs(updatedPairs)
  return { searchParams }
}

export { useSearchParams }
