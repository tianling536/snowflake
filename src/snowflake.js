'use strict'
/**
 *  # snowflake
 *  Snowflake ![snowflake](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from 'react'
import {
  AppRegistry,
  StyleSheet
} from 'react-native'

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
  Router,
  Scene
} from 'react-native-router-flux'

import scenes from './scenes'

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider
} from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore'

/** 
 * ### Translations
 */
import I18n from 'react-native-i18n'

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'
I18n.translations = Translations

/**
 * ### containers
 *
 * All the top level containers
 *
 */
import App from './containers/App'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'
import ForgotPassword from './containers/ForgotPassword'
import Profile from './containers/Profile'
import Main from './containers/Main'
import Subview from './containers/Subview'


/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import { setPlatform, setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'

/**
 *  The version of the app but not  displayed yet
 */
import pack from '../package'
var VERSION = pack.version


const styles = StyleSheet.create({
  tabBar: {
    height: 70
  }
})


/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {
  let Snowflake = React.createClass({
    render() {
      const store = configureStore()

      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store))

      // setup the router table with App selected as the initial component
      // note: See https://github.com/aksonov/react-native-router-flux/issues/948
      return (
        <Provider store={store}>
          <Router sceneStyle={{ backgroundColor: 'white' }} scenes={scenes} />
        </Provider>
      )
    }
  })

  /**
   * registerComponent to the AppRegistery and off we go....
   */
  AppRegistry.registerComponent('snowflake', () => Snowflake)
}
