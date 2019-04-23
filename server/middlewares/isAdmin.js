module.exports = function(req, res, next) {
  if (req.query.isAdmin === 'true') {
    next()
  } else {
    res.send("you can't access this info")
  }
}