import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to database", connection.config.database);

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.get("/ttv", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { name } = req.query;

  try {
    let query =
      "SELECT vital_sign.id, patients.id AS patient_id, patients.name, vital_sign.temperature, vital_sign.heart_rate, vital_sign.blood_pressure_systolic, vital_sign.blood_pressure_diastolic, vital_sign.respiratory_rate, vital_sign.timestamp FROM vital_sign JOIN patients ON vital_sign.patient_id = patients.id";

    let values = [];
    if (name) {
      query += " WHERE patients.name LIKE ?";
      values.push(`%${name}%`);
    }

    const [rows] = await connection.query(query, values);
    retVal.data = rows;
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

// get all ttv for a patient
app.get("/ttv/patient/:id", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { id } = req.params;

  try {
    let query = "SELECT * FROM vital_sign WHERE patient_id = ?";
    let values = [id];

    const [rows] = await connection.query(query, values);
    retVal.data = rows;
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

// update ttv with id
app.put("/ttv/:id", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { id } = req.params;

  const {
    name,
    temperature,
    heart_rate,
    blood_pressure_systolic,
    blood_pressure_diastolic,
    respiratory_rate,
  } = req.body;

  try {
    // Check if the patient exists in the database based on the name
    let query = "SELECT id FROM patients WHERE name = ?";
    let values = [name];
    const [patientRows] = await connection.query(query, values);

    let patientId;

    if (patientRows.length > 0) {
      // Patient already exists, use their ID
      patientId = patientRows[0].id;
    } else {
      // Patient doesn't exist, insert a new patient and get the generated ID
      query = "INSERT INTO patients (name) VALUES (?)";
      const [insertResult] = await connection.query(query, values);
      patientId = insertResult.insertId;
    }

    // Insert the vital sign assessment into the database
    let currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    query =
      "UPDATE vital_sign SET patient_id = ?, temperature = ?, heart_rate = ?, blood_pressure_systolic = ?, blood_pressure_diastolic = ?, respiratory_rate = ?, timestamp = ? WHERE id = ?";

    values = [
      patientId,
      temperature,
      heart_rate,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      respiratory_rate,
      currentDateTime,
      id,
    ];
    let result = await connection.query(query, values);
    console.log(result);
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

// delete ttv with id

app.delete("/ttv/:id", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { id } = req.params;

  try {
    let query = "DELETE FROM vital_sign WHERE id = ?";
    let values = [id];
    await connection.query(query, values);

    let result = await connection.query(query, values);
    console.log(result);
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

app.post("/ttv", async (req, res) => {
  let status = 200;
  let retVal = {};

  console.log("server req body", req.body);

  const {
    name,
    temperature,
    heart_rate,
    blood_pressure_systolic,
    blood_pressure_diastolic,
    respiratory_rate,
  } = req.body;

  try {
    // Check if the patient exists in the database based on the name
    let query = "SELECT id FROM patients WHERE name = ?";
    let values = [name];
    const [patientRows] = await connection.query(query, values);

    let patientId;

    if (patientRows.length > 0) {
      // Patient already exists, use their ID
      patientId = patientRows[0].id;
    } else {
      // Patient doesn't exist, insert a new patient and get the generated ID
      query = "INSERT INTO patients (name) VALUES (?)";
      const [insertResult] = await connection.query(query, values);
      patientId = insertResult.insertId;
    }

    // Insert the vital sign assessment into the database
    let currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    query =
      "INSERT INTO vital_sign (patient_id, temperature, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, respiratory_rate, timestamp) VALUES (?, ?, ?, ?, ?, ?,?)";
    values = [
      patientId,
      temperature,
      heart_rate,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      respiratory_rate,
      currentDateTime,
    ];
    await connection.query(query, values);

    retVal.message = "Vital sign assessment submitted successfully.";
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

app.get("/patients/:id", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { id } = req.params;
  if (isNaN(Number(id))) {
    status = 400;
    retVal.message =
      "Invalid request. Please make sure the id you are searching for is a number";
    return res.status(status).json(retVal);
  }

  try {
    const query = "SELECT * FROM patients WHERE patients.id=?";
    const [rows] = await connection.query(query, [id]);

    retVal.data = rows[0];
    if (!retVal.data) {
      status = 404;
      retVal.message = `Couldn't find a patients with id ${id}`;
    }
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

app.get("/patients", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { name } = req.query;
  console.log("params", name);

  try {
    let query = "SELECT * FROM patients";
    let values = [];
    if (name) {
      query += " WHERE patients.name LIKE ?";
      values.push(`%${name}%`);
    }

    console.log("query", query);
    const [rows] = await connection.query(query, values);
    retVal.data = rows;

    console.log("patient", retVal.data);
  } catch (error) {
    console.error(error);
    retVal.error = error;
    status = 500;
  } finally {
    res.status(status).json(retVal);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("App is running ");
});
