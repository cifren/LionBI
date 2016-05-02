import React from "react";
import {formatPattern} from "react-router";
import {Link} from "react-router";

export default class GroupTr extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      columnCount: this.props.columnCount,
      cells: []
    };
  }
  
  componentWillReceiveProps(nextProps){
    console.log(this.props, nextProps)
    this.nextProps = nextProps;
    if(this.isChanged('columnCount')){
      this.setState({columnCount: nextProps.columnCount});
      this.addCell();
    }
  }
  
  isChanged(value){
    return this.props[value] != this.nextProps[value];
  }
  
  addCell(){
    const cell = {
      dataId: null,
      groupActions: [],
      actions: []
    };
    var cells = this.state.cells;
    cells.push(cell);
    this.setState({cells});
  }
  
  render(){
    console.log(this.state)
    return (
      <tr>
        <td>Group</td>
        {
          this.state.cells.map((item, key)=>{
            return (
              <td key={key}>
                <Link to={formatPattern(
                    `/admin/module/table/group/:reportid/:groupid`, 
                    { groupid: key, reportid: this.props.reportId })}>
                  <i class="fa fa-edit fa-border pull-right"></i>
                </Link>
                Data Id: {item.dataid}
                <br/>
                {
                  item.groupActions.map((item2, key2)=>{
                    return (<div key={key}>GA {key}: {item.name}</div>);
                  })
                }
                <br/>
                {
                  item.actions.map((item2, key2)=>{
                    return (<div key={key}>Action {key}: {item.name}</div>);
                  })
                }
              </td>
            );
          })
        }
        <td></td>
      </tr>
    );
  }
}
