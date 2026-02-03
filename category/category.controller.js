const Category = require("./category.model");

const createCategory = async (req, res) => {
    try {
        const { categoryname, subcategory, description } = JSON.parse(req.body.category);

        const image = req.file.filename;

        const category = new Category({
            categoryname,
            subcategory,
            description,
            image,
        });

        const response = await category.save();

        res.status(201).json({
            success: true, message: "Category created successfully", data: response,
        });
    } catch (error) {
        res.status(400).json({
            success: false, message: "Failed to create category", error: error.message,
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, message: "category get", categories, });
    } catch (error) {
        res.status(500).json({
            success: false,message: "Failed to fetch categories",
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryname, subcategory, description } = JSON.parse(req.body.category);
        const image = req.file;

        const updateData = { categoryname, subcategory, description };


        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Category update failed",
            error: error.message,
        });
    }

};

const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false, message: "Category not found",
            });
        }

        res.status(200).json({
            success: true, message: "Category deleted successfully", data: deleted,
        });
    } catch (error) {
        res.status(400).json({
            success: false, message: "Failed to delete category",
        });
    }
};

module.exports = {
    createCategory, getCategory, updateCategory, deleteCategory,
};

