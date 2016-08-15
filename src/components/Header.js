/**
* # Header.js
*
 * This component initially displays a image. But when clicked, things
 * get interesting. 
 *
 * On the initial display after being clicked, the
 * textinput will display the current ```state``` of the application.
 *
 * The button will be enabled and if clicked, whatever state is now
 * contained in the textinput will be processed and the application
 * will be restored to that state. 
 *
 * By pasting in a previous state, the application will reset to that
 * state  
 *
 * When the mark image is clicked, it is just toggled to display or hide.
*/
'use strict';

/**
 * ## Imports
 *
 * React
*/
import React, {PropTypes} from 'react';
import
{
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

/**
 * Project component that will respond to onPress
 */
const FormButton = require('./FormButton');
/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  mark: {
    height:100,
    width: 100
  }
  

});

var Header = React.createClass({
  /**
   * ## Header.class
   * set the initial state of having the button be disabled.
   */
  getInitialState() {
    return {
      text: '',
      isDisabled: true
    };
  },
  /**
   * ### propTypes
   * * isFetching: display the spinner if true
   * * showState: should the JSON state, currentState, be displayed
   * * currentState: the JSON state
   * * onGetState: the action to call to get the current state
   * * onSetState: the action to call to set the state
   */
  propTypes: {
    isFetching: PropTypes.bool,
    showState: PropTypes.bool,
    currentState: PropTypes.object,
    onGetState: PropTypes.func,
    onSetState: PropTypes.func
  },
  /**
   * ### _onPressMark
   * Call the onGetState action passing the state prop
   */
  _onPressMark() {
    this.props.onGetState(!this.props.showState);
  },
  /**
   * ### _onChangeText
   * when the textinput value changes, set the state for that component
   */
  _onChangeText(text) {
    this.setState({
      text,
      isDisabled: false
    });
  },
  /**
   * ### _updateStateButtonPress
   * When the button for the state is pressed, call ```onSetState```
   */
  _updateStateButtonPress() {
    this.props.onSetState(this.state.text);
  },

  /**
   * ### render
   *
   * if showState, stringify the currentState and display it to the
   * browser for copying. Then display to the user.
   *
   * When the value of the input changes, call ```_onChangeText```
   *
   * When the 'Update State' button is pressed, we're off to the 
   * races with Hot Loading...just call the
   * ```_updateStateButtonPress``` and away we go...
   *
   */
  render() {

    if (this.props.showState) {
      let displayText = JSON.stringify(this.props.currentState);
      
     console.log(displayText);

    }
    


    return (
      <View>
        <View style={styles.header}>

          <TouchableHighlight onPress={this._onPressMark}>

            <Image style={styles.mark}
                   source={require('../images/Snowflake.png')}
            />
          </TouchableHighlight>
          {this.props.isFetching ?
           <ActivityIndicator    animating={true}      size="large"   />
           :
           null
          }


        </View>
        {this.props.showState ?
         <View style={styles.container}>
           <Text>{I18n.t("Header.current_state")} ({I18n.t("Header.see_console")})</Text>
           <TextInput style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                      value={displayText}
                      editable={true}
                      multiline={true}
                      onChangeText={(text) => this._onChangeText(text)}
                      numberOfLines={20}>
           </TextInput>
           <View style={{
               marginTop: 10
             }}>
             <FormButton  isDisabled={this.state.isDisabled}
                          onPress={this._updateStateButtonPress}
                          buttonText={'Update State'}>
             </FormButton>
             
           </View>
         </View>
         :
         null}
      </View>
    );
  }
});

module.exports = Header;