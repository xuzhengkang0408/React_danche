import React ,{Component} from "react";
import { 
	Card, 
	Form, 
	Input, 
	Radio, 
	InputNumber, 
	Select, 
	Switch,
	DatePicker,
	TimePicker,
	Upload,
	Icon,
	Checkbox,
	Button,
	message
} from "antd";
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option
const TextArea = Input.TextArea
class FormRegister extends Component{
	state={}

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
		};
		const offsetLayout = {
			wrapperCol:{
				xs:24,
				sm:{
						span:12,
						offset:4
				}
			}
		}
		const rowObject = {
				minRows: 4, maxRows: 6
		}
		return (
			<div>
				<Card title="注册表单">
						<Form layout="horizontal">
								{/* 用户名 */}
								<FormItem label="用户名" {...formItemLayout}>
										{
											getFieldDecorator('userName',{
												initialValue: '',
												rules:[
													{
														required: true,
														message: '用户名不能为空'
													}
												]
											})(
												<Input placeholder="请输入用户名"/>
											)
										}
								</FormItem>
								{/* 密码 */}
								<FormItem label="密码"  {...formItemLayout}>
									{
										getFieldDecorator('userPwd',{
											initialValue: '',
											rules:[
												{
													required: true,
													message: '密码不能为空'
												}
											]
										})(
											<Input type="password" placeholder="请输入密码"/>
										)
									}
								</FormItem>

								{/* 性别 */}
								<FormItem label="性别"  {...formItemLayout}>
									{
										getFieldDecorator('sex',{
											initialValue: '1'
										})(
											<RadioGroup>
												<Radio value="1">男</Radio>
												<Radio value="2">女</Radio>
											</RadioGroup>
										)
									}
								</FormItem>

								{/* 年龄 */}
								<FormItem label="年龄"  {...formItemLayout}>
									{
										getFieldDecorator('age',{
											initialValue: 18
										})(
											<InputNumber  />
										)
									}
								</FormItem>

								{/* 当前状态 */}
								<FormItem label="当前状态"  {...formItemLayout}>
									{
										getFieldDecorator('state',{
											initialValue: '2'
										})(
											<Select>
													<Option value="1">咸鱼一条</Option>
													<Option value="2">风华浪子</Option>
													<Option value="3">北大才子一枚</Option>
													<Option value="4">百度FE</Option>
													<Option value="5">创业者</Option>
											</Select>
										)
									}
								</FormItem>

								{/* 爱好 */}
								<FormItem label="爱好"  {...formItemLayout}>
									{
										getFieldDecorator('interest',{
											initialValue: ['1','8']
										})(
										<Select mode="multiple">
											<Option value="1">游泳</Option>
											<Option value="2">打篮球</Option>
											<Option value="3">踢足球</Option>
											<Option value="4">跑步</Option>
											<Option value="5">爬山</Option>
											<Option value="6">骑行</Option>
											<Option value="7">桌球</Option>
											<Option value="8">麦霸</Option>
										</Select>
										)
									}
								</FormItem>

								{/* 是否已婚 */}
								<FormItem label="是否已婚"  {...formItemLayout}>
									{
										getFieldDecorator('isMarried',{
											valuePropName:'checked',
											initialValue:true
										})(
											<Switch/>
										)
									}
								</FormItem>

								{/* 生日 */}
								<FormItem label="生日" {...formItemLayout}>
									{
										getFieldDecorator('birthday',{
												initialValue:moment('2018-09-07')
										})(
											<DatePicker
												showTime
												format="YYYY-MM-DD HH:mm:ss"
											/>
										)
									}
								</FormItem>

								{/* 联系地址 */}
								<FormItem label="联系地址" {...formItemLayout}>
									{
										getFieldDecorator('address',{
											initialValue:'北京市海淀区奥林匹克公园'
										})(
											<TextArea
													autosize={rowObject}
											/>
										)
									}
								</FormItem>
								
								{/* 早起时间 */}
								<FormItem label="早起时间" {...formItemLayout}>
									{
										getFieldDecorator('time',{
											initialValue:moment('12:08:23', 'HH:mm:ss')
										})(
												<TimePicker  />
										)
									}
								</FormItem>
								
								{/* 头像 */}
								<FormItem label="头像" {...formItemLayout}>
										{
											getFieldDecorator('userImg')(
												<Upload
														listType="picture-card"
														showUploadList={false}
														action="//jsonplaceholder.typicode.com/posts/"
														onChange={this.handleChange}
												>
												{this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
												</Upload>
											)
										}
								</FormItem>

								{/* Checkbox */}
								 <FormItem {...offsetLayout}>
									{
										getFieldDecorator('userImg',{
											valuePropName:'checked',
											initialValue: true
										})(
											<Checkbox>我已阅读过<a href="#">React协议</a></Checkbox>
										)
									}
								</FormItem>
								
								{/* Checkbox */}
								<FormItem {...offsetLayout}>
										<Button type="primary" onClick={this.handleSubmit}>注册</Button>
								</FormItem>




						</Form>
				</Card>

			</div>
		);
	}

	handleSubmit=()=>{
		let userInfo = this.props.form.getFieldsValue();
		console.log(userInfo)

		message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)

	}

	handleChange=(info)=>{
		if(info.file.status==='uploading'){
			this.setState({ loading: true });
			return;
		}
		if(info.file.status === 'done'){
			this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
		}
	}

	getBase64 =(img, callback)=>{
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}


}
// 必须由form表单导出 this指向才正确
export default Form.create()(FormRegister)