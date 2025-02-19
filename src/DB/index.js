import mongoose from "mongoose";
import { DB_NAME } from "../constance.js";
import dotEnt from "dotenv";
dotEnt.config();
import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database:'college',
  password: 'root',
  port:5432
})



const connectDB = async () => {
  try {
    const connectInstance = await pool.connect().then( () =>{
      console.log(`\n Postgres Database Connected !!! DB HOST `);

    }).catch((error)=>{
      console.log("Db connection error", error);
      process.exit(1);
    })
  } catch (error) {
    throw error
  }
};

function query (text, params, query_replica = false) {
  return query_replica
    ? replica_pool.query(text, params)
    : pool.query(text, params)
}

function getCommaSeparatedParamSubTitle(obj, counter) {
	let _counter = counter || 1;
	const params = [];
	Object.keys(obj).forEach(() => {
		params.push(`$${_counter}`);
		_counter += 1;
	}, this);
	return params.join(",");
}
function getCommaSeparatedColumns(obj) {
	return Object.keys(obj).join(",");
}

function getObjectValues(obj) {
	return Object.keys(obj).map((key) => obj[key]);
}

function insert ({ client, tableName, data, returnClause }) {
  let text = `INSERT INTO ${tableName}(${getCommaSeparatedColumns(data)})
                VALUES(${getCommaSeparatedParamSubTitle(data)})`
  if (
    returnClause &&
    returnClause.constructor === Array &&
    returnClause.length > 0
  ) {
    text = `${text} RETURNING ${returnClause.join(',')}`
  }
  const values = getObjectValues(data)
  /** If client is provided in argument then use client for atomicity */
  if (client) return client.query(text, values)

  /** If client is not provide then use client from connection pool */
  return query(text, values)
}


export  {connectDB, query, insert};
