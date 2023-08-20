const express = require("express");
const router = express.Router();
const {schemas} = require("../../models/contact");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const jsonParser = express.json();


router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", jsonParser, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put("/:id", jsonParser, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", jsonParser, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);


module.exports = router;
