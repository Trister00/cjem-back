const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
//Making the File requirements
var JSZip = require("jszip");
var Docxtemplater = require("docxtemplater");
var fs = require("fs");
var HtmlDocx = require("html-docx-js");
const qa = require("./qa");
const sg = require("./script");
const integ = require("./integ");

mongoose
  .connect(
    "mongodb+srv://JavaFX:swing-123@cluster0-reg43.mongodb.net/cjem?retryWrites=true&w=majority"
  )
  .catch(err => console.log(err));

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  //   let tmp = {
  //     responsabilite: req.body.responsabilite,
  //     date: req.body.date,
  //     description: req.body.description,
  //     missions: req.body.missions,
  //     criteres: req.body.criteres
  //   };
  //   let n = qa.qa_fiche_poste_update(va);
  //   return res.send(n);
});

//SG
app.post("/sg/accuse", (req, res) => {
  let tmp = {
    junior_name: req.body.junior_name,
    school_name: req.body.school_name,
    montant: req.body.montant
  };
  let n = sg.sg_accuse_update(tmp);
  res.download(`./results/sg/${n}`);
});

app.post("/sg/lettre", (req, res) => {
  let tmp = {
    date: req.body.date,
    junior_name: req.body.junior_name,
    president: req.body.president
  };
  let n = sg.sg_lettre_update(tmp);
  res.download(`./results/sg/${n}`);
});

app.get("/sg/list", (req, res) => {
  let files = [];
  fs.readdir("./results/sg", function(err, list) {
    if (err) throw err;
    for (var i = 0; i < list.length; i++) {
      //console.log(list[i]); //print the file

      let tmp = {
        id: i,
        name: list[i]
      };
      files.push(tmp); //store the file name into the array files
    }
    res.send(files);
  });
});

app.post("/sg/del", (req, res) => {
  fs.unlinkSync(`./results/sg/${req.body.name}`);
  res.status(200);
});
app.post("/sg/download", (req, res) => {
  res.download(`./results/sg/${req.body.name}`);
});

//Qualite et Audit
app.post("/qa/fichePoste", (req, res) => {
  let tmp = {
    responsabilite: req.body.responsabilite,
    date: req.body.date,
    description: req.body.description,
    missions: req.body.missions,
    criteres: req.body.criteres
  };
  let n = qa.qa_fiche_poste_update(tmp);
  res.download(`./results/qa/${n}`);
});
app.post("/qa/ficheIntegration", (req, res) => {
  let tmp = {
    date: req.body.date,
    processus_integration: req.body.processus_integration,
    objectif: req.body.objectif,
    fournisseur: req.body.fournisseur,
    client: req.body.client,
    entrees: req.body.entrees,
    sorties: req.body.sorties,
    etude: req.body.etude,
    accompagnement: req.body.accompagnement,
    ressources: req.body.ressources,
    performances: req.body.performances,
    documents: req.body.documents
  };
  let n = qa.qa_fiche_processus_integration(tmp);
  res.download(`./results/qa/${n}`);
});

app.post("/qa/ficheTresorier", (req, res) => {
  let tmp = {
    date: req.body.date,
    processus_tresorie: req.body.processus_tresorie,
    objectif: req.body.objectif,
    fournisseur: req.body.fournisseur,
    client: req.body.client,
    entrees: req.body.entrees,
    sorties: req.body.sorties,
    activites: req.body.activites,
    financiers: req.body.financiers,
    materiels: req.body.materiels,
    strategiques: req.body.strategiques,
    moyens: req.body.moyens,
    performances: req.body.performances,
    documents: req.body.documents
  };
  console.table(tmp);
  let n = qa.qa_fiche_processus_tresorier(tmp);
  res.download(`./results/qa/${n}`);
});

app.get("/qa/list", (req, res) => {
  let files = [];
  fs.readdir("./results/qa", function(err, list) {
    if (err) throw err;
    for (var i = 0; i < list.length; i++) {
      //console.log(list[i]); //print the file

      let tmp = {
        id: i,
        name: list[i]
      };
      files.push(tmp); //store the file name into the array files
    }
    res.send(files);
  });
});

app.post("/qa/del", (req, res) => {
  fs.unlinkSync(`./results/qa/${req.body.name}`);
  res.status(200);
});
app.post("/qa/download", (req, res) => {
  res.download(`./results/qa/${req.body.name}`);
});

//integration

app.post("/if/lettre_approbation", (req, res) => {
  let tmp = {
    date: req.body.date,
    destinataire: req.body.destinataire,
    nom_junior: req.body.nom_junior,
    articles: req.body.articles,
    nom_president: req.body.nom_president,
    nom_responsable: req.body.nom_responsable
  };
  let n = integ.lettre_approbation(tmp);
  res.download(`./results/integ/${n}`);
});

app.get("/if/list", (req, res) => {
  let files = [];
  fs.readdir("./results/integ", function(err, list) {
    if (err) throw err;
    for (var i = 0; i < list.length; i++) {
      let tmp = {
        id: i,
        name: list[i]
      };
      files.push(tmp); //store the file name into the array files
    }
    res.send(files);
  });
});

app.post("/if/del", (req, res) => {
  fs.unlinkSync(`./results/integ/${req.body.name}`);
  res.status(200);
});
app.post("/if/download", (req, res) => {
  res.download(`./results/integ/${req.body.name}`);
});

//authentication

app.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    active: req.body.active,
    role: req.body.role
  });
  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "email already used"
      });
    }

    return res.status(200).json({
      title: "register successfully"
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: "server error",
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "invalid mail"
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login failed",
        error: "invalid password"
      });
    }

    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      name: user.name,
      email: user.email,
      active: user.active,
      role: user.role,
      token: token
    });
  });
});

app.post("/editUser", (req, res) => {
  if (req.body.password != null) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) console.log(err);
      if (bcrypt.compareSync(req.body.currentPassword, user.password)) {
        User.findOneAndUpdate(
          { email: req.body.email },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10)
            }
          },
          (err, user) => {
            if (err) console.log(err);
            res.status(200).json({
              message: "updated"
            });
          }
        );
      } else {
        console.log("wrong pass");
        res.status(401).json({
          err: "error"
        });
      }
    });
  } else {
    if (bcrypt.compareSync(req.body.currentPassword, user.password)) {
      User.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            name: req.body.name,
            email: req.body.email
          }
        },
        (err, user) => {
          if (err) console.log(err);
          res.status(200).json({
            message: "updated"
          });
        }
      );
    } else {
      console.log("wrong pass");
      res.status(401).json({
        err: "error"
      });
    }
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
