const getVariables = () => {
  const urlParticipants = "http://localhost:3000/participants/";
  const urlCompanies = "http://localhost:3000/companies/";
  const urlTitles = "http://localhost:3000/titles/";
  const urlReports = "http://localhost:3000/reports/";
  const urlTransript = "http://localhost:3000/transcript/";

  return {
    urlParticipants,
    urlCompanies,
    urlTitles,
    urlReports,
    urlTransript,
  };
};

export default getVariables;
