import autoBind from "auto-bind";
import CategoryMessages from "./category.messages.js";
import categoryService from "./category.service.js";

class CategoryController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async create(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;

      await this.#service.create({ name, slug, icon, parent });

      return res.status(201).json({
        message: CategoryMessages.Created,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();

      return res.json({ categories });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;

      await this.#service.remove(id);

      return res.json({
        message: CategoryMessages.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
