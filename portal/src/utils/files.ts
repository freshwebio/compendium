export const upperCamelCase = (input: string): string => {
  const firstChar = input.charAt(0).toUpperCase()
  const restOfInput = input.slice(1)
  return (
    firstChar +
    restOfInput.replace(
      /([-|_])(\w)/g,
      (match: string, p1: string, p2: string): string => {
        return p2.toUpperCase()
      }
    )
  )
}

export const removeFileExt = (filePath: string): string => {
  return filePath.replace(/(\.[\w|\d]+)$/g, '')
}

export const toLabel = (pathOrName: string): string => {
  const firstChar = pathOrName.charAt(0).toUpperCase()
  const restOfPathOrName = pathOrName.slice(1)
  return firstChar + restOfPathOrName.replace(/[-|_]/g, ' ')
}

export const serviceInputToFile = (serviceName: string): string => {
  return `${serviceName.replace(/[\s]/g, '-')}.yaml`
}

export const groupInputToDir = (groupName: string): string => {
  return groupName.replace(/[\s]/g, '-')
}

export const idToServiceDefinitionPath = (serviceId: string): string => {
  const parts = serviceId.split('::')
  const serviceGroupDir = parts.length > 1 ? `${parts[0]}/` : ''
  const servicePart = parts.length > 1 ? parts[1] : parts[0]
  return `${serviceGroupDir}${servicePart}.yaml`
}
