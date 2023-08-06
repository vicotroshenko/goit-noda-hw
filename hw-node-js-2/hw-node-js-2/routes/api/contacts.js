const express = require("express");
const router = express.Router();
const addSchema = require("../../schemas/contacts");


const contacts = require("../../db/contacts");
const {HttpError} = require("../../helpers")
const jsonParser = express.json();


router.get("/", async ( __, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
		next(error);
	}
});

router.get("/:id", async(req, res, next) => {
  try {
		const { id } = req.params;
    const result = await contacts.getContactById(id);
		if(!result) {
			throw HttpError(404, "Not found");
		}
    res.json(result);
  } catch (error) {
		next(error);
  }
});

router.post("/", jsonParser, async(req, res, next) => {
  try {
		const {error} = addSchema.validate(req.body);
		if(error){
			throw HttpError(400, "missing required name field");
		}
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
		next(error);
	}
});


router.delete("/:id", async (req, res, next) => {
  try {
		const {id} = req.params;
    const result = await contacts.removeContact(id);
		if(!result) {
			throw HttpError(404, "Not found");
		}
    res.json({
			message: "contact deleted"
		});
  } catch (error) {
		next(error);
	}
});

router.put("/:id", jsonParser, async (req, res, next) => {
  try {
		const {error} = addSchema.validate(req.body);
		if(error){
			throw HttpError(400, "missing fields");
		}
		const {id} = req.params;
		const result = await contacts.updateById(id, req.body);
		if(!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
  } catch (error) {
	next(error);
	}
});


module.exports = router;
