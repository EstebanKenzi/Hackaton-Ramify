# TraceLoop Architecture

TraceLoop est une application SaaS permettant la création de Passeports Numériques des Produits (ESPR) pour les marques de mode.

## Structure du Projet

Le projet est divisé en deux parties principales :

- `/backend` : Node.js (Express), Prisma, SQLite (Base de données locale)
- `/frontend` : React (Vite.js), Tailwind CSS

## Frontend (React + Vite)

- Interface utilisateur pour remplir le formulaire produit.
- Affichage de la page publique du passeport numérique via le scan du QR Code.
- Utilise **Tailwind CSS** pour le style.

## Backend (Node.js + Express)

- API RESTful.
- **Prisma ORM** pour la gestion de la base de données.
- Base de données **SQLite** locale pour le développement.
- Intégration avec **Thirdweb** (Blockchain Polygon) pour l'ancrage des preuves.

### Schéma de Base de données (Prisma)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id                Int      @id @default(autoincrement())
  nom               String
  marque            String
  materiaux         String
  origine           String
  scoreConformite   Float
  qrCodeUrl         String?
  txHashBlockchain  String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```
