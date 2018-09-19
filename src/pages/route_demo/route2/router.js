import React, {Component} from 'react'
import { HashRouter as Router,Route,Link,Switch } from 'react-router-dom'
import Main from './Main'
import About from './about'
import Topic from './topic'
import Home from './Home'
class IRouter extends Component {

    render() {
        return (
            <Router>
							<Home>
								<Route path="/home" render={()=>
										<Main>
												<Route path="/home/a" component={About}></Route>
										</Main>
								}></Route>
								<Route path="/about" component={About}></Route>
								<Route path="/topics" component={Topic}></Route>
							</Home>
            </Router>
        );
    }
}

export default IRouter