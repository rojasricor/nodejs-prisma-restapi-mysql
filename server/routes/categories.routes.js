import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
    const categories = await prisma.category.findMany({
        include: {
            products: true,
        },
    });
    res.json(categories);
});

router.get("/categories/:id", async (req, res) => {
    const categoryFound = await prisma.category.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
        include: {
            products: true,
        },
    });
    if (!categoryFound)
        return res.status(404).json({ error: "Category not found" });

    res.json(categoryFound);
});

router.post("/categories", async (req, res) => {
    try {
        const categoryCreated = await prisma.category.create({
            data: req.body,
        });
        res.json(categoryCreated);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
});

router.put("/categories/:id", async (req, res) => {
    try {
        const categoryUpdated = await prisma.category.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });
        if (!categoryUpdated)
            return res.status(404).json({ error: "Category not found" });

        res.json(categoryUpdated);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
});

router.delete("/categories/:id", async (req, res) => {
    try {
        const categoryDeleted = await prisma.category.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!categoryDeleted)
            return res.status(404).json({ error: "Category not found" });

        res.json(categoryDeleted);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
});

export default router;
