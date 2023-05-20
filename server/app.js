import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to database", connection.config.database);

const app = express();
app.use(cors());

app.get("/ttv", async (req, res) => {
  let status = 200;
  let retVal = {};

  const { name } = req.query;

  try {
    let query = "SELECT * FROM vital_sign";
    let values = [];

    if (name) {
      query +=
        " JOIN patients ON vital_sign.patient_id = patients.id WHERE patients.name LIKE ?";
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

  try {
    const query = "SELECT * FROM patients";
    const [rows] = await connection.query(query);
    retVal.data = rows;
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
