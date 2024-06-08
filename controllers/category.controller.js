import Category from "../models/category.js"

export const getAllCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();
        const response = {
            success: true,
            data: categoryList,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
