const Size = require("../models/Size.model");

// @desc Fetch all sizes
// @route Get/api/products
// @access Public
const getList = async (req, res) => {
  await Size.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Size Not Found ");
    }
  });
};
module.exports = {
  getList,
};
