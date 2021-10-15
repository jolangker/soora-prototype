const getVariables = () => {
  const urlParticipants =
    "https://soora-shollu.herokuapp.com/api/participants/";
  const urlCompanies = "https://soora-shollu.herokuapp.com/api/companies/";
  const urlTitles = "https://soora-shollu.herokuapp.com/api/titles/";
  const urlReports = "http://localhost:3000/reports/";
  const urlTransript = "http://localhost:3000/transcript/";
  const userSession = JSON.parse(sessionStorage?.userSession);
  const token = userSession?.token;
  const headers = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  return {
    urlParticipants,
    urlCompanies,
    urlTitles,
    urlReports,
    urlTransript,
    userSession,
    token,
    headers,
  };
};

export default getVariables;
