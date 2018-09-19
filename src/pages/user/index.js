import React ,{Component} from "react";
import {  Card, Button, Table, Form, Input,Select,Radio, Modal, DatePicker} from "antd";
import axios from '../../axios'
import Utils from '../../utils/utils'
import Moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class User extends Component{
	state={
		items:[],
		pagination:null,
		selectedRowKeys:null,
		selectedItem:null,
		title:'',
		isVisible:false,
		type:''
	}
	params = {
		page:1,
	}

	//请求表格数据
	requestList = () =>{
		axios.ajax({
				url:'/table/list1',
				data:{
						params:{
							page:this.params.page
						}
				}
		}).then((res)=>{
				let _this = this;
				this.setState({
					items:res.result.list.map((item,index)=>{
								item.key=index
								return item;
						}),
						pagination:Utils.pagination(res,(current)=>{
								_this.params.page = current;
								_this.requestList();
						})
				})
		})

	}
	//表格行内点击事件
	onRowClick=(record, index)=>{
		let selectKey = [index];
		this.setState({
			selectedRowKeys:selectKey,
			selectedItem:record
		})
	}

	// 操作员工
	handleOperator = (type)=>{
		let item = this.state.selectedItem;
		if(type ==='create'){
				this.setState({
						title:'创建员工',
						isVisible:true,
						type:type
				})
		}else if(type==="edit" || type==='detail'){
				if(!item){
						Modal.info({
								title: '信息',
								content: '请选择一个用户'
						})
						return;
				}
				this.setState({
						title:type==='edit'?'编辑用户':'查看详情',
						isVisible:true,
						userInfo:item,
						type:type
				})
		}else if(type==="delete"){
				if(!item){
						Modal.info({
								title: '信息',
								content: '请选择一个用户'
						})
						return;
				}
				let _this = this;
				Modal.confirm({
						text:'确定要删除此用户吗？',
						onOk:()=>{
								axios.ajax({
										url:'/user/delete',
										data:{
												params:{
														id:item.id
												}
										}
								}).then((res)=>{
										if(res.code ===0){
											_this.setState({
														isVisible:false
												})
											_this.requestList();
										}
								})
						}
				})
		}
	}

	//ok按钮
	handleSubmit = ()=>{
	
			let type = this.state.type;
			let data = this.userForm.props.form.getFieldsValue();
		
			axios.ajax({
					url:type === 'create'?'/user/add':'/user/edit',
					data:{
							params:{
								...data
							}
					}
			}).then((res)=>{
					if(res.code ===0){
							this.setState({
									isVisible:false
							})
							this.requestList();
					}
			})
	}


	componentDidMount(){
		this.requestList()
	}

	render(){
		const columns = [{
				title: 'id',
				dataIndex: 'id'
			}, {
				title: '用户名',
				dataIndex: 'username'
			}, {
				title: '性别',
				dataIndex: 'sex',
				render(sex){
						return sex ===1 ?'男':'女'
				}
			}, {
				title: '状态',
				dataIndex: 'state',
				render(state){
						let config = {
								'1':'咸鱼一条',
								'2':'风华浪子',
								'3':'北大才子一枚',
								'4':'百度FE',
								'5':'创业者'
						}
						return config[state];
				}
			},{
				title: '爱好',
				dataIndex: 'interest',
				render(interest){
						let config = {
								'1':'游泳',
								'2':'打篮球',
								'3':'踢足球',
								'4':'跑步',
								'5':'爬山',
								'6':'骑行',
								'7':'桌球',
								'8':'麦霸'
						}
						return config[interest];
				}
			},{
				title: '爱好',
				dataIndex: 'isMarried',
				render(isMarried){
						return isMarried?'已婚':'未婚'
				}
			},{
				title: '生日',
				dataIndex: 'birthday'
			},{
				title: '联系地址',
				dataIndex: 'address'
			},{
				title: '早起时间',
				dataIndex: 'time'
			}
		];
	
		const rowSelection ={
			type:'radio',
			selectedRowKeys:this.state.selectedRowKeys,
			onChange:(selectedRowKeys,selectedRows)=>{
				this.setState({
					selectedRowKeys:selectedRowKeys,
					selectedItem:selectedRows[0]
				})
			}
		}

		return (
			<div>
				<Card>
					<Form layout="inline">
							<FormItem>
									<Input placeholder="请输入用户名"/>
							</FormItem>
							<FormItem>
									<Input type="password" placeholder="请输入密码"/>
							</FormItem>
							<FormItem>
									<Button type="primary">登 录</Button>
							</FormItem>
					</Form>
				</Card>
				<Card style={{marginTop:10}}>
						<Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
						<Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
						<Button onClick={()=>this.handleOperator('detail')}>员工详情</Button>
						<Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
				</Card>
				<div className="content-wrap">
					<Table
						bordered
						columns={columns}
						dataSource={this.state.items}
						pagination={this.state.pagination}
						rowSelection={rowSelection}
						onRow={(record,index)=>{
							return {
								onClick:()=>{
									this.onRowClick(record,index)
								}
							}
						}}
					/>
				</div>
				<Modal
						title={this.state.title}
						visible={this.state.isVisible}
						onOk={this.handleSubmit}
						width={800}
						onCancel={()=>{
								this.userForm.props.form.resetFields();
								this.setState({
										isVisible:false,
										userInfo:''
								})
						}}
				>
						<UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst }/>
				</Modal>

				
					
			</div>
		);
	}

	
}

