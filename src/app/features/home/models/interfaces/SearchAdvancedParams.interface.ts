export interface SearchAdvancedParams{
    lowestPrice: number;
    highestPrice: number;
    year?: number;
    brand?: string;
    model?: string;
    engine?: string;
    region?: string;
    transmission?: string;

    //ids
    brandId?: string;
    modelId?: string;
    engineId?: string;
    regionId?: string;
    transmissionId?: string;
}