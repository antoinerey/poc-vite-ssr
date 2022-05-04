const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function loader() {
  await sleep(1000)
  return { age: 9999 }
}
