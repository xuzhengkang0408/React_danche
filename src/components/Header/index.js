import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'
import { setInterval } from 'core-js';
class Header extends Component {

	componentWillMount(){
			this.setState({
					userName:'徐政康'
			})
			setInterval(()=>{
				let sysTime = Util.formateDate(new Date().getTime())
				this.setState({
					sysTime
				})
			},1000)

			this.getWeatherAPIData()
	}

  render() {
		const { menuType,menuName} = this.props
    return (
			<div className="header">
				<Row  className="header-top">
					{
						menuType?
						<Col span="6" className="logo">
								<img src="/assets/logo-ant.svg" alt=""/>
								<span>ofo单车后台</span>
						</Col>:''

					}
					<Col span={menuType?18:24}>
							<span>欢迎，{this.state.userName}</span>
							<a href="#">退出</a>
					</Col>
				</Row>
				{
					menuType ?'':
					<Row className="header-breadcrumb">
						<Col span="4" className="breadcrumb-title">{menuName || '首页'}</Col>
						<Col span="20" className="weather">
								<span className="date">{this.state.sysTime}</span>
								<span className="weather-img">
										<img src={this.state.dayPictureUrl}/>
								</span>
								<span className="weather-detail">{this.state.weather}</span>
						</Col>
					</Row>
				}
			
			</div>
    );
	}
	
	getWeatherAPIData(){
		let city = '上海';
		axios.jsonp({
			url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		}).then((res)=>{
			if(res.status ==='success'){
				let data = res.results[0].weather_data[0];
				this.setState({
					dayPictureUrl:data.dayPictureUrl,
					weather:data.weather
				})
			}
		})
	}
}
const mapStateToProps= (state)=>{
	return {
		menuName:state.menuName
	}
}

export default connect(mapStateToProps)(Header);
