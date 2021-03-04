import { getElementById, appendChild, createElement, addClassList } from "./dom-methods.js";
import { purchaseConfig, salesConfig } from "./config.js";


const renderPurchases = () => {
    const { id, sectionName, data, methods } = purchaseConfig
    const element = getElementById(id);
    const sectionPanel = methods.buildPanel();
    methods.buildHeading(sectionPanel, sectionName);
    appendChild(element, sectionPanel)

    data.forEach(item => {
        const panel = methods.buildPanel();
        methods.buildHeading(panel, `Identifier: ${item.id} - Expected received date: ${item.receiving}`);
        methods.buildBody(panel, `Expected quantity: ${item.quantity}`);
        appendChild(element, panel)
    })
}


const renderSales = () => {
    const { id, sectionName, data, methods } = salesConfig
    const element = getElementById(id);
    const sectionPanel = methods.buildPanel();
    methods.buildHeading(sectionPanel, sectionName);
    appendChild(element, sectionPanel)

    data.forEach(item => {
        const panel = methods.buildPanel();
        methods.buildHeading(panel, `Identifier: ${item.id} - Created at: ${item.created}`);
        methods.buildBody(panel, `Requested quantity: ${item.quantity}`);
        appendChild(element, panel)
    })
}

const startAllocate = () => {

    //clean dom

    // take 1 sale 
    // take purchases until purchase quantity is equal or greater than 
}


const createAllocateButton = () => {
    const btnContainer = getElementById("btn-container");
    const button = createElement("button");
    button.textContent = "Allocate"
    addClassList(["btn", "btn-primary", "btn-lg"], button)
    button.addEventListener('click', () => {
        startAllocate();
    });

    btnContainer.appendChild(button);
}


renderPurchases();
renderSales();
createAllocateButton();


