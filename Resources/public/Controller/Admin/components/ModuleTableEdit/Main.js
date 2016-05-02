import React from "react";
import Header from "./HeaderTr";
import Group from "./GroupTr";
import Row from "./RowTr";

export default class ModuleTableEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.moduleTable;
  }
  
  componentWillReceiveProps(nextProps){
    //console.log('nextProMain', nextProps)
    this.nextProps = nextProps;
    if(this.isChanged('moduleTable.columnCount')){
      this.setState({columnCount: nextProps.moduleTable.columnCount});
    }
  }
  
  isChanged(value){
    const a = value.split('.');
    var props = this.props;
    a.forEach((item)=>{
      props = props[item];
    })
    var nextProps = this.nextProps;
    a.forEach((item)=>{
      nextProps = nextProps[item];
    })
    
    return props != nextProps;
  }
  
  addColumn(){
    this.props.actions.addColumn();
  }
  
  render(){
    return (
      <div class="row">
        <div class="col-lg-12">
          <h1>Table module</h1>
          <div class="row">
            <div class="col-lg-12">
              <table class="table table-bordered">
                <tbody>
                  <Header 
                    addColumn={this.addColumn.bind(this)}
                    columnCount={this.state.columnCount}
                  />
                  <Group 
                    columnCount={this.state.columnCount}
                    reportId={this.props.params.reportId}
                  />
                  <Row 
                    columnCount={this.state.columnCount}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

