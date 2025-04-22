export const validateSchema = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                errors: result.error.errors.map((error) => ({
                    field: error.path[0],
                    message: error.message,
                })),
            });
        }
        
        // Validación exitosa
        next();
    };
}