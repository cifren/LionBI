import {
  adaptRequestJsonToObject,
  loadEmptyReportData
}
from "../../actions/reportData";

export default class ReportDataTransformer {
  static reportDatas() {
    return (data, prevData, action) => {
      if (data === undefined) {
        return [];
      }
      return data.map((item) => {
        return adaptRequestJsonToObject(item);
      });
    }
  }
  static reportData() {
    return (data) => {
      if (!data) {
        return loadEmptyReportData();
      }
      return adaptRequestJsonToObject(data);
    }
  }
}