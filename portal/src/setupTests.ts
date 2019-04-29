import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

configure({ adapter: new Adapter() })

// Makes window.location properties writable in tests.
const windowLocation = JSON.stringify(window.location)
delete window.location
Object.defineProperty(window, 'location', {
  value: JSON.parse(windowLocation),
})
