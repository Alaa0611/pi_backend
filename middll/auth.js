const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

module.exports = (req, res, next) => {
  // Récupérer le token dans l'en-tête Authorization : "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: 'Pas de token, accès refusé' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token mal formé' });
  }

  const token = parts[1];

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, secret);
    // decoded doit contenir au moins { userId: ... }
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token invalide ou expiré' });
  }
};
