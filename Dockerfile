# Utilisez l'image officielle Node.js depuis Docker Hub
FROM node:latest

# Créez un répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de votre projet dans le répertoire de travail du conteneur
COPY . .

# Installez les dépendances de votre application
RUN npm install

# Exposez le port sur lequel votre application écoute (si nécessaire)
# Vous pouvez le changer en fonction du port réel utilisé par votre application
EXPOSE 4000

# Commande pour démarrer votre application
CMD ["npm", "start"]
