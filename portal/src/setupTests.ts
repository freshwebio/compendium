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
