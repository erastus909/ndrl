const { default: axios } = require("axios");
var convert = require("xml-js");

const getAllRecords = async (url) => {
  try {
    const oaiPmh = await new axios(url);

    let recordsJson = convert.xml2js(oaiPmh.data, {
      compact: true,
      spaces: 4,
      nativeType: true,
      nativeTypeAttributes: true,
      ignoreDoctype: true,
      textKey: "value"
    });
    return recordsJson["OAI-PMH"]["ListRecords"];
  } catch (error) {
    console.log(error);
  }
  return null;
};

module.exports = getAllRecords;
