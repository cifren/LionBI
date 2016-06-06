import { connect } from "react-redux";
import Navigation from "../components/Navigation";

function mapStateToProps(state) {
  return {state};
}

export default connect(mapStateToProps)(Navigation);