import Facilitator from "../models/facilitator.js";

export const getNearestFacilitator = async (req, res) => {
    try {
        const requestedState = req.params.state;
        const facilitatorList = await Facilitator.find({ state: requestedState });

        const response = {
            success: true,
            data: facilitatorList
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllFacilitator = async (req, res) => {
    try {
        const requestedState = req.body.state;
        const facilitatorList = await Facilitator.find();

        const response = {
            success: true,
            data: facilitatorList
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const addFacilitator = async (req, res) => {
    try {
        const name = req.body.name;
        const address = req.body.address;
        const state = req.body.state;
        const capacity = req.body.capacity;

        const facilitator = new Facilitator({ name: name, address: address, state: state, capacity: capacity });
        await facilitator.save();

        const response = {
            success: true,
            message: 'data created'
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        console.log('hello');
        res.status(500).json({ success: false, message: error.message });
    }
}