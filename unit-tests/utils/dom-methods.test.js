import { getElementById, createElement, appendChild, addClassList } from "../../utils/dom-methods.js";

let getElementByIdSpy;
let createElementSpy;

const domMethodsMock = { appendChild: jasmine.createSpy(), classList: { add: jasmine.createSpy() } };


beforeEach(()=> {
    getElementByIdSpy = spyOn(document, "getElementById").and.returnValue(domMethodsMock)
    createElementSpy = spyOn(document, "createElement").and.returnValue(domMethodsMock)
})

describe("Dom methods unit tests", ()=> {
    it("Should execute getElementById dom method",()=>{
        const id = "example";
        getElementById(id);
        expect(getElementByIdSpy).toHaveBeenCalledWith(id)
    });
    it("Should execute createElement dom method",()=>{
        const tag = "example";
        createElement(tag);
        expect(createElementSpy).toHaveBeenCalledWith(tag)
    });
    it("Should execute appendChild from parent",()=>{
        appendChild(domMethodsMock, "child");
        expect(domMethodsMock.appendChild).toHaveBeenCalled();
    });
    it("Should execute classList.add fro each class listed",()=>{
        const classesList = ["example1", "example2"]
        addClassList(classesList, domMethodsMock)
        classesList.forEach(cls => {
            expect(domMethodsMock.classList.add).toHaveBeenCalledWith(cls);
        });
    });
})