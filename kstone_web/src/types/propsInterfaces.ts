export interface QuickPossession {
  _id: string;
  houseModel: string;
  houseType: string;
  community: {
    name: string;
  };
  sqft: number;
  beds: number;
  baths: number;
  oldPrice: number;
  newPrice: number;
  featuredImage: string | null;
  status: string;
  availability: string | null;
  slug: {
    currrent: string;
  };
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

export interface GalleryImage {
  _id: string;
  altText?: string;
  image: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
}


export interface PropertyCardType {
  _id: string;
  houseName: string;
  propertyState: "preConstruction" | "quickPossession" | "showhome";
  slug: string;
  houseType: string;
  featuredImage: string;
  community: { name: string };
  address: string;
  province?: string;
  status: "ready" | "pending" | "sold" | "available";
  readyStatus?: string;
  availableStatus?: string;
  oldPrice?: number;
  newPrice: number;
  allFeatures: {
    sqft: string;
    bedrooms: string;
    bathrooms: string;
  };
}


export interface Property {
  _id: string;
  houseName: string;
  propertyState: "preConstruction" | "quickPossession" | "showhome";
  slug: string;
  houseType: string;
  featuredImage: string;
  city: string;
  community: {
    name: string;
  };
  shortDescription: string;
  address?: string;
  province?: string;
  status?: "ready" | "pending" | "sold" | "available";
  readyStatus?: string;
  availableStatus?: string;
  oldPrice?: number;
  newPrice: number;
  houseGallery: Array<{
    url: string;
    alt?: string | undefined;
  }>;
  videoTour?: string;
  floorPlans?: Array<{
    floor: string;
    image: string;
  }>;
  garage: string;
  allFeatures: {
    sqft: string;
    mainHouseSqft: string;
    basementSqft: string;
    garageSuiteSqft: string;
    bedrooms: string;
    bathrooms: string;
    kitchen?: number;
    spiceKitchen?: boolean;
    spiceKitchenTotal?: string;
    fullBath?: number;
    livingRoom?: number;
    bonusRoom?: boolean;
    bonusRoomTotal?: string;
    openToAbove?: boolean;
    openToAboveTotal?: string;
    ceilingHeight?: string;
    doubleBasement?: boolean;
    treatedWoodDeck?: boolean;
    concretePad?: boolean;
    compositeDeck?: boolean;
    vinylDeck?: boolean;
    rearBalcony?: boolean;
    rearBalconyTotal?: number;
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
    sevenBedsFiveBath?: string;
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
  };
  additionalFeatures?: string[];
  upgrades?: string[];
  floorPlan?: string; // PDF asset URL or ref
}
