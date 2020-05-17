import React, { useState } from 'react'
import { act, ReactTestRenderer, create } from 'react-test-renderer'
import createWithTheme from 'testUtils/createWithTheme'
import mockTheme from 'testUtils/mockTheme'

import InlineAddField from './InlineAddField'
import { AddCTAWrapper, AddInputWrapper } from './inlineAddField.styles'
import IconButton from 'components/IconButton'

describe('InlineAddField', (): void => {
  it('should render without crashing', (): void => {
    const wrapper = createWithTheme(
      <InlineAddField
        entityName="group"
        iconColour="white"
        alignment="left"
        finished={false}
      />,
      mockTheme
    )
    expect(wrapper.root.findAllByType('div').length).toBeGreaterThanOrEqual(1)
  })

  it('should open the edit view and hide the call to action when the call to action has been clicked', async (): Promise<
    void
  > => {
    const rendered = createWithTheme(
      <InlineAddField
        entityName="group"
        iconColour="white"
        alignment="left"
        finished={false}
      />,
      mockTheme
    )

    expect(rendered.root.findByType(AddInputWrapper).props.visible).toBeFalse()
    expect(rendered.root.findByType(AddCTAWrapper).props.visible).toBeTrue()

    await act(
      async (): Promise<void> => {
        rendered.root.findByType(AddCTAWrapper).props.onClick()
      }
    )

    expect(rendered.root.findByType(AddInputWrapper).props.visible).toBeTrue()
    expect(rendered.root.findByType(AddCTAWrapper).props.visible).toBeFalse()
  })

  it('should not allow the user to save when they have not provided any text input', async (): Promise<
    void
  > => {
    const rendered = createWithTheme(
      <InlineAddField
        entityName="group"
        iconColour="white"
        alignment="left"
        finished={false}
      />,
      mockTheme
    )

    await act(
      async (): Promise<void> => {
        rendered.root.findByType(AddCTAWrapper).props.onClick()
      }
    )

    // The check is the second icon button in the compoennt.
    expect(rendered.root.findAllByType(IconButton)[1].props.disabled).toBeTrue()
  })

  it('should trigger our save callback when the user clicks the icon to save in the case they have provided text input', async (): Promise<
    void
  > => {
    const onSave = jest.fn()

    const rendered = createWithTheme(
      <InlineAddField
        entityName="group"
        iconColour="white"
        onSave={onSave}
        alignment="left"
        finished={false}
      />,
      mockTheme
    )

    await act(
      async (): Promise<void> => {
        rendered.root.findByType(AddCTAWrapper).props.onClick()
      }
    )

    await act(
      async (): Promise<void> => {
        rendered.root
          .findByType('input')
          .props.onChange({ target: { value: 'test service 1' } })
      }
    )

    await act(
      async (): Promise<void> => {
        rendered.root.findAllByType(IconButton)[1].props.onClick()
      }
    )

    expect(onSave).toHaveBeenCalledWith('test service 1')
  })

  it('should hide the edit view on cancel', async (): Promise<void> => {
    const rendered = createWithTheme(
      <InlineAddField
        entityName="group"
        iconColour="white"
        alignment="left"
        finished={false}
      />,
      mockTheme
    )

    await act(
      async (): Promise<void> => {
        rendered.root.findByType(AddCTAWrapper).props.onClick()
      }
    )

    expect(rendered.root.findByType(AddInputWrapper).props.visible).toBeTrue()

    await act(
      async (): Promise<void> => {
        // The cancel button is the third icon button in the component.
        rendered.root.findAllByType(IconButton)[2].props.onClick()
      }
    )

    expect(rendered.root.findByType(AddInputWrapper).props.visible).toBeFalse()
  })

  it('should hide the edit view when finished saving', async (): Promise<
    void
  > => {
    const TestComp = (): React.ReactElement => {
      const [finished, setFinished] = useState<boolean>(false)
      return (
        <>
          <div className="test-div-1" onClick={(): void => setFinished(true)} />
          <InlineAddField
            entityName="group"
            iconColour="white"
            alignment="right"
            finished={finished}
          />
        </>
      )
    }

    // Use act to let react stabilise and have an input ref ready to be focused.
    let rendered: ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        rendered = create(<TestComp />, {
          // Provides a mock dom node of the input in the field
          // so we can capture the focus.
          createNodeMock: (element: React.ReactElement): any => {
            if (element.type === 'input') {
              // mock a focus function, doesn't need to do anything,
              // just allows us to reach a code path of focusing an input in the component.
              return {
                focus: (): void => {
                  console.log('focused!')
                },
              }
            }
            return null
          },
        })
      }
    )

    const renderedWrapper = (rendered as unknown) as ReactTestRenderer

    await act(
      async (): Promise<void> => {
        renderedWrapper.root.findByType(AddCTAWrapper).props.onClick()
      }
    )

    await act(
      async (): Promise<void> => {
        // The cancel button is the third icon button in the component.
        renderedWrapper.root
          .findByType('input')
          .props.onChange({ target: { value: 'test service 2' } })
      }
    )

    await act(
      async (): Promise<void> => {
        // The save/check button is the second icon button in the component.
        renderedWrapper.root.findAllByType(IconButton)[1].props.onClick()
      }
    )

    expect(
      renderedWrapper.root.findByType(AddInputWrapper).props.visible
    ).toBeTrue()

    await act(
      async (): Promise<void> => {
        // The save/check button is the second icon button in the component.
        renderedWrapper.root
          .findByProps({ className: 'test-div-1' })
          .props.onClick()
      }
    )

    expect(
      renderedWrapper.root.findByType(AddInputWrapper).props.visible
    ).toBeFalse()
  })
})
