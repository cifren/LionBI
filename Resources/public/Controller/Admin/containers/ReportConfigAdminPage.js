import AdminPage from '../modules/Admin/containers/AdminPage';

var AdminPageInstance = new AdminPage();

AdminPageInstance.mapStateToProps = (state) => {
    return AdminPageInstance.defaultMapStateToProps(state, 'reportAdminConfig');
};

export default AdminPageInstance.connect();