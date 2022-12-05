// Module used in order to wrap all controllers into a try/catch block
export default (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        // next(error);
    }
};
