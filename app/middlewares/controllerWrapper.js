// Middleware to wrap all controllers into a try/catch block
export default (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        next(err);
    }
};
