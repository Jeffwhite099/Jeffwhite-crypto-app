import express from 'express';
import { getDb } from '../config/database.js';

const router = express.Router();

/**
 * @openapi
 * /crypto/tradable:
 *   get:
 *     tags:
 *       - Crypto
 *     summary: Get tradable cryptocurrencies
 *     description: Fetches a list of tradable cryptocurrencies (limited to 6) from the database.
 *     responses:
 *       200:
 *         description: List of tradable cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crypto'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/tradable', async (req, res) => {
  try {
    const db = getDb();
    const coins = await db.all(
      'SELECT * FROM crypto_data WHERE category = ? ORDER BY id LIMIT 6',
      ['tradable']
    );
    res.json(coins);
  } catch (error) {
    console.error('Error fetching tradable coins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @openapi
 * /crypto/top-gainers:
 *   get:
 *     tags:
 *       - Crypto
 *     summary: Get top gaining cryptocurrencies
 *     description: Fetches cryptocurrencies with the highest 24-hour price gain (limited to 6).
 *     responses:
 *       200:
 *         description: List of top gaining cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crypto'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/top-gainers', async (req, res) => {
  try {
    const db = getDb();
    const coins = await db.all(
      'SELECT * FROM crypto_data WHERE category = ? ORDER BY change_24h DESC LIMIT 6',
      ['new']
    );
    res.json(coins);
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @openapi
 * /crypto/new-coins:
 *   get:
 *     tags:
 *       - Crypto
 *     summary: Get newly listed cryptocurrencies
 *     description: Fetches newly listed cryptocurrencies (limited to 6).
 *     responses:
 *       200:
 *         description: List of new cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crypto'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/new-coins', async (req, res) => {
  try {
    const db = getDb();
    const coins = await db.all(
      'SELECT * FROM crypto_data WHERE category = ? ORDER BY id LIMIT 6',
      ['new']
    );
    res.json(coins);
  } catch (error) {
    console.error('Error fetching new coins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @openapi
 * /crypto/all:
 *   get:
 *     tags:
 *       - Crypto
 *     summary: Get all cryptocurrencies
 *     description: Fetches all available cryptocurrency data from the database.
 *     responses:
 *       200:
 *         description: Complete list of cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crypto'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/all', async (req, res) => {
  try {
    const db = getDb();
    const coins = await db.all('SELECT * FROM crypto_data ORDER BY id');
    res.json(coins);
  } catch (error) {
    console.error('Error fetching all crypto data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
