import mongoose from "mongoose";

const ExtraPriceSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);
export default mongoose.models?.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
