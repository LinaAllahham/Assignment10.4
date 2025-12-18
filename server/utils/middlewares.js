
const endPointNotFound = (req, res) => {
  // TO DO: return 404 and not found message 
  res.status(404).json({ error: 'Endpoint not found' });
};

module.exports = {
  endPointNotFound,
};