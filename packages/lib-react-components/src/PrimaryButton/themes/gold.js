import { normalizeColor } from 'grommet/utils'
import { css } from 'styled-components'
import getGradientShade from '../helpers/getGradientShade'

const theme = {
  button: {
    border: {
      color: 'neutral-4',
      width: '1px'
    },
    color: {
      dark: 'white',
      light: 'black'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-4'
      }
    },
    extend: props => {
      const color = normalizeColor('neutral-4', props.theme)
      const gradientShade = getGradientShade(color)

      return css`
        transition: none;
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          color: black;
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
        }
        &:active:not(:disabled) {
          color: black;
          background: linear-gradient(${gradientShade}, ${color});
        }
    `}
  }
}

export default theme
