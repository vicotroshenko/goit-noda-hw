const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const jsonParser = express.json();


router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", jsonParser, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", jsonParser, validateBody(schemas.addSchema), ctrl.updateById);


module.exports = router;
