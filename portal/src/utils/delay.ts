const delay = (durationInMS: number): Promise<void> => {
  return new Promise(
    (resolve): void => {
      setTimeout((): void => {
        resolve()
      }, durationInMS)
    }
  )
}

export default delay
