# React-Actor
  A simple data library of React. Use the action model.  
  This library is used to resolve the problem of the communication between react components, no matter if they are parent-son or not.  
## Install
  ```
  npm install react-actor --save
  ```
## Usage
  1. Define a component and register an action to listen
  ```javascript
  import Actor from 'react-actor'

  class A extends Actor {

    constructor(...args) {
      super(...args)
      this.state = {
        messages: [
          { tile: 'title1', time: 1234567989 },
          { tile: 'title2', time: 1234564999 }
        ]
      }

      // register a response function of an action
      this.onAction('addMessage', (msg)=>{
          this.setState({ messages: this.state.messages.push(msg) })
        })
    }

    render() {
      return (
        <ul>
          {
            this.state.messages.map((item, index)=>{
              return <li key={ index }><b>{item.title}</b> - {item.time}</li>  
            })
          }
        </ul>
      )
    }
  }
  ```
  2. Trigger the action with data
  ```javascript
  import Actor from 'react-actor'
  
  class B extends Actor {

    // trigger the action with data
    addMsg = ()=> {
      this.act('addMessage',
        { tile: 'title3', time: 1234367989 }
      )
    }

    render() {
      return (
        <button onClick={ this.addMsg }>add message</button>
      )
    }
  }
  ```
## Docs
  * onAction

    ```javascript
      function onAction(actionName, callback)
      @param actionName   { string }     - the action name to listen
      @param callback     { Function }   - the response function to receive the data when this action is triggered
    ```
  * act

    ```javascript
    function act(actionName, data)
    @param actionName   { string }     - the action name to trigger
    @param callback     { Function }   - the data to send with the action triggered
    ```
