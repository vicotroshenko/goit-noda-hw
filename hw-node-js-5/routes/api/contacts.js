const express = require("express");
const router = express.Router();
const {schemas} = require("../../models/contact");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const jsonParser = express.json();


router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post("/", jsonParser, authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.put("/:id", jsonParser,  authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", jsonParser, authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);


module.exports = router;
