export const orderByDate = ({ data = [], orderBy = '', sort = "asc" }) => {
    const sortedArray = data.sort((item, nextItem) => {
        return new Date(item[orderBy]) - new Date(nextItem[orderBy])
    });

    if (sort === 'desc') return sortedArray.reverse();
    return sortedArray;
};

export const buildSaleResponse = ({
    lastPurchase = {},
    currentSale = {},
    code = "NO_STOCK",
    supplyDate = "N/A"
}) => {
    return {
        lastPurchase,
        sale: {
            ...currentSale,
            code,
            supplyDate
        }
    }
};