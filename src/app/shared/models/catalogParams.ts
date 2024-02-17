export class CatalogParams{
    typeName = '';
    brandName = '';
    colorName = '';
    modelName = '';
    sort = '';

    upperPriceLimit = 100000;
    lowerPriceLimit = 0;
    minimalPriceDate = new Date(2001,0,1);


    pageNumber = 1;
    pageSize = 10;
}