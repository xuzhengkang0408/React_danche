import React ,{Component} from "react";
import { Card, Table, Modal, Button, message} from "antd";
import axios from '../../axios'
import Utils from './../../utils/utils';
class BasicTable extends Component{
	state={
		dataSource2:[],

	}
	params = {
		page:1
}	
	componentDidMount(){
		const data = [
			{
				id:'0',
				userName:'Jack',
				sex:'1',
				state:'1',
				interest:'1',
				birthday:'2000-01-01',
				address:'北京市海淀区奥林匹克公园',
				time:'09:00'
			},
			{
				id: '1',
				userName: 'Tom',
				sex: '1',
				state: '1',
				interest: '1',
				birthday: '2000-01-01',
				address: '北京市海淀区奥林匹克公园',
				time: '09:00'
			},
			{
				id: '2',
				userName: 'Lily',
				sex: '2',
				state: '2',
				interest: '2',
				birthday: '2000-01-01',
				address: '北京市海淀区奥林匹克公园',
				time: '09:00'
			},
		]
		data.map((item,index)=>{
			item.key = index;
		})

		this.setState({
			dataSource:data
		})

		this.request();
	}


	render(){
		const columns =[
			{
				title:'id',
				dataIndex:'id',
				key:'id'
			},
			{
				title: '用户名',
				key: 'userName',
				dataIndex: 'userName'
			},
			{
				title: '性别',
				key: 'sex',
				dataIndex: 'sex',
				render(sex){
						return sex == 1 ?'男':'女'
				}
			},
			{
				title: '生日',
				key: 'birthday',
				dataIndex: 'birthday',
			},
			{
				title: '状态',
				key: 'state',
				dataIndex: 'state',
				render(state){
						let config  = {
								'1':'咸鱼一条',
								'2':'风华浪子',
								'3':'北大才子',
								'4':'百度FE',
								'5':'创业者'
						}
						return config[state];
				}
			},
			{
				title: '爱好',
				key: 'interest',
				dataIndex: 'interest',
				render(abc) {
						let config = {
								'1': '游泳',
								'2': '打篮球',
								'3': '踢足球',
								'4': '跑步',
								'5': '爬山',
								'6': '骑行',
								'7': '桌球',
								'8': '麦霸'
						}
						return config[abc];
				}
			},
			{
				title: '联系地址',
				key: 'address',
				dataIndex: 'address'
			},
			{
				title: '早起时间',
				key: 'time',
				dataIndex: 'time'
			}
		]
	
		const radioSelection ={
			type:'radio',
			selectedRowKeys:this.state.selectedradioKeys
		}

		const rowCheckSelection ={
			type:'checkbox',
			selectedRowKeys:this.state.selectedcheckboxKeys,
			onChange:(selectedRowKeys,selectedRows)=>{
				this.setState({
					selectedcheckboxKeys:selectedRowKeys,
					selectedRows
				})
			}
		}

		return (
			<div>
				<Card title="基础表格">
					<Table 
							bordered
							columns={columns}
							pagination={false}
							dataSource={this.state.dataSource}
					/>
				</Card>

				 <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
						<Table
								bordered
								columns={columns}
								dataSource={this.state.dataSource2}
								pagination={false}
						/>
				</Card>
				<Card title="Mock-单选" style={{ margin: '10px 0' }}>
						<Table
								bordered
								rowSelection={radioSelection}
								onRow={(record,index) => {
										return {
												onClick:()=>{
														this.onRowClick(record,index);
												}
										};
								}}
								columns={columns}
								dataSource={this.state.dataSource2}
								pagination={false}
						/>
				</Card>
				<Card title="Mock-多选" style={{ margin: '10px 0' }}>
						<div style={{marginBottom:10}}>
								<Button onClick={this.handleDelete}>删除</Button>
						</div>
						<Table
								bordered
								rowSelection={rowCheckSelection}
								columns={columns}
								dataSource={this.state.dataSource2}
								pagination={false}
						/>
				</Card>
				<Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
						<Table
								bordered
								columns={columns}
								dataSource={this.state.dataSource2}
								pagination={this.state.pagination}
						/>
				</Card>
			
			</div>
		);
	}

	//动态获取mock数据
	request = () =>{ 
		let _this = this;
		axios.ajax({
			url:'/table/list',
			data:{
				params:{
					page:this.params.page
				}
			}
		}).then((res)=>{
			res.result.list.map((item,index)=>{
				item.key = index
			})
			this.setState({
				dataSource2:res.result.list,
				selectedradioKeys:null,
				selectedcheckboxKeys:null,
				selectedItem:null,
				selectedRows:null,
				pagination:Utils.pagination(res,(current)=>{
					_this.params.page = current;
					this.request();
				})

			})
		})
			
		}

	onRowClick = (record,index)=>{
		let selectKey = [index];
		Modal.info({
			title:'信息',
			content:`用户名：${record.userName}---生日:${record.birthday}---用户爱好：${record.interest}`
		})
		this.setState({
			selectedradioKeys:selectKey,
			selectedItem: record
		})
	}

	//多选执行删除动作
	handleDelete= ()=>{
		let rows = this.state.selectedRows
		let ids = [];
		rows.map((item)=>{
			ids.push(item.id)
		})
		Modal.confirm({
			title:'删除提示',
			content: `您确定要删除这些数据吗？${ids.join(',')}`,
			onOk:()=>{
				message.success('删除成功');
				this.request();
			}
		})

	}

	
}

export default BasicTable