/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drink: "G&T"
        };
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(key, event) {
        this.setState({"drink": key});
    }

    render() {
        return (
            <div>
                <RaisedButton
                    label={ "G&T" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "G&T")} />
                <RaisedButton
                    label={ "Rum and Coke" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "Rum and Coke")} />
                <RaisedButton
                    label={ "Whisky Ginger" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "Whisky Ginger")} />
                <RaisedButton
                    label={ "Sex on a Beach" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "Sex on a Beach")} />
                <h1>I am going to be making a {this.state.drink}</h1>
            </div>
        );
    }
}