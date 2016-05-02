import ReportAdminConfig from "../adminConfig/ReportAdminConfig";
import DataAdminConfig from "../adminConfig/DataAdminConfig";

const INITIAL_REPORT_CONFIG = {
    adminConfig: new ReportAdminConfig()
};

export function reportAdminConfig(state = INITIAL_REPORT_CONFIG, action) {
    switch (action.type) {
      default:
        return state;
    }
};

const INITIAL_DATA_CONFIG = {
    adminConfig: new DataAdminConfig()
};

export function dataAdminConfig(state = INITIAL_DATA_CONFIG, action) {
    switch (action.type) {
      default:
        return state;
    }
};