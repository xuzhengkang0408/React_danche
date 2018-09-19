import React, { Component } from 'react';
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import {switchMenu} from '../../redux/action'
import menuConfig from '../../config/menuConfig'
import './index.less'
const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
	state={
		currentKey:''
	}

	componentWillMount(){
		const menuTreeNode = this.renderMenu(menuConfig)
		let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
		this.setState({
			menuTreeNode,
			currentKey
		})
	}
	//菜单点击
	handleClick=({ item, key })=>{
		if (key == this.state.currentKey) {
				return false;
		}


		//事件派发，自动调用reducer，通过reducer保存到store对象中
		const {dispatch} = this.props
		dispatch(switchMenu(item.props.title))

		this.setState({
			currentKey:key
		})
	}

  render() {
    return (
       <div>
					<div className="logo">
							<img src="/assets/logo-ant.svg" alt=""/>
							<h1>ofo单车后台</h1>
					</div>

					<Menu theme="dark" selectedKeys={[this.state.currentKey]} onClick={this.handleClick}>
						{this.state.menuTreeNode}
					</Menu>
       </div>
    );
	}

	//菜单渲染
	renderMenu = (data)=>{
		return data.map((item)=>{
			if(item.children){
				return (
					<SubMenu title={item.title} key={item.key}>
							{this.renderMenu(item.children)}
					</SubMenu>
				)
			}
				
			return <Menu.Item title={item.title} key={item.key}>
					<NavLink to={item.key}>{item.title}</NavLink>
				</Menu.Item>
			
		})

	}

	
}

export default connect()(NavLeft)
