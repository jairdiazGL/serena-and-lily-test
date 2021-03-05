import { buildSaleResponse } from "../../utils/index.js";
import { getElementById, appendChild, createElement } from "../../utils/dom-methods.js";
import { purchaseConfig, salesConfig } from "../../config.js";

const enableLogs = false;

const purchases = purchaseConfig.data;
let stock = 0;

const sales = salesConfig.data;
const assignedSales = [];

let processStack = [];

const receivePurchase = (currentSale, lastPurchase = {}) => {
    const isStockNotEnough = stock < currentSale.quantity;

    let currentPurchase = lastPurchase;
    if (purchases.length && isStockNotEnough) {
        currentPurchase = purchases.shift();
        stock += currentPurchase.quantity;
        processStack.push({ ...currentPurchase, type: "purchase" });
    }

    if (isStockNotEnough && !purchases.length)
        return buildSaleResponse({ currentSale, lastPurchase: currentPurchase });

    if (isStockNotEnough)
        return receivePurchase(currentSale, currentPurchase);

    stock -= currentSale.quantity;

    return buildSaleResponse({
        currentSale,
        supplyDate: currentPurchase.receiving,
        code: "ASSIGNED",
        lastPurchase: currentPurchase
    })
};

const allocate = (currentPurchase) => {
    enableLogs && console.info("Getting sale .....");
    const currentSale = sales.shift();
    enableLogs && console.info("Processing sale with identifier: ", currentSale.id);
    const { lastPurchase, sale } = receivePurchase(currentSale, currentPurchase);
    processStack.push({ ...sale, type: "sale" })
    enableLogs && console.info("Assigning expected supply date: ", sale.id, sale.supplyDate);
    assignedSales.push(sale)
    if (!sales.length) {
        stock = purchases.reduce((currentStock, nextPurchase) => {
            processStack.push({ ...nextPurchase, type: "purchase" })
            return currentStock + nextPurchase.quantity
        }, stock);

        enableLogs && console.info("No more sales to process ... ");
        return;
    }

    allocate(lastPurchase);
};

let index = 1;

const render = () => {
    const types = {
        purchase: purchaseConfig,
        sale: salesConfig
    };

    const element = processStack.shift();
    const newPanelConfig = types[element.type];

    const container = getElementById("allocate-section");

    const div = createElement("div");
    div.className = "col-md-3";

    const panel = newPanelConfig.methods.buildPanel();

    const headerText = newPanelConfig.messages.header(element.id, element.code)
    const bodyText = newPanelConfig.messages.body(element, element.code);

    newPanelConfig.methods.buildHeading(panel, headerText);
    newPanelConfig.methods.buildBody(panel, bodyText);
    newPanelConfig.methods.buildFooter(panel, index);


    appendChild(div, panel)
    appendChild(container, div)

    index++;

    if (!processStack.length) return true;

};

allocate();

const intervalRender = setInterval(() => {
    const emptyStack = render();
    if (emptyStack) return clearInterval(intervalRender)
}, 1000);