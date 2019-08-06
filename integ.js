var fs = require("fs");

var JSZip = require("jszip");
var Docxtemplater = require("docxtemplater");
var path = require("path");

function lettre_approbation(v) {
  var content = fs.readFileSync(
    path.resolve("./templates/integ", "lettre d'approbation exp.docx"),
    "binary"
  );

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    date: v.date,
    destinataire: v.destinataire,
    nom_junior: v.nom_junior,
    articles: v.articles,
    nom_president: v.nom_president,
    nom_responsable: v.nom_responsable
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
  fs.writeFileSync(path.resolve("results/integ", "lettre" + d + ".docx"), buf);
  let name = "lettre" + d + ".docx";
  return name;
}

module.exports.lettre_approbation = lettre_approbation;
