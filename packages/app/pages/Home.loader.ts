import { sleep } from '../helpers'

export default async function loader() {
  await sleep(1000)
  return { name: 'John Blank' }
}
