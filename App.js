import React from 'react'
import { NativeBaseProvider ,extendTheme } from 'native-base'
import { Provider } from 'react-redux'
import AppNavigator from './src/navigator'
import Loading from './src/components/Loading'
import store from './src/redux/store'

const App = () => {

  const theme = extendTheme({
    components: {
      Input: {
        baseStyle: {
          color: '#ffffff',
        },
        variants: {
          fill: () => {
            return {
              bg: '#272a3f',
              borderWidth: '2',
              _focus: {
                bg: 'transparent',
              },
              _hover: {
                borderWidth: '2',
                _disabled: {
                  borderWidth: 0,
                },
              },
            }
          }
        },
        sizes: 'lg'
      },
      IconButton: {
        sizes: {
          lg: {
            p: 5,
            _icon: {
              size: 18
            }
          }
        }
      }
    }
  })

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <AppNavigator />
        <Loading/>
      </Provider>
    </NativeBaseProvider>
  )
}

export default App