class UserForm extends Component{

	getState = (state)=>{
			return {
					'1':'咸鱼一条',
					'2':'风华浪子',
					'3':'北大才子一枚',
					'4':'百度FE',
					'5':'创业者'
			}[state]
	}

	render(){
			const { getFieldDecorator } = this.props.form;
			const formItemLayout = {
					labelCol: {span: 5},
					wrapperCol: {span: 16}
			};
			const userInfo = this.props.userInfo || {};
			const type = this.props.type;
			return (
					<Form layout="horizontal">
							<FormItem label="姓名" {...formItemLayout}>
									{
											userInfo && type==='detail'?userInfo.username:
											getFieldDecorator('user_name',{
													initialValue:userInfo.username
											})(
													<Input type="text" placeholder="请输入姓名"/>
											)
									}
							</FormItem>
							<FormItem label="性别" {...formItemLayout}>
									{
											userInfo && type==='detail'?userInfo.sex===1?'男':'女':
											getFieldDecorator('sex',{
													initialValue:userInfo.sex
											})(
											<RadioGroup>
													<Radio value={1}>男</Radio>
													<Radio value={2}>女</Radio>
											</RadioGroup>
									)}
							</FormItem>
							<FormItem label="状态" {...formItemLayout}>
									{
											userInfo && type==='detail'?this.getState(userInfo.state):
											getFieldDecorator('state',{
													initialValue:userInfo.state
											})(
											<Select>
													<Option value={1}>咸鱼一条</Option>
													<Option value={2}>风华浪子</Option>
													<Option value={3}>北大才子一枚</Option>
													<Option value={4}>百度FE</Option>
													<Option value={5}>创业者</Option>
											</Select>
									)}
							</FormItem>
							<FormItem label="生日" {...formItemLayout}>
									{
											userInfo && type==='detail'?userInfo.birthday:
											getFieldDecorator('birthday',{
													initialValue:Moment(userInfo.birthday)
											})(
											<DatePicker />
									)}
							</FormItem>
							<FormItem label="联系地址" {...formItemLayout}>
									{
											userInfo && type==='detail'?userInfo.address:
											getFieldDecorator('address',{
													initialValue:userInfo.address
											})(
											<Input.TextArea rows={3} placeholder="请输入联系地址"/>
									)}
							</FormItem>
					</Form>
			);
	}
}

UserForm = Form.create({})(UserForm);



// 必须由form表单导出 this指向才正确
export default User