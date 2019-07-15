var JSZip = require("jszip");
var Docxtemplater = require("docxtemplater");

var fs = require("fs");
var path = require("path");

function sg_accuse_update(variables) {
  var content = fs.readFileSync(
    path.resolve("./templates/sg", "accusé-JE.docx"),
    "binary"
  );

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    junior_name: variables.junior_name,
    school_name: variables.school_name,
    montant: variables.montant,
    president: variables.president,
    tresorier: variables.tresorier
  });

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    };
    console.log(JSON.stringify({ error: e }));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
  }

  var buf = doc.getZip().generate({ type: "nodebuffer" });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  let d = new Date().getTime();
  fs.writeFileSync(path.resolve("results/sg", "accuse_" + d + ".docx"), buf);
  let name = "accuse_" + d + ".docx";
  return name;
}

function sg_lettre_update(variables) {
  var content = fs.readFileSync(
    path.resolve("./templates/sg", "lettre.docx"),
    "binary"
  );

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    date: variables.date,
    junior_name: variables.junior_name,
    president: variables.president
  });

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    };
    console.log(JSON.stringify({ error: e }));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
  }

  var buf = doc.getZip().generate({ type: "nodebuffer" });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  let d = new Date().getTime();
  fs.writeFileSync(path.resolve("results/sg", "lettre_" + d + ".docx"), buf);
  let name = "lettre_" + d + ".docx";
  return name;
}

let vari = {
  junior_name: "ENSA JE",
  school_name: "ENSA Kenitra",
  montant: "12345",
  president: "Le president",
  tresorier: "Le tresorier"
};

let v = {
  date:
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear(),
  junior_name: "Ensa JE",
  president: "Le president"
};

//sg_accuse_update(vari);

//sg_lettre_update(v);
let files = [];

function readSG() {
  fs.readdir("./results/sg", function(err, list) {
    if (err) throw err;
    for (var i = 0; i < list.length; i++) {
      //console.log(list[i]); //print the file
      files.push(list[i]); //store the file name into the array files
    }
    return files;
  });
}

module.exports.sg_accuse_update = sg_accuse_update;
module.exports.sg_lettre_update = sg_lettre_update;
module.exports.readSG = readSG;

// let t = getSG();
// console.log(t);

// console.log(readSG());
