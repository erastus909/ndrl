const Record = require("../Schemas/Record");

const getAllRecords = require("../scripts/getAllRecords");
const parseMultData = require("../scripts/parseMultData");

const all = [];
let newRec = {};
// get date with only 4 digits
const regexDate = new RegExp(/^(19|20)\d{2}$/g);
// get url that starts with [http]
const regexUrl = new RegExp(/^(http)+/g);

// --------------------------------------------
let token = "100";
let tokenTemplate = token ? `&resumptionToken=${token}` : "";
const regxNumbers = new RegExp(/(\d+)/g);
// --------------------------------------------

const getData = async (req, res, next) => {
  // console.log(regxNumbers.test(tokenTemplate));
  while (false) {
    try {
      // get record
      // console.log(result1);
      console.log(tokenTemplate);
      const records = await getAllRecords(
        `https://repository.unam.edu.na/oai/request/?verb=ListRecords&metadataPrefix=oai_dc${tokenTemplate}`
      );
      console.log(records);

      token = records["resumptionToken"]["value"];

      console.log(token);

      for (let record of records["record"]) {
        // check if certain value exist
        // if it exist run regular expression on it
        // then add to record

        // if(record.setSpec){
        // }

        for (const data in record.metadata["oai_dc:dc"]) {
          if (data) {
            // console.log(record.metadata["oai_dc:dc"][data]);
          }

          if (data === "dc:title") {
            newRec.title = parseMultData(record.metadata["oai_dc:dc"][data]);
          }
          if (data === "dc:creators") {
            newRec.creators = parseMultData(record.metadata["oai_dc:dc"][data]);
          }

          // implementaion catering for single value in array
          // and array value containing multiple subjects
          // each defined as an object
          if (data === "dc:subject") {
            newRec.subject = parseMultData(record.metadata["oai_dc:dc"][data]);
          }

          // for each desc in array
          // make a copy of it push to desc array
          // add desc array to doc records
          if (data === "dc:description") {
            newRec.description = parseMultData(
              record.metadata["oai_dc:dc"][data]
            );
          }

          // possible array value
          if (data === "dc:date") {
            // get array
            // check value
            // which returns true Push to Doc Record

            for (let date of record.metadata["oai_dc:dc"][data]) {
              if (regexDate.test(date.value)) {
                newRec.date = date.value;
              }
            }
          }

          if (data === "dc:type") {
            newRec[data] = record.metadata["oai_dc:dc"][data]["value"];
          }

          // Posible values,
          // single value in object
          // multiple objects with value in array
          if (data === "dc:identifier") {
            const identifiers = [];
            // check if we got an array
            const n =
              Object.prototype.toString.call(
                record.metadata["oai_dc:dc"][data]
              ) === "[object Array]";

            if (n) {
              for (let n of record.metadata["oai_dc:dc"][data]) {
                const ident = regexUrl.test(n.value);
                if (ident) identifiers.push(n.value);
              }
              newRec.identifier = identifiers;
            } else {
              newRec.identifier = record.metadata["oai_dc:dc"][data]["value"];
            }
          }
          // single value
          if (data === "dc:language") {
            newRec.language = record.metadata["oai_dc:dc"][data]["value"];
          }
          if (data === "dc:publisher") {
            newRec.publisher = record.metadata["oai_dc:dc"][data]["value"];
          }
          // single value
          if (data === "dc:source") {
            newRec.source = record.metadata["oai_dc:dc"][data]["value"];
          }
        }

        // all.push(newRec);
        await Record.create(newRec).then((error) => {
          error
            ? console.log(error)
            : console.log("Success Writing to database");
        });
      }

      // await Record.create(newRec).then((error) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Success Writing to database");
      //   }
      // });
    } catch (error) {
      console.log(error);
      break;
    }
    res.send("All request sent");
  }
};

module.exports = getData;
