import { Box, ResponsiveContext } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { MovableModal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from '../../locales/en'

import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { active: fieldGuide, activeItemIndex } = stores.classifierStore.fieldGuide
  return {
    activeItemIndex,
    items: fieldGuide?.items || []
  }
}

@inject(storeMapper)
@withTheme
@observer
class FieldGuide extends React.Component {
  render () {
    const { activeItemIndex, className, items, onClose } = this.props
    return (
      <ResponsiveContext.Consumer>
        {size => {
          const height = (size === 'small') ? '100%' : '415px'
          const width = (size === 'small') ? '100%' : '490px'
          return (
            <MovableModal
              active
              closeFn={onClose}
              modal={false}
              pad='medium'
              plain
              position='right'
              rndProps={{
                minHeight: height,
                minWidth: width,
                position: {
                  x: 0 - (490 + 60), // width plus margins
                  y: 0 - (415 + 60) * 0.5 // centers vertically
                }
              }}
              title={counterpart('FieldGuide.title')}
            >
              <Box
                className={className}
                height={height}
                width={width}
              >
                {items[activeItemIndex]
                  ? <FieldGuideItem item={items[activeItemIndex]} />
                  : <FieldGuideItems items={items} />
                }
              </Box>
            </MovableModal>
          )
        }}
      </ResponsiveContext.Consumer>
    )
  }
}

FieldGuide.wrappedComponent.defaultProps = {
  activeItemIndex: -1,
  className: '',
  onClose: () => {}
}

FieldGuide.wrappedComponent.propTypes = {
  activeItemIndex: PropTypes.number,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func
}

export default FieldGuide
