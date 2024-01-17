/* eslint-disable no-undef */
const mongoose = require ("mongoose");
require("dotenv").config()

const uri = process.env.MONGO_URI


async function conectDb (req, res, next) {
    
    try {
        await mongoose.connect (
            uri,
      { dbName: "GestionDeTareas",
      } 
    );
    console.log("Conexión exitosa");
    next();
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = conectDb;