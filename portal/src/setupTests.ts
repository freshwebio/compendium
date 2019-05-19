import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import 'jest-extended'
import 'jest-styled-components'

configure({ adapter: new Adapter() })

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

process.env.REACT_APP_API_BASE_URL = 'https://api.apydox.com'
