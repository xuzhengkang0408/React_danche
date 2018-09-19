import React ,{ Component } from 'react'
import  Child from './Child'
import {Button} from 'antd'
export default class Life extends Component {
    constructor(props){
      super(props);
      this.state = {
        count:0,
      }
    }

    handleAdd=()=>{
      this.setState({
        count:this.state.count+10
      })
    }



    render() {
        return (
          <div>
            <p className="Life">我是生命周期介绍</p>
            <p>{this.state.count}</p>
            <Button type="primary" onClick={this.handleAdd.bind(this)}>点击一下</Button>
            <Child name={this.state.count}></Child>
          </div>
        )
    }
}