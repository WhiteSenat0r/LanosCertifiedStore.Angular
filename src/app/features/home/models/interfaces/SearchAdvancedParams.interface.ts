export interface SearchAdvancedParams{
    lowestPrice: number;
    highestPrice: number;
    year?: number;
    brand?: string;
    model?: string;
    engine?: string;
    locationRegion?: string;

    //ids
    brandId?: string;
    modelId?: string;
    engineTypeIds?: string;
    locationRegionId?: string;
    transmissionTypeIds?: string;
}