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
import {Card} from 'material-ui/Card'

export class TabletDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinkList: undefined
        };
        //this._handleClick = this._handleClick.bind(this);
    }

    /*
    _handleClick(key, event) {
        this.setState({"drink": key});
    }
    */

    componentDidMount() {
        $.ajax({
            type: "GET",
            url: "/orders",
            success: function(data) {
                console.log(data);
                this.setState({"drinkList": data});
            }.bind(this),
            error: function(error) {
                console.log(error);
            }
        })
    }

    render() {
        let view = this.state.drinkList === undefined ? (<h1>Loading Orders...</h1>) :
            (
                Object.keys(this.state.drinkList).map(function (key) {
                    return <Card key={key}>this.state.drinkList[key].drink</Card>
                })
            );

        return (
            <div>
                <Card>
                    {view}
                </Card>
            </div>
        );
    }
}