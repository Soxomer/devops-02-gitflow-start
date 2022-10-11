const express = require("express");
const Inventions = require('../models/Invention');
const keyToUpperCase = require('../services/keyToUpperCase');

const router = express.Router();

router.get('/inventions/:key?', (req, res) => {
	const inventions = keyToUpperCase(Inventions.list(), req.params.key ?? 'author');
	res.send({ 
		inventions, 
	});
});
router.get('/inventions/sort/:orderType?', (req,res) => { 
let sortedList = Inventions.list().sort(
  (e, m) => e.creationDate - m.creationDate
);
let listToReturn = () => {
  if (req.params.orderType == "asc") return sortedList;
  else if (req.params.orderType == "desc") return sortedList.reverse();
  else return "Something went wrong dude :/";
}

res.send(listToReturn())
});
module.exports = router;