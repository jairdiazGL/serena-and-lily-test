import { orderByDate, buildSaleResponse } from "../../utils/index.js";

const data = [{
    id: "P1",
    receiving: "2020-01-06",
    quantity: 4
}, {
    id: "P2",
    receiving: "2020-01-05",
    quantity: 3
}];

const assert = [{
    id: "P2",
    receiving: "2020-01-05",
    quantity: 3
}, {
    id: "P1",
    receiving: "2020-01-06",
    quantity: 4
}];

describe("Utils index unit tests", () => {
    describe("Order by date", () => {
        it("Should return an array of items sorted ASC", () => {
            const result = orderByDate({ data , orderBy: "receiving" });
            expect(result).toEqual(assert)
        })
        it("Should return an array of items sorted DESC", () => { 
            const result = orderByDate({ data , orderBy: "receiving", sort: "desc"});
            expect(result).toEqual(assert.reverse())
        })
    })

    describe("build sale response", () => {
        it("Should return an object with values passed", () => {
            const objResult = buildSaleResponse({ lastPurchase: { id: 1 }, currentSale: { id: 2 }, code: "ASSIGNED", supplyDate: "2020-01-01" });
            expect(objResult).toEqual(jasmine.objectContaining({
                lastPurchase: { id: 1 },
                sale: {
                    id: 2,
                    code: "ASSIGNED",
                    supplyDate: "2020-01-01"
                }
            }));
        })

        it("Should return an object with default values", () => {
            const objResult = buildSaleResponse({});
            expect(objResult).toEqual(jasmine.objectContaining({
                lastPurchase: {},
                sale: {
                    code: "NO_STOCK",
                    supplyDate: "N/A"
                }
            }));
        })
    })
})
