import React, { Component, Fragment } from 'react';
import { createPortal } from "react-dom";
import NullStateTest from "./NullStateTest";

const BoundaryHOC = ProtectedComponent => 
  class Boundary extends Component{

    state = {
      hasError: false
    }
  
    componentDidCatch = (error, info) => {
      this.setState({
        hasError: true
      })
    }
    render(){ 
      const {hasError} = this.state;
      
      if(hasError){
        return <ErrorFallback />
      }else{
        return <ProtectedComponent />
      }
      
    } 
  }


class ErrorMaker extends Component{
  state = {
    friends: ["jisu", "flynn", "daal", "kneeprayer"]
  }

  componentDidMount = () => {
    setTimeout(()=>{
      this.setState({
        friends:undefined
      })
    }, 2000)
  }

  render(){
    const {friends} = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

const PErrorMaker = BoundaryHOC(ErrorMaker)

class Portals extends Component{
  render(){
    return createPortal(
      <Message />, 
      document.getElementById("touchme")
    )
  }
}

const Message = () => "Just touch it"

class ReturnType extends Component{
  render(){
    return "hello"
  }
}

const ErrorFallback = () => " Sorry somthing went wrong";

class App extends Component {

  render() {
    return (
      <Fragment>
        <ReturnType />
        <Portals />
        <PErrorMaker />
        <NullStateTest />
      </Fragment>
    );
  }
}


export default App;
