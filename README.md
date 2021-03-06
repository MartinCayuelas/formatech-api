# Formatech-API

## Informations
Projet réalisé par :
 - Martin **CAYUELAS** : [see on Github](https://github.com/MartinCayuelas)
 - Thomas **FALCONE** : [see on Github](https://github.com/ThomasF34)
 - Lucas **GONCALVES** : [see on Github](https://github.com/igwall)
 - Raphaël **LUCIANO** : [see on Github](https://github.com/raphell)
 - Fatima **MACHHOURI**  : [see on Github](https://github.com/FatimaMachhouri)
 - Inès **MISSOUM-BENZIANE** : [see on Github](https://github.com/ines-missoum)

Ce projet représente la partie serveur de l'application Formatech qui est une application à but informatif pour les élèves en *IG* et *DO* à Polytech Montpellier.

### Technos
![image](https://user-images.githubusercontent.com/23449337/69442747-65377e80-0d4d-11ea-973a-550075a64400.png)
![image](https://user-images.githubusercontent.com/23449337/69442822-87c99780-0d4d-11ea-9617-765628e1f9c3.png)


## Installation 
### Mise en place
```
    git clone https://github.com/MartinCayuelas/formatech-api
    cd formatech-api
    npm run build
    npm start

```
-------------
    
### Déploiement

  ```
apps:create api-formatech
apps:create test-api-formatech

docker-options:add api-formatech build --build-arg "DD_API_KEY=<datadog api key>"
docker-options:add test-api-formatech build --build-arg "DD_API_KEY=<datadog api key>"

config:set api-formatech DD_API_KEY=<datadog api key>
config:set test-api-formatech DD_API_KEY=<datadog api key>

proxy:ports-add api-formatech http:80:3000
proxy:ports-add test-api-formatech http:80:3000
```

Après cela vous aurez besoin de mettre en place les variables d'environnements ``ENV`` comme dans le modèle suivant :
``SERVERPORT=***
DATABASE_URL=***
SECRET_KEY_JWT=***
SAGESSE_DATABASE_NAME=***
SAGESSE_USER=***
SAGESSE_PASSWORD=***
SAGESSE_HOST=***
SAGESSE_PORT=***
``
## Routes

Chaque route peut renvoyer un code 500 en cas d'erreur du côté du serveur

### Accueil

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/accueil`` -  Renvoie l'ensemble des éléments de la page d'accueil.
  - 200 - Il y a des éléments à renvoyer
  - 204 - Pas d'éléments à afficher

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/accueil`` - Créer un nouvel élément dans accueil.
   - 201 - Elément créé
   - 400 - Un ou des élèments ne vont pas dans la requete. Dans la réponse se trouve un champ errors contenant un tableau de string décrivant les erreurs
   - 401 - L'utilisateur doit être connecté pour réaliser l'action
   - 403 - L'utilisateur connecté ne peut accéder à la ressource

![#f0731c ](https://placehold.it/15/f0731c/000000?text=+) **PUT** - ``/accueil/modifier/:id`` - Modifie l'element avec l'id donné en paramètre et avec les nouveaux contenus dans le corps de la requête.
- 200 - Le contenu a été modifié
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être modifé car aucun élément de ne correspondait dans la BD

![#f01c1c ](https://placehold.it/15/f01c1c/000000?text=+) **DELETE** -``/accueil /supprimer/:id`` - Supprime un élément avec l'id passé en paramètre.
- 200 - Le contenu a été supprimé
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être supprimé car aucun élément de ne correspondait dans la BD

------------


### IG
 ![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/ig`` -  Renvoie l'ensemble des éléments de la page d'ig.
  - 200 - Il y a des éléments à renvoyer
  - 204 - Pas d'éléments à afficher

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/ig`` - Créer un nouvel élément dans ig.
   - 201 - Elément créé
   - 400 - Un ou des élèments ne vont pas dans la requete. Dans la réponse se trouve un champ errors contenant un tableau de string décrivant les erreurs
   - 401 - L'utilisateur doit être connecté pour réaliser l'action
   - 403 - L'utilisateur connecté ne peut accéder à la ressource

![#f0731c ](https://placehold.it/15/f0731c/000000?text=+) **PUT** - ``/ig/modifier/:id`` - Modifie l'element avec l'id donné en paramètre et avec les nouveaux contenus dans le corps de la requête.
- 200 - Le contenu a été modifié
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être modifé car aucun élément de ne correspondait dans la BD

![#f01c1c ](https://placehold.it/15/f01c1c/000000?text=+) **DELETE** -``/ig /supprimer/:id`` - Supprime un élément avec l'id passé en paramètre.
- 200 - Le contenu a été supprimé
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être supprimé car aucun élément de ne correspondait dans la BD

------------


### DO
![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/do`` -  Renvoie l'ensemble des éléments de la page do.
  - 200 - Il y a des éléments à renvoyer
  - 204 - Pas d'éléments à afficher

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/do`` - Créer un nouvel élément dans do.
   - 201 - Elément créé
   - 400 - Un ou des élèments ne vont pas dans la requete. Dans la réponse se trouve un champ errors contenant un tableau de string décrivant les erreurs
   - 401 - L'utilisateur doit être connecté pour réaliser l'action
   - 403 - L'utilisateur connecté ne peut accéder à la ressource

![#f0731c ](https://placehold.it/15/f0731c/000000?text=+) **PUT** - ``/do/modifier/:id`` - Modifie l'element avec l'id donné en paramètre et avec les nouveaux contenus dans le corps de la requête.
- 200 - Le contenu a été modifié
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être modifé car aucun élément de ne correspondait dans la BD

![#f01c1c ](https://placehold.it/15/f01c1c/000000?text=+) **DELETE** -``/do/supprimer/:id`` - Supprime un élément avec l'id passé en paramètre.
- 200 - Le contenu a été supprimé
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être supprimé car aucun élément de ne correspondait dans la BD

------------


### Contact
![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/contact`` -  Renvoie l'ensemble des éléments de la page des contacts.
  - 200 - Il y a des éléments à renvoyer
  - 204 - Pas d'éléments à afficher

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/contact`` - Créer un nouvel élément dans contact.
   - 201 - Elément créé
   - 400 - Un ou des élèments ne vont pas dans la requête. Dans la réponse se trouve un champ errors contenant un tableau de string décrivant les erreurs
   - 401 - L'utilisateur doit être connecté pour réaliser l'action
   - 403 - L'utilisateur connecté ne peut accéder à la ressource

![#f0731c ](https://placehold.it/15/f0731c/000000?text=+) **PUT** - ``/contact/modifier/:id`` - Modifie l'element avec l'id donné en paramètre et avec les nouveaux contenus dans le corps de la requête.
- 200 - Le contenu a été modifié
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être modifé car aucun élément de ne correspondait dans la BD

![#f01c1c ](https://placehold.it/15/f01c1c/000000?text=+) **DELETE** -``/contact/supprimer/:id`` - Supprime un élément avec l'id passé en paramètre.
- 200 - Le contenu a été supprimé
- 401 - L'utilisateur doit être connecté pour réaliser l'action
- 403 - L'utilisateur connecté ne peut accéder à la ressource
- 404 - Le contenu n'a pas pu être supprimé car aucun élément de ne correspondait dans la BD

------------


### Utilisateur
![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/utilisateur/token`` -  Renvoie true si le token est valide false sinon.
- 200 - Requete OK

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/utilisateur/connexion`` - Connecte un utilisateur et renvoie un token.
   - 201 - Elément créé
   - 400 - Un ou des élèments ne vont pas dans la requête. Dans la réponse se trouve un champ errors contenant un tableau de string décrivant les erreurs
   - 404 - Utilisateur non trouvé


![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/utilisateur/inscription`` - Créer un nouvel utilisateur dans la table utilisateur.
   - 201 - Elément créé
   - 400 - Un ou des élèments ne vont pas dans la requête. Dans la réponse se trouve un champ errors contenant un tableau de string décrivant les erreurs
   - 401 - L'utilisateur doit être connecté pour réaliser l'action
   - 403 - L'utilisateur connecté ne peut accéder à la ressource

------------


### Sagesse
![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/sagesse/:nomFormation`` -  Renvoie les informations détaillées de la formation ainsi que des informations générales sur ses différentes années.
  - 200 - Il y a des éléments à renvoyer
  - 404 - Formation non trouvée

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/sagesse/step/:id`` -  Renvoie les informations détaillées de l'année ainsi que des informations générales sur ses différents semestres.
  - 200 - Il y a des éléments à renvoyer
  - 404 - Année non trouvée

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/sagesse/step/:id/modules`` -  Renvoie les informations détaillées de la matière, les informations générales de ses semestres et des modules de ses semestres
  - 200 - Il y a des éléments à renvoyer
  - 404 - Année non trouvée

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/sagesse/period/:id`` -  Renvoie les informations détaillées du semestre ainsi que des informations générales sur ses différents modules.
  - 200 - Il y a des éléments à renvoyer
  - 404 - Semestre non trouvée

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/sagesse/module/:id`` -  Renvoie les informations détaillées du module ainsi que des informations générales sur ses différentes matières.
  - 200 - Il y a des éléments à renvoyer
  - 404 - Module non trouvée

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/sagesse/subject/:id`` -  Renvoie les informations détaillées de la matière.
  - 200 - Il y a des éléments à renvoyer
  - 404 - Matière non trouvée
