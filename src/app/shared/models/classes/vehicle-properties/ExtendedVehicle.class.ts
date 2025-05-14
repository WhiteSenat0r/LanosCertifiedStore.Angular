export class ExtendedVehicle {
  id: string;
  description: string;
  brand: string;
  model: string;
  color: string;
  type: string;
  bodyType: string;
  engineType: string;
  transmissionType: string;
  drivetrainType: string;
  region: string;
  area: string;
  town: string;
  mileage: number;
  productionYear: number;
  displacement: number;
  vincode: string;
  ownerId: string;
  ownerData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  prices: {
    id: string;
    issueDate: string;
    value: number;
  }[];
  images: {
    cloudImageId: string;
    imageUrl: string;
    isMainImage: boolean;
  }[];
  createdAt: string;
  isPresentInWishlist: boolean;

  constructor() {
    this.id = '';
    this.description = '';
    this.brand = '';
    this.model = '';
    this.color = '';
    this.type = '';
    this.bodyType = '';
    this.engineType = '';
    this.transmissionType = '';
    this.drivetrainType = '';
    this.region = '';
    this.area = '';
    this.town = '';
    this.mileage = 0;
    this.productionYear = 0;
    this.displacement = 0;
    this.vincode = '';
    this.ownerId = '';
    this.ownerData = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    };
    this.prices = [];
    this.images = [];
    this.createdAt = '';
    this.isPresentInWishlist = false;
  }
}
