import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { calculateScore } from './utils/scoreCalculator';
import QRCode from 'qrcode';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Configuration du middleware CORS
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'TraceLoop API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TraceLoop API is running' });
});

// Route POST /api/products (sauvegarder un passeport avec calcul de score et QR code)
app.post('/api/products', async (req, res) => {
  try {
    const { nom, marque, materiaux, origine, origin_manufacturing } = req.body;
    
    const fabricOrigin = origine || req.body.origin_fabric || '';
    const manufacturingOrigin = origin_manufacturing || req.body.origin_manufacturing || '';

    // Calcul du score métier
    const { percentage, grade } = calculateScore(materiaux || '', fabricOrigin, manufacturingOrigin);
    
    // Sauvegarde en base
    const newProduct = await prisma.product.create({
      data: {
        nom,
        marque: marque || 'Marque Inconnue',
        materiaux,
        origine: fabricOrigin,
        scoreConformite: percentage,
        txHashBlockchain: 'Non applicable', 
      }
    });

    // Génération de l'URL finale (QR Code URL) avec l'adresse IP du téléphone
    const clientUrl = req.body.clientUrl || 'hhttps://hackaton-ramify-1.onrender.com';
    const qrCodeUrl = `${clientUrl}/product/${newProduct.id}`;
    
    // Génération de l'image QR Code en Data URI (Base64)
    const qrCodeDataUri = await QRCode.toDataURL(qrCodeUrl, {
      color: {
        dark: '#0f172a', // slate-900
        light: '#ffffff'
      },
      margin: 2,
      width: 250
    });
    
    // Mise à jour de l'URL en base
    const updatedProduct = await prisma.product.update({
      where: { id: newProduct.id },
      data: { qrCodeUrl }
    });

    res.status(201).json({ ...updatedProduct, grade, qrCodeDataUri });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});

// Route GET /api/products/:id (récupérer un passeport)
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    
    // Recalcul du grade
    let grade = 'C';
    if (product.scoreConformite >= 85) grade = 'A';
    else if (product.scoreConformite >= 70) grade = 'B';
    else if (product.scoreConformite >= 50) grade = 'C';
    else if (product.scoreConformite >= 30) grade = 'D';
    else grade = 'E';

    res.json({ ...product, grade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
