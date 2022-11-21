import React from 'react'
import { NativeBaseProvider , extendTheme } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import AppNavigator from './src/navigator'
import Loading from './src/components/Loading'
import store from './src/redux/store'

const App = () => {

  let persistor = persistStore(store)

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
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
          <Loading/>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  )
}

export default App