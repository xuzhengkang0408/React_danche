import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
class  Home extends Component {
    render() {
        return (
						<div>
							<ul>
								<li>
									<Link to="/home">route2--Home</Link>
								</li>
								<li>
									<Link to="/about">route2--About</Link>
								</li>
								<li>
									<Link to="/topics">route2--Topics</Link>
								</li>
							</ul>
							<hr />
							{this.props.children}
						</div>
        )
    }
}


export default Home;