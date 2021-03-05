import { orderByDate } from "./utils/index.js";
import purchaseOrders from "./data/purchases.js";
import salesOrders from "./data/sales.js";
import { createElement, addClassList, appendChild } from "./utils/dom-methods.js";

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
        },
        buildFooter: (parent, stackIndex) => {
            const footer = createElement('div');
            addClassList(["panel-footer"], footer);

            const p = createElement("p");
            p.textContent = "Execution stack order ";
    
            const span = createElement("span");
            span.className = "badge";
            span.textContent = stackIndex;

            appendChild(p, span);
            appendChild(footer, p);
            appendChild(parent, footer)
    
    
        }
    }
};

export const purchaseConfig = {
    id: "purchases-section",
    sectionName: "Purchases",
    data: orderByDate({ data: purchaseOrders, orderBy: 'receiving' }),
    methods: generalMethods(["panel", "panel-info"]),
    messages: {
        header: (id) => `Receiving a purchase with identifier ${id}`,
        body: ({ receiving, quantity }) => `${quantity} product(s) has been received on ${receiving}.`
    }
};

export const salesConfig = {
    id: "sales-section",
    sectionName: "Sales",
    data: orderByDate({ data: salesOrders, orderBy: 'created' }),
    methods: generalMethods(["panel", "panel-success"]),
    messages: {
        header: (id, code) => {
            const customMessages = {
                ASSIGNED: `Supplying sale with identifier ${id}`,
                NO_STOCK: `Sale with identifier ${id} is waiting for purchases`
            };

            return customMessages[code];
        },
        body: ({ supplyDate, quantity }, code) => {
            const customMessages = {
                ASSIGNED: `${quantity} product(s) delivered on ${supplyDate}.`,
                NO_STOCK: `There are not enough products to supply this order`
            }
            return customMessages[code];
        }
        
    }
}