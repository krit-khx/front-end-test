//core
import React  from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';

//component
import Home from './Pages/Home/Home.page'

//plugin
import { HelmetProvider } from "react-helmet-async";

class App extends React.Component {
  render() {
    return (
      <>
        <HelmetProvider>
          <Switch>
            <>
              <Route exact path="/" component={Home} /> 
            </>

          </Switch>
        </HelmetProvider>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
export default connect(mapStateToProps)(
  reduxForm({
    form: "App",
  })(App)
);