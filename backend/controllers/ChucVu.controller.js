const ChucVu = require("../models/ChucVu.model");

// @desc Fetch all duties
// @route Get/api/duties
// @access Public
const getList = async (req, res) => {
  await ChucVu.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Duty not found ");
    }
  });
};

module.exports = {
  getList,
};
