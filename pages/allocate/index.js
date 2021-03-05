import { buildSaleResponse } from "../../utils/index.js";
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
    if(purchases.length && isStockNotEnough){
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
}

const render = () => {
    allocate();
    console.log(processStack);
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
}


render();