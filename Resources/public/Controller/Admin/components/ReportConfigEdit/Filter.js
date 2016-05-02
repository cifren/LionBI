import React from "react";
import $ from "jquery-lite";
import Form from "react-jsonschema-form";

export default class Filter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "filter": this.props.item
    };
  }
  
  formSchema(){
    return {
      "type": "object",
      "required": ["name", "type"],
      "properties": {
        "name": { "type": "string" },
        "type": { "type": "string" }
      }
    };
  }
  
  onChange(data){
    const filter = Object.assign({}, this.state.filter, data.formData);
    this.setState({"filter": filter});
    const $form = $(".filter-block"+this.props.filterKey+" form");
    if($form[0].checkValidity()){
      // send data to parent
      this.props.onChange(this.props.filterKey, filter, this.onCreationCb.bind(this));
    }
  }
  
  // get back the id
  onCreationCb(err, data){
    const filter = Object.assign({}, this.state.filter, {id: data.id});
    this.setState({"filter": filter});
  }
  
  onDelete(){
    // send data to parent
    this.props.onDelete(this.props.filterKey);
  }
  
  render(){
    return (
      <div class={"row well well-sm filter-block"+this.props.filterKey}>
        <div class="col-lg-12">
            <Form 
              formData={this.state.filter}
              schema={this.formSchema()}
              onChange={this.onChange.bind(this)}
              liveValidate={true}
            > </Form>
            <button class="btn btn-danger btn-sm" onClick={this.onDelete.bind(this)}>
              <i class="fa fa-times"> Delete</i>
            </button>
        </div>
      </div>
    );
  }
}
