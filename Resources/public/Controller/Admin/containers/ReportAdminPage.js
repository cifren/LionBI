import {AdminPage} from 'sound-admin';

var AdminPageInstance = new AdminPage();

AdminPageInstance.mapStateToProps = (state) => {
    return AdminPageInstance.defaultMapStateToProps(state, 'reportAdminConfig');
};

export default AdminPageInstance.connect();