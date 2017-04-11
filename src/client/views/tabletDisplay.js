/**
 * Created by brad on 4/4/2017.
 */
/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText} from 'material-ui/Card'

//let gpio = require(path.join(__dirname, '../../dispense/dispense.js'));

export class TabletDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinkList: undefined,
            lastOrder: []
        };
        this._getOrders = this._getOrders.bind(this)
    }

    _handleClick(order, event) {
        $.ajax({
            type: "DELETE",
            url: "/order/" + order._id,
            success: function(data) {
                $.ajax({
                    type: "GET",
                    url: "/orders",
                    success: function(data) {
                        this.setState({"drinkList": data, "lastOrder": order});
                        //gpio.doGpio;
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

    componentDidMount() {
        this._getOrders();
        setTimeout(this.componentDidMount.bind(this), 5000);
    }

    render() {
        let lastPerson = this.state.lastOrder !== undefined && this.state.lastOrder.drinker !== undefined ?
            " by " + this.state.lastOrder.drinker : null;

        let lastOrder = this.state.lastOrder === undefined ? null :
            (<h1>Last order was a {this.state.lastOrder.drink}{lastPerson}</h1>);

        let view = this.state.drinkList === undefined ? (<h1>Loading Orders...</h1>) :
            (
                Object.keys(this.state.drinkList.orders).map(function (key) {
                    let drinker = this.state.drinkList.orders[key].drinker !== "" ? " by " +
                                                        this.state.drinkList.orders[key].drinker : null;
                    let textKey = key + "text";
                    return (<Card key={key} onTouchTap={this._handleClick.bind(this, this.state.drinkList.orders[key])}>
                                <CardText key={textKey}>{this.state.drinkList.orders[key].drink}{drinker}</CardText>
                            </Card>)}.bind(this)));
        return (
            <div>
                <Card>
                    {lastOrder}
                    {view}
                </Card>
            </div>
        );
    }
}