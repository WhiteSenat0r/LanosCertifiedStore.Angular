export class VehicleSearchCriterias {
  typeId = '';
  brandId = '';
  locationRegionId = '';
  modelId = '';
  townId = '';
  colorId = '';
  year = '';

  engineTypeIds: string[] = [];
  drivetrainTypeIds: string[] = [];
  bodyTypeIds: string[] = [];
  transmissionTypeIds: string[] = [];
  vTypeIds: string[] = [];

  lowerPriceLimit: number = 0;
  upperPriceLimit: number | undefined = undefined;
  pageIndex = 1;
  currentPageItemsQuantity = 10;
}
