import RestaurantModule from "../modules/restaurant";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

export default defineLink(RestaurantModule.linkable.restaurant, {
  linkable: ProductModule.linkable.product,
  isList: true,
});
