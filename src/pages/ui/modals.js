import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd'
import './ui.less'

class Modals extends Component {
	state={
		showModal1:false,
		showModal2:false,
		showModal3:false
	}

	render(){
		return (
			<div>
				<Card title="基础模态框" className="card-wrap">
					<Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹框</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
				</Card>



				<Modal title="React"   
							visible={this.state.showModal1}  
							onOk={()=>{
									this.setState({
										showModal1:false
									})
								}
							} 
							onCancel={()=>{
								this.setState({
									showModal1:false
								})
							}}>
						<p>欢迎学习React,加油</p>
				</Modal>

				<Modal title="React"   
					visible={this.state.showModal2} 
					okText="好的"  
					cancelText="算了" 
					onOk={()=>{
						console.log("好的")
						this.setState({
							showModal2:false
						})
					}}
					onCancel={()=>{
						this.setState({
							showModal2:false
						})
					}}>
						<p>欢迎学习React,加油</p>
						<p>欢迎学习React,加油</p>
				</Modal>

				<Modal
					title="React"
					style={{top:20}}
					visible={this.state.showModal3}
					onCancel={() => {
							this.setState({
									showModal3: false
							})
					}}
				>
					<p>欢迎学习React,加油</p>
					<p>欢迎学习React,加油</p>
					<p>欢迎学习React,加油</p>
				</Modal>

				<Modal
          title="React"
          centered
          visible={this.state.showModal4}
          onOk={() => {
						this.setState({
							showModal4: false
						})
					}}
					onCancel={() => {
						this.setState({
							showModal4: false
						})
					}}
        	>
          <p>欢迎学习React,加油</p>
					<p>欢迎学习React,加油</p>
					<p>欢迎学习React,加油</p>
					<p>欢迎学习React,加油</p>
        </Modal>

				<Card title="信息确认框" className="card-wrap">
					<Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
				</Card>


			</div>
		)
	}
	handleOpen=(type)=>{
		this.setState({
			[type]:true
		})
	}

	handleConfirm = (type)=>{
		Modal[type]({
			title: `This is a ${type} message`,
			content: '嘻嘻嘻嘻嘻',
			onOk(){
				console.log('Ok')
			},
			onCancel(){
				console.log('Cancel')
			}
		});
	}

}

export default Modals