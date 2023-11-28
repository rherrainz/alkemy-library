import express, { Router } from 'express';

const router = express.Router();


router.get('/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        message: `${id}`
    })
});

export default router;