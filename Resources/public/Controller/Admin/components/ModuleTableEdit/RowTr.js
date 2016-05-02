import React from "react";

export default class RowTr extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      columnCount: this.props.columnCount
    };
  }
  
  componentWillReceiveProps(nextProps){
    this.nextProps = nextProps;
    if(this.isChanged('columnCount')){
      this.setState({columnCount: nextProps.columnCount});
    }
  }
  
  isChanged(value){
    return this.props[value] != this.nextProps[value];
  }
  
  render(){
    return (
      <tr>
        <td>Row</td>
        {
          [...Array(this.state.columnCount)].map((item, key)=>{
            return (
              <td key={key}>
              </td>
            );
          })
        }
        <td></td>
      </tr>
    );
  }
}