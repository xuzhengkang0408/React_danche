import React,{Component} from 'react'
import {Card, Button, Table, Input, Select, Form,Modal,Tree,Transfer} from 'antd'
import Utils from '../../utils/utils'
import axios from '../../axios'
import menuConfig from '../../config/menuConfig'
const FormItem  = Form.Item
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
class Permission extends Component{
  state ={
    items:null,
    pagination:null,
    selectedRowKeys:null,
    selectedItem:null,
    isRoleVisible:false,
    isPermVisible:false,
    isUserVisible:false,
    detailInfo:null,
    menuInfo:null,
    mockData:[],
    targetKeys:[]
    
  }



  componentDidMount(){
    this.requestList()
  }

  //请求表格数据
	requestList = () =>{
    let _this = this;
		axios.requestList(_this,'/role/list',this.params)

  }
  
  //点击单行
  onRowClick=(record, index)=>{
		let selectKey = [index];
		this.setState({
			selectedRowKeys:selectKey,
			selectedItem:record
		})
  }
  
  // 角色创建
  handleRole = ()=>{
    this.setState({
        isRoleVisible:true
    })
  } 

  // 角色提交
  handleRoleSubmit = ()=>{
      let data = this.roleForm.props.form.getFieldsValue();
      axios.ajax({
          url:'role/create',
          data:{
            params:{
              ...data
            }
          }
      }).then((res)=>{
          if(res){
            this.setState({
                isRoleVisible:false
            })
            this.roleForm.props.form.resetFields();
            this.requestList();
          }
      })
  }

  //设置权限
  handlePermission = ()=>{
    if (!this.state.selectedItem) {
        Modal.info({
            title: '信息',
            content: '请选择一个角色'
        })
        return;
    }

    this.setState({
        isPermVisible: true,
        detailInfo: this.state.selectedItem
    });
    let menuList = this.state.selectedItem.menus;
    this.setState({
        menuInfo:menuList
    })
  }

  //权限设置提交
  handlePermEditSubmit = () =>{
    let data = this.permeditForm.props.form.getFieldsValue();
    
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    console.log(data)
    axios.ajax({
      url:'/permission/edit',
      data:{
          params:{
              ...data
          }
      }
    }).then((res)=>{
      if(res){
          this.setState({
              isPermVisible:false
          })
          this.requestList();
      }
    })

  }

  //用户授权
  handleUserAuth = () =>{
    if (!this.state.selectedItem) {
        Modal.info({
            title: '信息',
            content: '未选中任何项目'
        })
        return;
    }
    this.getRoleUserList(this.state.selectedItem.id);
    this.setState({
        isUserVisible: true,
        isAuthClosed: false,
        detailInfo: this.state.selectedItem
    });
  }
  //获取用户角色
  getRoleUserList = (id)=>{
      axios.ajax({
          url:'/role/user_list',
          data:{
              params:{
                  id:id
              }
          }
      }).then((res)=>{
          if(res){
              this.getAuthUserList(res.result);
          }
      })
  }
  // 筛选目标用户
  getAuthUserList = (dataSource) => {
      const mockData = [];
      const targetKeys = [];
      if (dataSource && dataSource.length > 0) {
          for (let i = 0; i < dataSource.length; i++) {
              const data = {
                  key: dataSource[i].user_id,
                  title: dataSource[i].user_name,
                  status: dataSource[i].status,
              };
              if (data.status == 1) {
                  targetKeys.push(data.key);
              }
              mockData.push(data);
          }
      }
      this.setState({mockData, targetKeys});
  };
  //
  patchUserInfo = (targetKeys) =>{
    
    this.setState({
        targetKeys: targetKeys
    });
  }
  // 用户授权提交
  handleUserSubmit = ()=>{
      let data = {};
      data.user_ids = this.state.targetKeys || [];
      data.role_id = this.state.selectedItem.id;
      axios.ajax({
          url:'/role/user_role_edit',
          data:{
              params:{
                  ...data
              }
          }
      }).then((res)=>{
          if(res){
              this.setState({
                  isUserVisible:false
              })
              this.requestList();
          }
      })
  }

