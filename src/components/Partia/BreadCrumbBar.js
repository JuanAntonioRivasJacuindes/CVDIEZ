import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useLocation } from "react-router-dom";

export default function BreadCrumbBar() {
    const items = [];
    const home = { icon: "pi pi-home", url: "/" };
    const location = useLocation().pathname.split("/");
    let routes = "";
    location.map((obj) => {
        if (obj !== "") {
            routes = routes + "/" + obj;
            items.push({ label: obj.toUpperCase(), url: routes });
        }
    });

    return <BreadCrumb model={items} home={home} />;
}
