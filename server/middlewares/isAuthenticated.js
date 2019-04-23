module.exports = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.send("you can't sit with us")
  }
}