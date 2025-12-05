import * as clientServices from '../services/clientServices.js';

export const getClients = async(req, res)=>{
    try {
        const clients = await clientServices.getClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({message: "internal server error"})
        
    }
}

export const addClients = async (req, res) => {
    try {
        const clientsData = req.body;

        if (!clientsData?.name || !clientsData?.email) {
            return res.status(400).json({ message: "name and email are required" });
        }

        const newClient = await clientServices.addClient(clientsData);
        res.status(201).json(newClient);
    } catch (error) {
        console.error("Error adding client:", error);
        res.status(500).json({ message: "internal server error" });

    }
}