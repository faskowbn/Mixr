/**
 * Created by brad on 3/28/2017.
 */
import React from 'react'
import { render } from 'react-dom'

// First we import some modules...
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import { Landing } from './views/landing'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class App extends React.Component {
    render() {
        return (<MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    title="Mixr"
                    iconElementLeft={null} />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        </MuiThemeProvider>);
    }
}

let Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={Landing} name="landing"/>
        </Route>
    </Router>
);

export default Routes;