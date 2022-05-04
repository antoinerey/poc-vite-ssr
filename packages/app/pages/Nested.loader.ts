import { sleep } from '../helpers'

export default async function loader() {
  await sleep(1000)
  return { age: 9999 }
}
