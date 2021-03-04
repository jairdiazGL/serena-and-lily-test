import { purchaseConfig, salesConfig } from "../../config.js";


const purchases = purchaseConfig.data;
const receivedPurchase = [];

const sales = salesConfig.data;
let currentSale = sales.shift();
const assignedSales = [];

let stock = 0;
let processing = false;

const getPurchase = () => {
    const currentPurchase = purchases.shift();
    stock += currentPurchase.quantity;
    console.log("Current stock ...    ", stock)
    return currentPurchase;
};

const shouldGoNextSale = (currentPurchase) => {
    if (currentSale && stock >= currentSale.quantity) {
        stock -= currentSale.quantity;
        const assignedSale = { ...currentSale, expectedDate: currentPurchase.receiving }
        console.log("assigning sale  ...", currentPurchase.receiving, currentSale.quantity, stock)
        assignedSales.push(assignedSale);
        currentSale = purchases.length && sales.shift();
    }
}


const allocate = () => {
    processing = true;
    const currentPurchase = getPurchase();
    shouldGoNextSale(currentPurchase);
    receivedPurchase.push(currentPurchase);
    if (purchases.length) {
        setTimeout(() => allocate(), 3000);
    } else if (sales.length) {
        console.log("Purchases are not enought to cover all sales");
        sales.forEach(({ id, quantity, created }) => {
            console.log(`Pending ...  Identifier: ${id} - created: ${created} - quantity: ${quantity}`)
        })
    }
}

allocate();