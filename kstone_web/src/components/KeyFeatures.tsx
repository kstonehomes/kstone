import { FaBath, FaHome, FaChevronUp } from "react-icons/fa"; 
import { FaKitchenSet, FaStairs, FaDoorOpen, FaHouseCircleCheck } from "react-icons/fa6";
import { TbRulerMeasure2 } from "react-icons/tb";
import { MdHeight, MdSchool, MdGolfCourse, MdAirplanemodeActive, MdOutlineDeck } from "react-icons/md";
import { GiExitDoor, GiHomeGarage, GiPackedPlanks, GiPlanks, GiWindow} from "react-icons/gi";
import { AllFeatures } from "@/types/propsInterfaces";
import { IoIosBed } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { BsBarChartSteps, BsBodyText, BsBricks, BsFillDoorOpenFill } from "react-icons/bs";
import { PiGarage } from "react-icons/pi";
import { RiHome7Fill } from "react-icons/ri";
import { IoShieldCheckmark } from "react-icons/io5";
import { CiForkAndKnife } from "react-icons/ci";
import { DiWindows } from "react-icons/di";
import { FiCommand } from "react-icons/fi";


export default function KeyFeatures({features}: {features: AllFeatures}) {
  return (
    <div className="property-additional-features-grid lg:grid-cols-7">
        {features.kitchen && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><CiForkAndKnife /></div>
                <div className="property-additional-features-label">{features.kitchen} Kitchen</div>
            </div>
        )}
        {features.spiceKitchen && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><CiForkAndKnife /></div>
                <div className="property-additional-features-label">Spice Kitchen</div>
            </div>
        )}
        {features.spiceKitchenTotal && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaKitchenSet /></div>
                <div className="property-additional-features-label">{features.spiceKitchenTotal} Spice Kitchen</div>
            </div>
        )}
        {features.fullBath && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaBath /></div>
                <div className="property-additional-features-label">{features.fullBath} Full Bath</div>
            </div>
        )}
        {features.livingRoom && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><IoIosBed /></div>
                <div className="property-additional-features-label">{features.livingRoom} Living Room</div>
            </div>
        )}
        {features.bonusRoom && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><IoIosBed /></div>
                <div className="property-additional-features-label">{features.bonusRoom} Bonus Room</div>
            </div>
        )}
        {features.openToAbove && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaStairs /></div>
                <div className="property-additional-features-label">Open To Above</div>
            </div>
        )}
        {features.openToAboveTotal && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><ImHome /></div>
                <div className="property-additional-features-label">{features.openToAboveTotal} Open To Above</div>
            </div>
        )}
        {features.ceilingHeight && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><MdHeight /></div>
                <div className="property-additional-features-label">{features.ceilingHeight} Ceiling Height</div>
            </div>
        )}
        {features.doubleBasement && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaDoorOpen /></div>
                <div className="property-additional-features-label">Double Basement</div>
            </div>
        )}
        {/* {features.basementSqft && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><TbRulerMeasure /></div>
                <div className="property-additional-features-label">{features.basementSqft} Basement Sqft</div>
            </div>
        )} */}
        {/* {features.garageSuiteSqft && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiHomeGarage /></div>
                <div className="property-additional-features-label">{features.garageSuiteSqft} Garage Suite Sqft</div>
            </div>
        )} */}
        {features.treatedWoodDeck && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiPackedPlanks /></div>
                <div className="property-additional-features-label">Treated Wood Deck</div>
            </div>
        )}
        {features.concretePad && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><BsBricks /></div>
                <div className="property-additional-features-label">Concrete Pad</div>
            </div>
        )}
        {features.compositeDeck && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><MdOutlineDeck /></div>
                <div className="property-additional-features-label">Composite Deck</div>
            </div>
        )}
        {features.vinylDeck && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiPlanks /></div>
                <div className="property-additional-features-label">Vinyl Deck</div>
            </div>
        )}
        {features.rearBalcony && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiWindow /></div>
                <div className="property-additional-features-label">{features.rearBalcony} Rear Balcony</div>
            </div>
        )}
        {features.rearBalconyTotal && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiWindow /></div>
                <div className="property-additional-features-label">{features.rearBalconyTotal} Rear Balcony</div>
            </div>
        )}
        {features.frontBalcony && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiWindow /></div>
                <div className="property-additional-features-label">Front Balcony</div>
            </div>
        )}
        {features.featureWalls && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><BsBarChartSteps /></div>
                <div className="property-additional-features-label">Feature Walls</div>
            </div>
        )}
        {features.vinylFlooring && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><BsBodyText /></div>
                <div className="property-additional-features-label">Vinyl Flooring</div>
            </div>
        )}
        {features.tiledFlooring && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><DiWindows /></div>
                <div className="property-additional-features-label">Tiled Flooring</div>
            </div>
        )}
        {features.tripleCarGarage && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><PiGarage /></div>
                <div className="property-additional-features-label">Triple Car Garage</div>
            </div>
        )}
        {features.doubleCarGarage && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><PiGarage /></div>
                <div className="property-additional-features-label">Double Car Garage</div>
            </div>
        )}
        {features.separateSideEntrance && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><BsFillDoorOpenFill /></div>
                <div className="property-additional-features-label">Separate Side Entrance</div>
            </div>
        )}
        {features.mainFloorFullBedBath && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaHouseCircleCheck /></div>
                <div className="property-additional-features-label">Main Floor Full Bed Bath</div>
            </div>
        )}
        {features.rentalGarageSuite && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiHomeGarage /></div>
                <div className="property-additional-features-label">Rental Garage Suite</div>
            </div>
        )}
        {features.parkFacing && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><RiHome7Fill /></div>
                <div className="property-additional-features-label">Park Facing</div>
            </div>
        )}
        {features.legalFinishedBasement && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><IoShieldCheckmark /></div>
                <div className="property-additional-features-label">Legal Finished Basement</div>
            </div>
        )}
        {features.ownerSuiteBasement && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><GiExitDoor /></div>
                <div className="property-additional-features-label">Owner Suite Basement</div>
            </div>
        )}
        {/* {features.sevenBedsFiveBath && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><IoBedOutline /></div>
                <div className="property-additional-features-label">{features.sevenBedsFiveBath} Seven Beds Five Bath</div>
            </div>
        )} */}
        {features.airportNearby && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><MdAirplanemodeActive /></div>
                <div className="property-additional-features-label">Airport Nearby</div>
            </div>
        )}
        {features.playgroundSchoolsNearby && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><MdSchool /></div>
                <div className="property-additional-features-label">Playground Schools Nearby</div>
            </div>
        )}
        {features.golfNearby && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><MdGolfCourse /></div>
                <div className="property-additional-features-label">Golf Nearby</div>
            </div>
        )}
        {features.schoolNearby && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><MdSchool /></div>
                <div className="property-additional-features-label">School Nearby</div>
            </div>
        )}
        {features.walkout && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaDoorOpen /></div>
                <div className="property-additional-features-label">Walkout</div>
            </div>
        )}
        {features.partialWalkout && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaDoorOpen /></div>
                <div className="property-additional-features-label">Partial Walkout</div>
            </div>
        )}
        {features.regularLot && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaHome /></div>
                <div className="property-additional-features-label">Regular Lot</div>
            </div>
        )}
        {features.vaultedCeiling && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaChevronUp /></div>
                <div className="property-additional-features-label">Vaulted Ceiling</div>
            </div>
        )}
        {features.indentCeiling && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaChevronUp /></div>
                <div className="property-additional-features-label">Indents Ceiling</div>
            </div>
        )}
        {features.ceilingHighCabinets && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaHouseCircleCheck /></div>
                <div className="property-additional-features-label">Ceiling High Cabinets</div>
            </div>
        )}
        {features.dropCeilings && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaHouseCircleCheck /></div>
                <div className="property-additional-features-label">Drop Ceilings</div>
            </div>
        )}
        {features.carpetFloor && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FiCommand /></div>
                <div className="property-additional-features-label">Carpet Floor</div>
            </div>
        )}
        {features.tenFTceilings && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><TbRulerMeasure2 /></div>
                <div className="property-additional-features-label">10 ft Ceilings</div>
            </div>
        )}
        {features.twentyFTceilings && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><TbRulerMeasure2 /></div>
                <div className="property-additional-features-label">20 ft Ceilings</div>
            </div>
        )}
        {features.enSuites  && (
            <div className="property-additional-features-col">
                <div className="property-additional-features-icon"><FaBath /></div>
                <div className="property-additional-features-label">{features.enSuites} EnSuites</div>
            </div>
        )}
    </div>
  );
}