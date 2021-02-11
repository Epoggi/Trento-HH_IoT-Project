const withAuth = function(req, res, next)  {
  const type = req.body.type;

  if (type = "user"){
    res.status(401).send('401: You are not authorized to view this.');
  } else {
    req.email = decoded.email;
    next();
  }
}

module.exports = withAuth;