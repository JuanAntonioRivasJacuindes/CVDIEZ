import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import UserService from "../service/UserService";

const UserCrudComponent = () => {
    const [users, setUsers] = useState([]);
    const [userDialog, setUserDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const userService = new UserService();
    const token = localStorage.getItem("AuthToken");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const allUsers = await userService.getAllUsers(token);
            setUsers(allUsers);
        } catch (error) {
            console.error(error);
        }
    };

    const openNewUserDialog = () => {
        setIsNewUser(true);
        setFormData({ name: "", email: "", password: "" });
        setUserDialog(true);
    };

    const openEditUserDialog = (user) => {
        setIsNewUser(false);
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, password: user.password });
        setUserDialog(true);
    };

    const closeUserDialog = () => {
        setUserDialog(false);
        setSelectedUser(null);
        setFormData({ name: "", email: "", password: "" });
    };

    const saveUser = async () => {
        try {
            if (isNewUser) {
                await userService.createUser(formData.name, formData.email, formData.password);
            } else {
                await userService.updateUserById(selectedUser.id, formData.name, formData.email, formData.password);
            }

            closeUserDialog();
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (user) => {
        try {
            await userService.deleteUserById(user.id);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const userDialogFooter = (
        <div>
            <Button label="Guardar" icon="pi pi-check" onClick={saveUser} />
            <Button label="Cancelar" icon="pi pi-times" onClick={closeUserDialog} className="p-button-secondary" />
        </div>
    );

    return (
        <div>
            <Button label="Nuevo Usuario" icon="pi pi-plus" className="p-button-success" onClick={openNewUserDialog} />
            <DataTable value={users}>
                <Column field="name" header="Nombre" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => openEditUserDialog(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteUser(rowData)} />
                        </div>
                    )}
                ></Column>
            </DataTable>
            <Dialog visible={userDialog} style={{ width: "450px" }} header={isNewUser ? "Nuevo Usuario" : "Editar Usuario"} modal className="p-fluid" footer={userDialogFooter} onHide={closeUserDialog}>
                <div className="p-field">
                    <label htmlFor="name">Nombre:</label>
                    <InputText id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="email">Email:</label>
                    <InputText id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Contraseña:</label>
                    <InputText id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
            </Dialog>
        </div>
    );
};

export default UserCrudComponent;
