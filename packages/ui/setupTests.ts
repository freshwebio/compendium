import 'jest-extended'
import 'jest-styled-components'

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Makes window.location properties writable in tests.
const windowLocation = JSON.stringify(window.location)
delete window.location
Object.defineProperty(window, 'location', {
  value: JSON.parse(windowLocation),
})

expect.extend({
  toContainObject(received, argument): any {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    )

    if (pass) {
      return {
        message: (): any =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      }
    } else {
      return {
        message: (): any =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      }
    }
  },
})
