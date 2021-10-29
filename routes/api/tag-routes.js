const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "products" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "products" }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // Tag.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((tag) => {
  //     // find all associated tags from ProductTag
  //     return ProductTag.findAll({ where: { tag_id: req.params.id } });
  //   })
  //   .then((product) => {
  //     // get list of current tag_ids
  //     const productIds = product.map(({ product_id }) => product_id);
  //     // create filtered list of new tag_ids
  //     const newProduct = req.body.tagIds
  //       .filter((product_id) => !productIds.includes(product_id))
  //       .map((product_id) => {
  //         return {
  //           tag_id: req.params.id,
  //           product_id,
  //         };
  //       });
  //     // figure out which ones to remove
  //     const productToRemove = product
  //       .filter(({ product_id }) => !req.body.tagIds.includes(product_id))
  //       .map(({ id }) => id);

  //     // run both actions
  //     return Promise.all([
  //       ProductTag.destroy({ where: { id: productToRemove } }),
  //       ProductTag.bulkCreate(newProduct),
  //     ]);
  //   })
  //   .then((updatedProduct) => res.json(updatedProduct))
  //   .catch((err) => {
  //     // console.log(err);
  //     res.status(400).json(err);
  //   });
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
