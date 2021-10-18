const getVariables = () => {
  const urlParticipants =
    "https://soora-shollu.herokuapp.com/api/participants/";
  const urlCompanies = "https://soora-shollu.herokuapp.com/api/companies/";
  const urlTitles = "https://soora-shollu.herokuapp.com/api/titles/";
  const urlReports = "http://localhost:3000/reports/";
  const urlTransript = "http://localhost:3000/transcript/";
  const token = JSON.parse(sessionStorage?.token);
  const accessToken = token?.access;
  const refreshToken = token?.refresh;
  const headers = {
    headers: {
      Authorization: `JWT ${accessToken}`,
    },
  };

  return {
    urlParticipants,
    urlCompanies,
    urlTitles,
    urlReports,
    urlTransript,
    token,
    accessToken,
    refreshToken,
    headers,
  };
};

export default getVariables;
