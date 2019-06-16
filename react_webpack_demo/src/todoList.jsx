import React from "react";
import ReactDOm from "react-dom";
import mycss from "./style/index.scss";
import "bootstrap/dist/css/bootstrap.css";

class todoList extends React.Component{
  constructor(){
    super();
    this.state={
      inputValue: "",
      list: [],
    }
  }
  
  myChange = (e)=>{
    this.setState({
      inputValue: e.target.value,
    })
  }
  
  myClick = ()=>{
    this.setState({
       list: [...this.state.list,this.state.inputValue],
      inputValue: ""
    })
  }

  myDelete =(index)=>{
  	const list = [...this.state.list];
  	list.splice(index, 1);
  	this.setState({
  		list: list,
  	})
  }


  
  render(){
	      return (<div className={mycss.container}>
	          <div className={mycss.box}>
            <label htmlFor="inputArea">输入内容</label>
            <input id="inputArea" value={this.state.inputValue} onChange={(e)=>{this.myChange(e)}} className={mycss.inputbox}/>
	          <button onClick={()=>{this.myClick()}} className="btn btn-primary">点击提交</button>
            </div>
	          <ul>
	          {this.state.list.map((item,index)=>{
	              return (<li 
		              key={index} 
		              onClick={this.myDelete.bind(this,index)}
		              className={mycss.list}
		              title="删除该行"
                  dangerouslySetInnerHTML={{__html:item}}>

                  </li>)
	            })}
	          </ul>
            </div>)
  }
  
}
export default todoList;