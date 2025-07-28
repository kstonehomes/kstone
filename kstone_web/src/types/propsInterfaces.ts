
 export interface AllFeatures {
  // Main Features
  sqft: number;
  mainHouseSqft: number;
  bedrooms: string;
  bathrooms: string;
  // Key Features
  kitchen?: number;
  spiceKitchen?: boolean;
  spiceKitchenTotal?: string;
  fullBath?: number;
  livingRoom?: number;
  bonusRoom?: number;
  openToAbove?: boolean;
  openToAboveTotal?: string;
  ceilingHeight?: string;
  doubleBasement?: boolean;
  basementSqft?: number;
  garageSuiteSqft?: number;
  treatedWoodDeck?: boolean;
  concretePad?: boolean;
  compositeDeck?: boolean;
  vinylDeck?: boolean;
  rearBalcony?: boolean;
  rearBalconyTotal?: string;
  frontBalcony?: boolean;
  featureWalls?: boolean;
  vinylFlooring?: boolean;
  tiledFlooring?: boolean;
  tripleCarGarage?: boolean;
  doubleCarGarage?: boolean;
  separateSideEntrance?: boolean;
  mainFloorFullBedBath?: boolean;
  rentalGarageSuite?: boolean;
  parkFacing?: boolean;
  legalFinishedBasement?: boolean;
  ownerSuiteBasement?: boolean;
  // sevenBedsFiveBath?: string;
  airportNearby?: boolean;
  playgroundSchoolsNearby?: boolean;
  golfNearby?: boolean;
  schoolNearby?: boolean;
  walkout?: boolean;
  partialWalkout?: boolean;
  regularLot?: boolean;
  vaultedCeiling?: boolean;
  indentCeiling?: boolean;
  ceilingHighCabinets?: boolean;
  dropCeilings?: boolean;
  carpetFloor?: boolean;
  tenFTceilings?: boolean;
  twentyFTceilings?: boolean;
  enSuites?: number;

  [key: string]: string | number | boolean | undefined;
}

export interface QuickPossession {
  _id: string;
  houseModel: string;
  houseType: string;
  community: {
    name: string;
  };
  oldPrice?: number;
  newPrice?: number;
  address?: string;
  featuredImage: string | null;
  status: "ready" | "pending" | "sold" | "available";
  readyStatus?: string | null;
  availableStatus?: string | null;
  allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
  slug: {
    currrent: string;
  };
}
export interface PreConstruction {
  _id: string;
  houseModel: string;
  houseType: string;
  community: {
    name: string;
  };
  oldPrice?: number;
  newPrice?: number;
  address?: string;
  featuredImage: string | null;
  status?: "ready" | "pending" | "sold" | "available";
  readyStatus?: string | null;
  availableStatus?: string | null;
  allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
  slug: {
    currrent: string;
  };
}

export interface FloorPlan {
  floor: string;
  image: string;
}

export interface QuickPossessionDetail {
  _id: string;
  houseModel: string;
  houseType: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  garage: string;
  oldPrice: number;
  newPrice: number;
    address?: string;
  featuredImage: string;
  status: "ready" | "pending" | "sold" | "available";
   readyStatus?: string | null;
  availableStatus?: string | null;
  houseGallery?: { url: string }[];
  shortDescription?: string;
  floorPlans?: FloorPlan[];
  floorPlanPdf?: string;
  floorPlanFileName: string | null;
  slug: string;
  allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
}
export interface PreConstructionDetail {
  _id: string;
  houseModel: string;
  houseType: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  garage: string;
      address?: string;
  oldPrice: number;
  newPrice: number;
  featuredImage: string;
  status?: "ready" | "pending" | "sold" | "available";
 readyStatus?: string | null;
  availableStatus?: string | null;
  houseGallery?: { url: string }[];
  shortDescription?: string;
  floorPlans?: FloorPlan[];
  floorPlanPdf?: string;
  floorPlanFileName: string | null;
  slug: string;
  allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
}

export interface FloorPlansProps {
  _id: string;
  floorPlanModel: string;
  floorPlanName: string;
  garage: string;
   community?: {
    name: string;
  };
          status?: "ready" | "pending" | "sold" | "available";
 readyStatus?: string | null;
  availableStatus?: string | null;
  shortDescription: string;
  address?: string;
  featuredImage: string;
  slug: {
    currrent: string;
  };
    allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
  floorPlans?: FloorPlan[];
  floorPlanPdf?: string;
  floorPlanFileName: string | null;
}
export interface FloorPlansCardProps {
  _id: string;
  floorPlanModel: string;
  floorPlanName: string;
  address?: string;
   community?: {
    name: string;
  };
  featuredImage: string;
  slug: {
    currrent: string;
  };
  allFeatures: AllFeatures;
          status?: "ready" | "pending" | "sold" | "available";
 readyStatus?: string | null;
  availableStatus?: string | null;
  additionalFeatures?: string[];
  upgrades?: string[];
  floorPlans?: FloorPlan[];
  floorPlanPdf?: string;
  floorPlanFileName: string | null;
}

export interface ShowHomeProps {
  _id: string;
  houseModel: string;
  slug: string;
  status?: "ready" | "pending" | "sold" | "available";
 readyStatus?: string | null;
  availableStatus?: string | null;
  shortDescription?: string;
  featuredImage: string;
  houseType: string;
  address?: string;
  community: {
    name: string;
  };
  province: string;
  propertySize: number;
  garage: string;
  allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
}

export interface ShowHomeSingleProps {
  _id: string;
  houseModel: string;
  houseType: string;
  streetAddress: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  province: string;
  propertySize: number;
  garage: string;
      address?: string;
        status?: "ready" | "pending" | "sold" | "available";
 readyStatus?: string | null;
  availableStatus?: string | null;
  shortDescription?: string;
  videoTour: string;
  houseGallery?: { url: string }[];
  featuredImage: string;
  floorPlanPdf?: string;
  floorPlanFileName: string | null;
  slug: string;
  allFeatures: AllFeatures;
  additionalFeatures?: string[];
  upgrades?: string[];
}

export interface FilterByCommunityProps {
  community: string;
  setCommunity: (community: string) => void;
}

export interface Community {
  _id: string;
  name: string;
  city: {
    name: string;
  };
  description: string;
  featuredImage: string;
  slug: string;
}