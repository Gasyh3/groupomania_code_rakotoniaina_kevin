# À Propos

**Application intranet de Groupomania**

La création du réseau social interne de Groupomania est le dernier projet de la formation Développeur Web de chez OpenClassrooms. Il a été construit avec :

- Backend : Node.js et Express.js
- Base de donnée : MySQL
- Frontend: React et Sass

### Cette application permet de :

- Créer un compte, de se connecter et de se déconnecter du réseau social
- Publier un post avec une image ou non et pouvoir le modifier
- Commenter et/ou aimer des posts

#### L'administrateur a :

- Le droit de modification et de suppression sur tous les posts du réseau social

## Pré-requis :

Pour lancer l'application, il faudra installer :

- NodeJS
- MySQL

## Lancement

1. Cloner le projet avec la commande `git clone https://github.com/Gasyh3/groupomania_code_rakotoniaina_kevin.git`

2. Lancer `npm install` dans les dossier backend et frontend

3. Dans le dossier backend, trouver le fichier `.env` et rentrer votre user dans `dbUser`et votre mot de passe dans `dbPassword`

4. Ouvrez MySQL Command-Line Client, connectez-vous et créez une base de donnée vide groupomania `CREATE DATABASE groupomania;` et l'utiliser `USE groupomania;`

5. Importer la base donnée groupomania fourni dans les livrables, avec la commande `mysql -u username -p groupomania < groupomania_demo.sql`

6. Enfin lancer `npm start` dans le dossier backend et ensuite dans le dossier frontend.
