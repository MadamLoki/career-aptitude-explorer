import { Router } from 'express';

const router = Router();
// Define your routes here
router.get('/', (_, res) => {
    
    res.send('Router Test Success');
});

export default router;
