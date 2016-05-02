import React from "react";

export default class HeaderTr extends React.Component{
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
        <td>Header</td>
        {
          [...Array(this.state.columnCount)].map((item, key)=>{
            return (
              <td key={key}>
                <form class="form-inline">
                  <div class="form-group">
                    <input type="text" class="form-control" id="name" placeholder="Column name"/>
                  </div>
                </form>
              </td>
            );
          })
        }
        <td> 
          <div class="col-lg-12 well well-sm selectableBox selectableBox-md" onClick={this.props.addColumn}><i class="fa fa-plus fa-2x text-center"></i></div>
        </td>
      </tr>
    );
  }
}