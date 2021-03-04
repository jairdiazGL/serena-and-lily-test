export const getElementById = (id) => document.getElementById(id);
export const createElement = (tag) => document.createElement(tag);
export const appendChild = (parent, child) => parent.appendChild(child);
export const addClassList = (list = [], parent) => list.forEach((classItem) => parent.classList.add(classItem));
export const removeChild = (containerTag, targetTag) => {
    const container = getElementById(containerTag);
    const target = document.getElementById(targetTag)
    container.removeChild(target);
};