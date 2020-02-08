import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'
import ResourceInfoBar from './ResourceInfoBar'
import { Pica, BodyCopy, PicaSerif } from '@typography/Typography'
import { ResourceInfoBarColourScheme } from './colourScheme'
import styled from 'styled-components'

const stories = storiesOf('Resource Information Bar', module)

const Wrapper = styled.div`
  max-width: 500px;
`

stories.add('Resource Information Bar (Leading, Centre, Trailing)', () => (
  <Wrapper>
    <ResourceInfoBar
      leading={<Pica>/videos</Pica>}
      trailing={<PicaSerif>POST</PicaSerif>}
      centre={
        <BodyCopy ellipsis>
          Save the metadata for a new video to our selection of available videos
          on the platform. after being saved the video won't be activated until
          the contents have been verified.
        </BodyCopy>
      }
      hideOverflow
      colourScheme={select(
        'Colour Scheme',
        {
          Primary: ResourceInfoBarColourScheme.Primary,
          'Grey Scale Light': ResourceInfoBarColourScheme.GreyScaleLight,
          'Grey Scale Dark': ResourceInfoBarColourScheme.GreyScaleDark,
          'Secondary Light': ResourceInfoBarColourScheme.SecondaryLight,
          'Secondary Dark': ResourceInfoBarColourScheme.SecondaryDark,
          Tertiary: ResourceInfoBarColourScheme.Tertiary,
          Red: ResourceInfoBarColourScheme.Red,
          Green: ResourceInfoBarColourScheme.Green,
        },
        ResourceInfoBarColourScheme.Primary
      )}
    />
  </Wrapper>
))

stories.add('Resource Information Bar (LONG Leading, Centre, Trailing)', () => (
  <Wrapper>
    <ResourceInfoBar
      leading={<Pica>{'/project/{id}/track/{track_id}/midi/{region}'}</Pica>}
      centre={<BodyCopy ellipsis>Update a midi region in a track.</BodyCopy>}
      trailing={<PicaSerif>PATCH</PicaSerif>}
      hideOverflow
      colourScheme={select(
        'Colour Scheme',
        {
          Primary: ResourceInfoBarColourScheme.Primary,
          'Grey Scale Light': ResourceInfoBarColourScheme.GreyScaleLight,
          'Grey Scale Dark': ResourceInfoBarColourScheme.GreyScaleDark,
          'Secondary Light': ResourceInfoBarColourScheme.SecondaryLight,
          'Secondary Dark': ResourceInfoBarColourScheme.SecondaryDark,
          Tertiary: ResourceInfoBarColourScheme.Tertiary,
          Red: ResourceInfoBarColourScheme.Red,
          Green: ResourceInfoBarColourScheme.Green,
        },
        ResourceInfoBarColourScheme.Primary
      )}
    />
  </Wrapper>
))

stories.add('Resource Information Bar (Leading, Trailing)', () => (
  <Wrapper>
    <ResourceInfoBar
      leading={<Pica>{'/video/{id}'}</Pica>}
      trailing={<PicaSerif>PATCH</PicaSerif>}
      colourScheme={select(
        'Colour Scheme',
        {
          Primary: ResourceInfoBarColourScheme.Primary,
          'Grey Scale Light': ResourceInfoBarColourScheme.GreyScaleLight,
          'Grey Scale Dark': ResourceInfoBarColourScheme.GreyScaleDark,
          'Secondary Light': ResourceInfoBarColourScheme.SecondaryLight,
          'Secondary Dark': ResourceInfoBarColourScheme.SecondaryDark,
          Tertiary: ResourceInfoBarColourScheme.Tertiary,
          Red: ResourceInfoBarColourScheme.Red,
          Green: ResourceInfoBarColourScheme.Green,
        },
        ResourceInfoBarColourScheme.Primary
      )}
    />
  </Wrapper>
))
