import React, {PropTypes} from "react";
import {Link} from "react-router";
import Loading from "../modules/Admin/components/Loading";
import {loadEmptyReportData} from "../actions/reportData";
import {browserHistory} from "react-router";

export default class ReportDataEdit extends React.Component {
  static propTypes = {
    reportData: PropTypes.shape({
        id: PropTypes.number,
        display_name: PropTypes.string
    }).isRequired
  };
  
  constructor(props){
    super(props);
    this.state = { reportData: this.props.reportData };
  }
  
  componentDidMount(){
    const id = this.props.params.id;
    //on edit
    if(id){
      // fetch
      this.props.actions.fetchReportData(id);
    }
  }
  
  componentWillUnmount(){
    //reset props reportData so it wont display on next call
    this.props.reportData.data = loadEmptyReportData(); 
    this.props.actions.resetReportData();
  }
  
  //change state when props change
  componentWillReceiveProps(nextProps){
    const reportData = nextProps.reportData;
    //if reportData has Id and param doesnt, load edit page instead of create
    if (!this.props.params.id && reportData.data.id){
      this.props.actions.push('/admin/data/edit/' + reportData.data.id);
    }
    if(!reportData.loading){
      this.setState({ reportData });
    }else{
      this.setState({ reportData: {...this.state.reportData, loading: true} });
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if(this.props.params.id){
      this.props.actions.putReportData(this.state.reportData.data);
    } else {
      this.props.actions.postReportData(this.state.reportData.data);
    }
  }

  handleChange(e) {
    const d = this.props.reportData.data;
    this.setState({ reportData: {data: {...d, displayName: e.target.value}}});
  }

  render() {
    const reportData = this.state.reportData.data;
    //anytime loading/saving
    const cssDisable = (this.state.reportData.loading)? 'disabled':null;
    //on first load, when id exist (edit mode)
    const loadingActivation = (this.state.reportData.loading)? true:false;
    
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header">Data Edit <Loading active={loadingActivation}></Loading></h1>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div class="form-group">
                  <label for="displayName">Display name</label>
                  <input 
                    type="text" 
                    class="form-control" id="displayName" placeholder="Type name"
                    value={reportData.displayName}
                    onChange={this.handleChange.bind(this)}
                    />
                </div>
                <button id="data-report" type="submit" class={["btn btn-primary", cssDisable].join(' ')}>Save</button>
                <Link to ={"/admin/data/list"} class="btn btn-danger">Cancel</Link>
              </form>
          </div>
        </div>
      </div>
    );
  }

}