/**
 * Created by brad on 4/4/2017.
 */
/**
 * Created by brad on 3/28/2017.
 */
'use strict';

let path = require('path');

import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class TabletDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinkList: undefined,
            lastOrder: undefined,
            thisOrder: undefined,
            open: false
        };
        this._getOrders = this._getOrders.bind(this);
        this._handleDialogOpen = this._handleDialogOpen.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._handlePour = this._handlePour.bind(this);
    }

    _handlePour() {
        let order = this.state.thisOrder;
        let url = "/order/" + order._id;

        $.ajax({
            type: "DELETE",
            url: url,
            success: function(data) {
                $.ajax({
                    type: "GET",
                    url: "/orders",
                    success: function(data) {
                        this.setState({"drinkList": data, "lastOrder": order, "thisOrder": undefined, "open": false});
                    }.bind(this),
                    error: function(error) {
                        console.log(error);
                    }
                })
            }.bind(this),
            error: function(error) {
                console.log(error);
            }
        })
    }

    _getOrders() {
        $.ajax({
            type: "GET",
            url: "/orders",
            success: function(data) {
                this.setState({"drinkList": data});
            }.bind(this),
            error: function(error) {
                console.log(error);
            }
        })
    }

    _handleDialogOpen(order, event) {
        console.log(order);
        this.setState({thisOrder: order, open: true});
    }

    _handleDialogClose() {
        this.setState({thisOrder: undefined, open: false});
    }

    componentDidMount() {
        this._getOrders();
        setTimeout(this.componentDidMount.bind(this), 5000);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this._handleDialogClose}
            />,
            <FlatButton
                label="Pour"
                primary={true}
                onTouchTap={this._handlePour}
            />,
        ];

        let lastPerson = this.state.lastOrder !== undefined && this.state.lastOrder.drinker !== "" ?
            " by " + this.state.lastOrder.drinker : null;

        let lastOrder = this.state.lastOrder === undefined ? null :
            (<h1>Last order was a {this.state.lastOrder.drink}{lastPerson}</h1>);

        let view = this.state.drinkList === undefined ? (<h1>Loading Orders...</h1>) :
            (
                Object.keys(this.state.drinkList.orders).map(function (key) {
                    let drinker = this.state.drinkList.orders[key].drinker !== "" ? " by " +
                                                        this.state.drinkList.orders[key].drinker : null;
                    let textKey = key + "text";
                    return (<Card key={key} onTouchTap={this._handleDialogOpen.bind(this, this.state.drinkList.orders[key])}>
                                <CardText key={textKey}>{this.state.drinkList.orders[key].drink}{drinker}</CardText>
                            </Card>)}.bind(this)));
        return (
            <div>
                <Card>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this._handleDialogClose}
                    >
                        Is your drink ready to pour?
                    </Dialog>s
                    {lastOrder}
                    {view}
                </Card>
            </div>
        );
    }
}