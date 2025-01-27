const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    link: { type: String, required: true },
    subItems: [
      {
        label: { type: String, required: true },
        link: {
          type: String,
          required: true,
          validate: {
            validator: (v) =>
              /^(ftp|http|https):\/\/[^ "]+$/.test(v),
            message: (props) => `${props.value} is not a valid URL!`,
          },
        },
        
      },
    ],
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
