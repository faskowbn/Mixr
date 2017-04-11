/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardText, CardHeader} from 'material-ui/Card'

require('../stylesheets/landing.css');

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drink: undefined,
            drinker: ""
        };
        this._handleClick = this._handleClick.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
    }

    _handleClick(key, event) {
        $.ajax({
            type: "POST",
            url: "/order",
            data: {
                "drink": key,
                "drinker": this.state.drinker
            },
            success: function(id) {
                this.setState({"drink": key});
            }.bind(this),
            error: function(error) {
                console.log(error);
            }
        })
    }

    _handleNameChange(event) {
        this.setState({"drinker": event.target.value});
    }

    render() {
        let you = this.state.drinker !== "" ? this.state.drinker : "You";

        let order = this.state.drink !== undefined ?
            (<h3 style={{display: "block", textAlign: "center"}}>{you} just ordered a {this.state.drink}</h3>) : null;

        return (
            <Card className="center-card" style={{display: "block", marginLeft: "100px", marginRight: "100px", marginTop: "150px"}}>
                <h1
                    style={{display: "block", textAlign: "center"}}
                >Welcome to Mixr! Can I take your order?</h1>
                <TextField
                    style={{display: "block", width: "25%", margin: "0 auto"}}
                    floatingLabelText="Your Name?"
                    onChange={this._handleNameChange}
                />
                <RaisedButton
                    style={{display: "block", width: "25%", margin: "0 auto"}}
                    label={ "G&T" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "G&T")} />
                <RaisedButton
                    style={{display: "block", width: "25%", margin: "0 auto"}}
                    label={ "Rum and Coke" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "Rum and Coke")} />
                <RaisedButton
                    style={{display: "block", width: "25%", margin: "0 auto"}}
                    label={ "Whisky Ginger" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "Whisky Ginger")} />
                <RaisedButton
                    style={{display: "block", width: "25%", margin: "0 auto"}}
                    label={ "Sex on a Beach" }
                    labelPosition="before"
                    secondary={true}
                    onTouchTap={this._handleClick.bind(this, "Sex on a Beach")} />
                {order}
            </Card>
        );
    }
}