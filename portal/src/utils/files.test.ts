import {
  upperCamelCase,
  removeFileExt,
  toLabel,
  idToServiceDefinitionPath,
} from './files'

describe('file name and path utility functions', (): void => {
  describe('#upperCamelCase()', (): void => {
    it('should convert a snake_case string to UpperCamel case', (): void => {
      expect(upperCamelCase('this_is_the_test_string')).toBe(
        'ThisIsTheTestString'
      )
    })
  })

  describe('#removeFileExt()', (): void => {
    it('should remove a range of file variations of file extensions', (): void => {
      expect(removeFileExt('Service1.yaml')).toBe('Service1')
      expect(removeFileExt('Service2.yml')).toBe('Service2')
      expect(removeFileExt('Service3.json')).toBe('Service3')
    })
  })

  describe('#toLabel()', (): void => {
    it('should replace _ and - with empty spaces and set first character to upper case', (): void => {
      expect(toLabel('this_is_another-test_string')).toBe(
        'This is another test string'
      )
    })
  })

  describe('#idToServiceDefinitionPath()', (): void => {
    it(
      'should convert an id with a group {group}::{service}.{extension}' +
        ' to the actual file path in the git repo',
      (): void => {
        expect(idToServiceDefinitionPath('core-services::Service1')).toBe(
          'core-services/Service1.yaml'
        )
      }
    )

    it('should convert an id without a group to the actual file path with the extension', (): void => {
      expect(idToServiceDefinitionPath('Service2')).toBe('Service2.yaml')
    })
  })
})
