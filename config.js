import { orderByDate } from "./utils/index.js";
import purchaseOrders from "./data/purchases.js";
import salesOrders from "./data/sales.js";
import { createElement, addClassList, appendChild } from "./dom-methods.js";

export const generalMethods = (panelClasses = []) => {
    return {
        buildPanel: () => {
            const panel = createElement('div');
            addClassList(panelClasses, panel);
            return panel;
        },
        buildHeading: (parent, text) => {
            const heading = createElement('div');
            addClassList(["panel-heading"], heading);
            heading.textContent = text;
            appendChild(parent, heading);
        },
        buildBody: (parent, text) => { 
            const body = createElement('div');
            addClassList(["panel-body"], body);
            body.textContent = text;
            appendChild(parent, body);
        }
    }
};

export const purchaseConfig = {
    id: "purchases-section",
    sectionName: "Purchases",
    keys: ["id", "receiving", "quantity"],
    data: orderByDate({ data: purchaseOrders, orderBy: 'receiving' }),
    methods: generalMethods(["panel", "panel-info"])
};

export const salesConfig = {
    id: "sales-section",
    sectionName: "Sales",
    keys: ["id", "created", "quantity"],
    data: orderByDate({ data: salesOrders, orderBy: 'created' }),
    methods: generalMethods(["panel", "panel-success"])
}