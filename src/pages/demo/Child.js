import React ,{ Component }from 'react'
import './demo.less'
export default class Child extends Component {
    constructor(props){
      super(props);
    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentDidMount(){
        console.log('componentDidMount')
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
    }

    shouldComponentUpdate(){
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }


    render() {
        return (
          <div>
            <p className="color">这里是子组件</p>
            <p>{this.props.name}</p>
          </div>
        )
    }
}