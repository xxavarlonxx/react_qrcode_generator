const express = require('express');
const cors = require('cors');
require('dotenv').config();
const QRCode = require('qrcode');
const { qrcodeSchema } = require('./validation-schema');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/qrcode/generate', async (req, res, next) => {
  const { url, size } = req.body;
  try {
    await qrcodeSchema.validateAsync(req.body);
    const qrcodeURL = await QRCode.toDataURL(url, { width: size || 100 });
    res.status(200).json({ qrcodeURL });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
