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
//end fuche processus

let va = {
  responsabilite: "v.responsabilite",
  date:
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear(),
  description: "v.description",
  missions: [
    { text: "Représenter la confédération auprès des adhérents" },
    {
      text: `Faire la prospection d’éventuels potentiels de Junior-Entreprises, pour en créer une dans les différents établissements d’enseignement supérieur (Grandes écoles d’ingénierie, de commerce et management, instituts, universités et facultés).`
    },
    { text: "Accompagner les Junior-Créations pour déterminer leur structure." }
  ],
  criteres: [
    {
      crit:
        "Avoir une expérience d’au moins deux années au sein d’une Junior-Entreprise."
    },
    { crit: "Sens d’écoute. Capacité d’analyse et de synthèse." },
    { crit: "Esprit d’initiative, gestion d’équipe." }
  ]
};

//qa_fiche_poste_update(va);

let tmp = {
  date: "req.body.date",
  processus_tresorie: "req.body.processus_integration",
  objectif: "req.body.objectif",
  fournisseur: "req.body.fournisseur",
  client: "req.body.client",
  entrees: [
    {
      text: "Représenter la confédération auprès des adhérents"
    },
    {
      text:
        "Faire la prospection d’éventuels potentiels de Junior-Entreprises, pour en créer une dans les différents établissements d’enseignement supérieur (Grandes écoles d’ingénierie, de commerce et management, instituts, universités et facultés)."
    },
    {
      text: "Accompagner les Junior-Créations pour déterminer leur structure."
    }
  ],
  sorties: [
    {
      text: "Représenter la confédération auprès des adhérents"
    },
    {
      text:
        "Faire la prospection d’éventuels potentiels de Junior-Entreprises, pour en créer une dans les différents établissements d’enseignement supérieur (Grandes écoles d’ingénierie, de commerce et management, instituts, universités et facultés)."
    },
    {
      text: "Accompagner les Junior-Créations pour déterminer leur structure."
    }
  ],
  activites: [
    {
      text: "Représenter la confédération auprès des adhérents"
    },
    {
      text:
        "Faire la prospection d’éventuels potentiels de Junior-Entreprises, pour en créer une dans les différents établissements d’enseignement supérieur (Grandes écoles d’ingénierie, de commerce et management, instituts, universités et facultés)."
    },
    {
      text: "Accompagner les Junior-Créations pour déterminer leur structure."
    }
  ],
  financiers: [
    {
      text: "Perofo1"
    },
    {
      text: "Faire la)."
    },
    {
      text: "Accompagner les Junior-tructure."
    }
  ],
  materiels: [
    {
      text: "Perofo1"
    },
    {
      text: "Faire la)."
    },
    {
      text: "Accompagner les Junior-tructure."
    }
  ],
  strategiques: [
    {
      text: "Perofo1"
    },
    {
      text: "Faire la)."
    },
    {
      text: "Accompagner les Junior-tructure."
    }
  ],
  moyens: "les moyens",

  performances: [
    {
      text: "Perofo1"
    },
    {
      text: "Faire la)."
    },
    {
      text: "Accompagner les Junior-tructure."
    }
  ],
  documents: [
    {
      text: "Représenter la confédération auprès des adhérents"
    },
    {
      text:
        "Faire la prospection d’éventuels potentiels de Junior-Entreprises, pour en créer une dans les différents établissements d’enseignement supérieur (Grandes écoles d’ingénierie, de commerce et management, instituts, universités et facultés)."
    },
    {
      text: "Accompagner les Junior-Créations pour déterminer leur structure."
    }
  ]
};

//qa_fiche_processus_integration(tmp);
qa_fiche_processus_tresorier(tmp);

module.exports.qa_fiche_poste_update = qa_fiche_poste_update;
module.exports.qa_fiche_processus_integration = qa_fiche_processus_integration;
module.exports.qa_fiche_processus_tresorier = qa_fiche_processus_tresorier;
