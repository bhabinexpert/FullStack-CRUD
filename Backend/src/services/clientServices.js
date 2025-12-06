import { query } from "../db.js";

export const getClients = async () => {
    const { rows } = await query('SELECT * FROM Client');
    return rows;
};

export const addClient = async (clientData={}) => {
    const {
        name,
        email,
        job = null,
        rate = null,
        isActive = false,
    } = clientData;
    const { rows } = await query(
        `INSERT INTO client (name, email, job, rate, isActive)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, job, rate, isActive]
    );
    return rows[0];
};


export const updateClient = async (clientData, clientId) => {
    const {
        name,
        email,
        job = null,
        rate = null,
        isActive = false,
    } = clientData;
    const { rows } = await query(
        `UPDATE client SET name = $1, email = $2, job = $3, rate = $4, isActive = $5
        WHERE id = $6 RETURNING *`,
        [name, email, job, rate, isActive,clientId ]
    );
    return rows[0];
};