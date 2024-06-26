const jwt = require("jsonwebtoken");
const privateKey=require('../auth/private_key')
const auth = (req, res, next) => {
 
  const authorizationHeader = req.headers.authorization;
  //console.log(authorizationHeader);
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(' ')[1];
  //console.log(token);
  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
      return res.status(401).json({ message, donnees: error });
    }

    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`;
            return res.status(401).json({ message });
    }

    next();
  });
};

module.exports=auth;