// The missing export

export const AppContext = React.createContext();

class CentralStore extends React.Component {
  state={
    events: false,
  }

//   componentDidMount() {
//     firebase
//       .collection("events")
//       .get()      
//       .then( querySnapshot => {
//         const events = [];
//         querySnapshot.docs.forEach(doc => {
//           events.push(doc.data());
//         });
//         this.setState({
//           events: events
//         });
//       });
//   }

  render(){
    return(
      <AppContext.Provider value={{
        state: this.state
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}