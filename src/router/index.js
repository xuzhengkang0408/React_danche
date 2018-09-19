import React ,{Component} from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import APP from '../App'
import Login from '../pages/login'
import Admin from '../pages/admin'
import Home from '../pages/home'
import Buttons from '../pages/ui/button'
import Modals from '../pages/ui/modals'
import Loading from '../pages/ui/loadings'
import Notification from '../pages/ui/notification'
import Messages from '../pages/ui/messages'
import Tabs from '../pages/ui/tabs'
import Gallery from '../pages/ui/gallery'
import Carousel from '../pages/ui/carousel'
import FormLogin from '../pages/form/login'
import FormRegister from '../pages/form/register'
import BasicTable from '../pages/table/basic'
import HighTable from '../pages/table/high'
import Rich from '../pages/rich'
import City from '../pages/city'
import Order from '../pages/order'
import Common from '../pages/common'
import OrderDetail from '../pages/order/detail'
import User from '../pages/user'
import BikeMap from '../pages/map'
import Bar from '../pages/echarts/bar/index'
import Pie from '../pages/echarts/pie/index'
import Line from '../pages/echarts/line/index'
import NoMatch from '../pages/nomatch'
import Permission from '../pages/permission'
class IRouter extends Component {
	render() {
		return (
			<HashRouter>
				<APP>
				<Switch>
						<Route path="/login" component={Login}></Route>
						<Route path="/common" render={()=>
							<Common>
									<Route path="/common/order/detail/:orderId" component={OrderDetail} />
							</Common>
						}></Route>
				
						<Route path="/" render={()=>
							<Admin>
								<Switch>
									<Route path='/home' component={Home} />
									<Route path="/ui/buttons" component={Buttons} />
									<Route path="/ui/modals" component={Modals} />
									<Route path="/ui/loadings" component={Loading} />
									<Route path="/ui/notification" component={Notification} />
									<Route path="/ui/messages" component={Messages} />
									<Route path="/ui/tabs" component={Tabs} />
									<Route path="/ui/gallery" component={Gallery} />
									<Route path="/ui/carousel" component={Carousel} />
									<Route path="/form/login" component={FormLogin} />
									<Route path="/form/reg" component={FormRegister} />
									<Route path="/table/basic" component={BasicTable} />
									<Route path="/table/high" component={HighTable} />
									<Route path="/rich" component={Rich} />
									<Route path="/city" component={City} />
									<Route path="/order" component={Order} />
									<Route path="/user" component={User} />
									<Route path="/bikeMap" component={BikeMap} />
									<Route path="/charts/bar" component={Bar} />
									<Route path="/charts/pie" component={Pie} />
									<Route path="/charts/line" component={Line} />
									<Route path="/permission" component={Permission} />
									<Route  component={NoMatch} />
								</Switch>
							</Admin>
						}></Route>
					</Switch>
				</APP>
			</HashRouter>
		);
	}
}

export default IRouter;