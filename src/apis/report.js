import restClient from "../clients/rest";
import mockReportData from "../mocks/report.json";

export const fetchReportAPI = () =>
  process.env.REACT_APP_MOCKUP === "FALSE"
    ? restClient.get("/progress_report_data")
    : { data: mockReportData };
