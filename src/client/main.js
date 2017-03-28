/**
 * Created by brad on 3/28/2017.
 */
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

import Routes from './routes'

// Finally, render with some routes
render((Routes), document.getElementById('mainDiv'));