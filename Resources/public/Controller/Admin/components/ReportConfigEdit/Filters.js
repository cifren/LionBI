import React from "react";
import Filter from "./Filter";

export default class Filters extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filters: this.props.filters,
      open: false
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.filters != nextProps.filters){
      this.setState({filters: nextProps.filters});
    }
  }
  
  addFilterOnClick(){
    var filters = this.state.filters;
    filters.push({});
    this.setState({
      filters
    });
  }
  
  onDeleteFilter(key){
    var filters = this.state.filters;
    // ajax request DELETE
    this.props.actions.deleteFilter(filters[key].id);
    // delete filter from state
    delete filters[key];
    this.setState({filters});
  }
  
  onChangeFilter(key, data, onCreationCb){
    // set a timeout by filter key
    if(this['timeoutFilter'+key]){
      clearTimeout(this['timeoutFilter'+key]);
    }
    // avoid multiple request
    this['timeoutFilter'+key] = setTimeout(()=>{
      // ajax request PATCH or POST, depending on id
      if(data.id){
        this.props.actions.updateFilter(data.id, data);
      } else {
        this.props.actions.createFilter(data, onCreationCb);
      }
    }, 3000);
  }
  
  render(){
    return(
      <div>
        <div class="row">
          <div class="col-lg-12">
            {
              this.state.filters.map((item, key) => {
                return <Filter 
                  onDelete={this.onDeleteFilter.bind(this)} 
                  onChange={this.onChangeFilter.bind(this)} 
                  key={key} 
                  filterKey={key}
                  item={item}/>;
              })
            }
          </div>
          <div class="col-lg-12">
            <a><i class="fa fa-plus" onClick={this.addFilterOnClick.bind(this)}> Add new filter</i></a>
          </div>
        </div>
      </div>
    );
  }
}
