import React from "react";
import Module from "./Module";

export default class Modules extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modules: this.props.modules
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.modules != nextProps.modules){
      this.setState({modules: nextProps.modules});
    }
  }
  
  render(){
    return (
      <div>
        <div class="row">
          <Module 
            actions={{push: this.props.actions.push}}
            reportId={this.props.reportId}
          />
          {
            this.state.modules.map((item, key) => {
              return <Module 
                actions={{push: this.props.actions.push}}
                key={key} 
                moduleKey={key}
                item={item}/>;
            })
          }
        </div>
      </div>
    );
  }
}