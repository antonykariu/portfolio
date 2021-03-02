import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow(row);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default appendSpreadsheet;
