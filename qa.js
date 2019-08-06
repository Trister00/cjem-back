var JSZip = require("jszip");
var Docxtemplater = require("docxtemplater");

var fs = require("fs");
var path = require("path");

function qa_fiche_poste_update(v) {
  var content = fs.readFileSync(
    path.resolve("./templates/qa", "Fiche_poste.docx"),
    "binary"
  );

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    responsabilite: v.responsabilite,
    date: v.date,
    description: v.description,
    missions: v.missions,
    criteres: v.criteres
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
  fs.writeFileSync(
    path.resolve("results/qa", "fiche_poste" + d + ".docx"),
    buf
  );
  let name = "fiche_poste" + d + ".docx";
  return name;
}

//fiche processus
function qa_fiche_processus_integration(v) {
  var content = fs.readFileSync(
    path.resolve("./templates/qa", "Fiche_integration.docx"),
    "binary"
  );

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    date: v.date,
    processus_integration: v.processus_integration,
    objectif: v.objectif,
    fournisseur: v.fournisseur,
    client: v.client,
    entrees: v.entrees,
    sorties: v.sorties,
    etude: v.etude,
    accompagnement: v.accompagnement,
    ressources: v.ressources,
    performances: v.performances,
    documents: v.documents
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
  fs.writeFileSync(
    path.resolve("results/qa", "fiche_integration" + d + ".docx"),
    buf
  );
  let name = "fiche_integration" + d + ".docx";
  return name;
}

function qa_fiche_processus_tresorier(v) {
  var content = fs.readFileSync(
    path.resolve("./templates/qa", "Fiche_treso.docx"),
    "binary"
  );

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    date: v.date,
    processus_tresorie: v.processus_tresorie,
    objectif: v.objectif,
    fournisseur: v.fournisseur,
    client: v.client,
    entrees: v.entrees,
    sorties: v.sorties,
    activites: v.activites,
    financiers: v.financiers,
    materiels: v.materiels,
    strategiques: v.strategiques,
    moyens: v.moyens,
    performances: v.performances,
    documents: v.documents
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
  fs.writeFileSync(
    path.resolve("results/qa", "fiche_treso" + d + ".docx"),
    buf
  );
  let name = "fiche_treso" + d + ".docx";
  return name;
}
//end fiche processus

module.exports.qa_fiche_poste_update = qa_fiche_poste_update;
module.exports.qa_fiche_processus_integration = qa_fiche_processus_integration;
module.exports.qa_fiche_processus_tresorier = qa_fiche_processus_tresorier;
