import autoBind from "auto-bind";
import { isValidObjectId, Types } from "mongoose";
import slugify from "slugify";

import CategoryModel from "./category.model.js";
import CategoryMessages from "./category.messages.js";

class CategoryService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }

  async create(categoryDTO) {
    if (categoryDTO.parent) {
      if (!isValidObjectId(categoryDTO.parent)) {
        throw new Error("Invalid parent category ID");
      }

      const parent = await this.checkExistById(categoryDTO.parent);

      categoryDTO.parents = [...parent.parents, parent._id];
    }

    categoryDTO.slug = slugify(categoryDTO.slug || categoryDTO.name, { trim: true, replacement: "_", lower: true });

    await this.alreadyExistBySlug(categoryDTO.slug);

    return this.#model.create(categoryDTO);
  }

  async find() {
    return this.#model.find({ parent: { $exists: false } });
  }

  async remove(id) {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid category ID");
    }

    await this.checkExistById(id);

    const hasChildren = await this.#model.exists({ parent: id });

    if (hasChildren) {
      throw new Error("Cannot delete category with children");
    }

    await this.#model.deleteOne({ _id: id });
  }

  async checkExistById(id) {
    const category = await this.#model.findById(id);

    if (!category) {
      throw new Error(CategoryMessages.CategoryNotFound);
    }

    return category;
  }

  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });

    if (!category) {
      throw new Error(CategoryMessages.CategoryNotFound);
    }

    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await this.#model.exists({ slug });

    if (category) {
      throw new Error(CategoryMessages.SlugAlreadyExist);
    }
  }
}

export default new CategoryService();