  render(){
    const columns = [
      {
          title: '角色ID',
          dataIndex: 'id'
      }, {
          title: '角色名称',
          dataIndex: 'role_name'
      },{
          title: '创建时间',
          dataIndex: 'create_time',
          render: Utils.formatTime
      }, {
          title: '使用状态',
          dataIndex: 'status',
          render(status){
              if (status == 1) {
                  return "启用"
              } else {
                  return "停用"
              }
          }
      }, {
          title: '授权时间',
          dataIndex: 'authorize_time',
          render: Utils.formatTime
      }, {
          title: '授权人',
          dataIndex: 'authorize_user_name',
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
          <Button type="primary" onClick={this.handleRole}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
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
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields();
            this.setState({
                isRoleVisible:false
            })
          }}
          >
          <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst}/>
        </Modal>
        <Modal
          title="权限设置"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={()=>{
              this.setState({
                  isPermVisible:false
              })
          }}>
          <PermEditForm 
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo||[]}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo: checkedKeys
              })
            }}
            wrappedComponentRef={(inst) => this.permeditForm = inst}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={()=>{
              this.setState({
                  isUserVisible:false
              })
          }}>
          <RoleAuthForm
              wrappedComponentRef={(inst) => this.roleAuthForm = inst }
              detailInfo={this.state.detailInfo}
              targetKeys={this.state.targetKeys}
              mockData={this.state.mockData}
              patchUserInfo={this.patchUserInfo}
          />
        </Modal>
      </div>
    )
  }
}

export default Permission

//创建角色
class RoleForm extends Component{
  render(){
    const {getFieldDecorator } = this.props.form
    const formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 16}
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
            {
                getFieldDecorator('role_name',{
                    initialValue:''
                })(
                    <Input type="text" placeholder="请输入角色名称"/>
                )
            }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
            {
              getFieldDecorator('state',{
                  initialValue:1
              })(
              <Select>
                  <Option value={1}>开启</Option>
                  <Option value={0}>关闭</Option>
              </Select>
            )}
        </FormItem>
      </Form>
    )
  }
}

RoleForm = Form.create({})(RoleForm);

//权限设置
class PermEditForm extends Component{
  //遍历数结构
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  // 设置选中的节点，通过父组件方法再传递回来
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 18}
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <div>
        <Form layout="horizontal">
          <FormItem label="角色名称：" {...formItemLayout}>
              <Input disabled maxLength="8" placeholder={detail_info.role_name}/>
          </FormItem>
          <FormItem label="状态：" {...formItemLayout}>
              {getFieldDecorator('status',{
                  initialValue: '1'
              })(
                  <Select style={{ width: 80}}
                    placeholder="启用"
                  >
                      <Option value="1">启用</Option>
                      <Option value="0">停用</Option>
                  </Select>
              )}
          </FormItem>

          <Tree 
            checkable
            defaultExpandAll
            onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
            checkedKeys={menuInfo ||[]}
            
          >
            <TreeNode title="平台权限" key="platform_all">
              {this.renderTreeNodes(menuConfig)} 
            </TreeNode>
          </Tree>
        </Form>
      </div>
    )
  }
}
PermEditForm = Form.create({})(PermEditForm);

// 用户授权
class RoleAuthForm extends Component {

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  };
 
  render() {
     
      const formItemLayout = {
          labelCol: {span: 5},
          wrapperCol: {span: 18}
      };
      const detail_info = this.props.detailInfo;
      return (
          <Form layout="horizontal">
              <FormItem label="角色名称：" {...formItemLayout}>
                  <Input disabled maxLength={8} placeholder={detail_info.role_name}/>
              </FormItem>
              <FormItem label="选择用户：" {...formItemLayout}>
                  <Transfer
                      showSearch
                      listStyle={{width: 200,height: 400}}
                      titles={['待选用户', '已选用户']}
                      locale={{searchPlaceholder:'请输入搜索内容'}}
                      dataSource={this.props.mockData}
                      targetKeys={this.props.targetKeys}
                      filterOption={this.filterOption}
                      onChange={this.handleChange}
                      render={item => item.title}
                      
                  />
              </FormItem>
          </Form>
      )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm);