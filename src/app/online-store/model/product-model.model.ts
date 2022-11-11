import { ProviderAddressModel } from "./provider-address-model.model";

export interface ProductModel {
    startDate: Date;
    id: string;
    name: string;
    quantity: number;
    factoryPrice: number;
    salePrice: number;
    category: [];
    provider: [];
    address: ProviderAddressModel;

}

