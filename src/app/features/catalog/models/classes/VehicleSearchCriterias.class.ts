export class VehicleSearchCriterias {
  typeId = '';
  brandId = '';
  modelId = '';
  colorId = '';
  year = '';
  lowerPriceLimit: number = 0;
  upperPriceLimit: number | undefined = undefined;
  pageIndex = 1;
  currentPageItemsQuantity = 10;
}
