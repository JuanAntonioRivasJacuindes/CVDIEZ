import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import RoleService from "../service/RoleService";
const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [newRole, setNewRole] = useState(false);
    const [role, setRole] = useState({ name: "" });

    const roleService = new RoleService();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await roleService.getAllRoles();
        setRoles(data);
    };

    const openNew = () => {
        setRole({ name: "" });
        setNewRole(true);
        setDisplayDialog(true);
    };

    const saveRole = async () => {
        if (newRole) {
            await roleService.createRole(role.name);
        } else {
            await roleService.updateRole(role.id, role.name);
        }

        setDisplayDialog(false);
        fetchData();
    };

    const deleteRole = async () => {
        await roleService.deleteRoleById(role.id);
        setDisplayDialog(false);
        fetchData();
    };

    const onRoleSelect = (event) => {
        setNewRole(false);
        setRole({ ...event.data });
        setDisplayDialog(true);
    };

    const roleDialogFooter = (
        <div>
            <Button label="Guardar" icon="pi pi-check" onClick={saveRole} />
            <Button label="Eliminar" icon="pi pi-trash" onClick={deleteRole} />
        </div>
    );

    return (
        <div>
            <Button label="Agregar Nuevo" icon="pi pi-plus" onClick={openNew} />

            <DataTable value={roles} selection={selectedRole} onSelectionChange={(e) => setSelectedRole(e.value)} onRowSelect={onRoleSelect}>
                <Column field="name" header="Nombre" sortable></Column>
            </DataTable>

            <Dialog visible={displayDialog} modal style={{ width: "300px" }} header={newRole ? "Crear Rol" : "Editar Rol"} footer={roleDialogFooter} onHide={() => setDisplayDialog(false)}>
                <div className="p-inputgroup">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} />
                </div>
            </Dialog>
        </div>
    );
};

export default RoleTable;
