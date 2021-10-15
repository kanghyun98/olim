import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ id: 1, content: 'test' });
});

router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

export default router;
