import { generalMethods, purchaseConfig, salesConfig } from "../config.js";

describe("Config unit tests", () => {
    describe("general methods", () => {
        it("Should return 4 keys", () => {
            const methods = generalMethods();
            expect(Object.keys(methods).length).toBe(4);
            expect(Object.keys(methods)).toEqual(["buildPanel", "buildHeading", "buildBody", "buildFooter"]);
        })
    })

    describe("purchasing config", () => {
        it("Should return 5 keys", () => {
            const config = purchaseConfig;
            expect(Object.keys(config).length).toBe(5);
            expect(Object.keys(config)).toEqual(["id", "sectionName", "data", "methods", "messages"]);
        });

        it("id must be equal to purchases-section", ()=> {
            const id = purchaseConfig.id;
            expect(id).toBe("purchases-section")
        });

        it("sectionName must be equal to Purchases", ()=> {
            const sectionName = purchaseConfig.sectionName;
            expect(sectionName).toBe("Purchases")
        });

        it("all items in data must have [id,receiving, quantity]", ()=>{
            const data = purchaseConfig.data;
            data.forEach(row =>{
                const keys = Object.keys(row)
                expect(keys).toEqual(["id", "receiving", "quantity"]);
            })
        })

        it("Should return header and body functions", ()=> {
            const funcs = purchaseConfig.messages;

            Object.keys(funcs).forEach(fn => {
                expect(typeof funcs[fn]).toBe("function")
            })

        })
    })
    describe("sales config", () => {
        it("Should return 5 keys", () => {
            const config = salesConfig;
            expect(Object.keys(config).length).toBe(5);
            expect(Object.keys(config)).toEqual(["id", "sectionName", "data", "methods", "messages"]);
        })

        it("id must be equal to sales-section", ()=> {
            const id = salesConfig.id;
            expect(id).toBe("sales-section")
        });

        it("sectionName must be equal to Purchases", ()=> {
            const sectionName = salesConfig.sectionName;
            expect(sectionName).toBe("Sales")
        });

        it("all items in data must have [id,created,quantity]", ()=>{
            const data = salesConfig.data;
            data.forEach(row =>{
                const keys = Object.keys(row)
                expect(keys).toEqual(["id", "created", "quantity"]);
            })
        })

        it("Should return header and body functions", ()=> {
            const funcs = salesConfig.messages;
            Object.keys(funcs).forEach(fn => {
                expect(typeof funcs[fn]).toBe("function")
            })
        })

     })
})