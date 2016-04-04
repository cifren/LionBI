import ReportAdminConfig from "../adminConfig/ReportAdminConfig"

const INITIAL_REPORTCONFIG = {
    adminConfig: new ReportAdminConfig()
};

export function reportAdminConfig(state = INITIAL_REPORTCONFIG, action) {
    switch (action.type) {
      default:
        return state;
    }
};