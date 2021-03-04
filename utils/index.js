export const orderByDate = ({ data = [], orderBy = '', sort = "asc" }) => {
    const sortedArray = data.sort((date, nextDate ) => {
        return new Date(date[orderBy]) - new Date(nextDate[orderBy]);
    });

    if(sort === 'desc') return sortedArray.reverse();
    return sortedArray;
};


export const allocate = ({ salesOrders = [], purchaseOrders = [] }) => {


};
