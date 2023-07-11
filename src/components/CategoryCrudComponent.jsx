import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import CategoryService from "../service/CategoryService";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [category, setCategory] = useState({ name: "" });

    const categoryService = new CategoryService();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await categoryService.getAllCategories();
        setCategories(data);
    };

    const openNew = () => {
        setCategory({ name: "" });
        setNewCategory(true);
        setDisplayDialog(true);
    };

    const saveCategory = async () => {
        if (newCategory) {
            await categoryService.createCategory(category.name);
        } else {
            await categoryService.updateCategory(category.id, category.name);
        }

        setDisplayDialog(false);
        fetchData();
    };

    const deleteCategory = async () => {
        await categoryService.deleteCategoryById(category.id);
        setDisplayDialog(false);
        fetchData();
    };

    const onCategorySelect = (event) => {
        setNewCategory(false);
        setCategory({ ...event.data });
        setDisplayDialog(true);
    };

    const categoryDialogFooter = (
        <div>
            <Button label="Guardar" icon="pi pi-check" onClick={saveCategory} />
            <Button label="Eliminar" icon="pi pi-trash" onClick={deleteCategory} />
        </div>
    );

    return (
        <div>
            <Button label="Agregar Nuevo" icon="pi pi-plus" onClick={openNew} />

            <DataTable value={categories} selectionMode="single" selection={selectedCategory} onSelectionChange={(e) => setSelectedCategory(e.value)} onRowSelect={onCategorySelect}>
                <Column field="name" header="Nombre" sortable></Column>
            </DataTable>

            <Dialog visible={displayDialog} modal style={{ width: "300px" }} header={newCategory ? "Crear Categoría" : "Editar Categoría"} footer={categoryDialogFooter} onHide={() => setDisplayDialog(false)}>
                <div className="p-inputgroup">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                </div>
            </Dialog>
        </div>
    );
};

export default CategoryTable;
