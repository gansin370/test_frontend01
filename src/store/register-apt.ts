import { Address } from "@/components/register-apt/EnterAddress";
import { ExtraInfoSelectOption } from "@/components/register-apt/EnterExtraInfoView";
import { Facility } from "@/components/register-apt/EnterFacility";
import { TransactionType } from "@/components/register-apt/EnterTransactionTypeView";
import { AptSellerType } from "@/components/register-apt/SelectAptSellerTypeView";
import { Direction } from "@/components/register-apt/SelectRoomDirectionView";
import { Structure } from "@/components/register-apt/SelectRoomStructureView";
import { Video } from "@/components/register-apt/SelectVideoView";
import { create } from "zustand";

const initialState = {
  aptSellerType: null,
  roomSize: null,
  bay: 1,
  structure: null,
  roomCount: 1,
  bathroomCount: 1,
  totalFloor: null,
  floor: null,
  addressInfo: null,
  locationSummary: null,
  transactionType: null,
  tradingPrice: null,
  jeonseDeposit: null,
  monthlyRent: null,
  monthlyDeposit: null,
  monthlyRentDepositAdjustable: false,
  depositAdjustableDescription: null,
  roomImages: null,
  floorPlanImages: null,
  viewImages: null,
  video: null,
  roomDirection: null,
  loanAvailable: ExtraInfoSelectOption.AVAILABLE,
  petAvailable: ExtraInfoSelectOption.AVAILABLE,
  parkingAvailable: ExtraInfoSelectOption.AVAILABLE,
  availableMoveInDate: new Date(),
  facility: null,
  advantage: null,
};

type RegisterAptStore = {
  aptSellerType: AptSellerType | null;
  setAptSellerType: (aptSellerType: AptSellerType) => void;
  roomSize: number | null;
  setRoomSize: (roomSize: number | null) => void;
  bay: number;
  setBay: (bay: number) => void;
  structure: Structure | null;
  setStructure: (structure: Structure) => void;
  roomCount: number;
  setRoomCount: (roomCount: number) => void;
  bathroomCount: number;
  setBathroomCount: (bathroomCount: number) => void;
  totalFloor: number | null;
  setTotalFloor: (totalFloor: number | null) => void;
  floor: number | null;
  setFloor: (floor: number | null) => void;
  addressInfo: Address | null;
  setAddressInfo: (addressInfo: Address | null) => void;
  locationSummary: string | null;
  setLocationSummary: (locationSummary: string | null) => void;
  transactionType: TransactionType[] | null;
  setTransactionType: (transactionType: TransactionType[]) => void;
  tradingPrice: number | null;
  setTradingPrice: (tradingPrice: number | null) => void;
  jeonseDeposit: number | null;
  setJeonseDeposit: (jeonseDeposit: number | null) => void;
  monthlyRent: number | null;
  setMonthlyRent: (monthlyRent: number | null) => void;
  monthlyDeposit: number | null;
  setMonthlyDeposit: (monthlyDeposit: number | null) => void;
  monthlyRentDepositAdjustable: boolean;
  setMonthlyRentDepositAdjustable: (
    monthlyRentDepositAdjustable: boolean
  ) => void;
  depositAdjustableDescription: string | null;
  setDepositAdjustableDescription: (
    depositAdjustableDescription: string | null
  ) => void;
  roomImages: File[] | null;
  setRoomImages: (roomImages: File[] | null) => void;
  floorPlanImages: File[] | null;
  setFloorPlanImages: (floorPlanImages: File[] | null) => void;
  viewImages: File[] | null;
  setViewImages: (viewImages: File[] | null) => void;
  video: Video | null;
  setVideo: (video: Video | null) => void;
  roomDirection: Direction | null;
  setRoomDirection: (roomDirection: Direction | null) => void;
  loanAvailable: ExtraInfoSelectOption;
  setLoanAvailable: (loanAvailable: ExtraInfoSelectOption) => void;
  petAvailable: ExtraInfoSelectOption;
  setPetAvailable: (petAvailable: ExtraInfoSelectOption) => void;
  parkingAvailable: ExtraInfoSelectOption;
  setParkingAvailable: (parkingAvailable: ExtraInfoSelectOption) => void;
  availableMoveInDate: Date;
  setAvailableMoveInDate: (availableMoveInDate: Date) => void;
  facility: Facility[] | null;
  setFacility: (facility: Facility[] | null) => void;
  advantage: string[] | null;
  setAdvantage: (advantage: string[] | null) => void;
  clearStore: () => void;
};

export const useRegisterAptStore = create<RegisterAptStore>((set) => ({
  ...initialState,
  setAptSellerType: (aptSellerType) => set({ aptSellerType }),
  setRoomSize: (roomSize) => set({ roomSize }),
  setBay: (bay) => set({ bay }),
  setStructure: (structure) => set({ structure }),
  setRoomCount: (roomCount) => set({ roomCount }),
  setBathroomCount: (bathroomCount) => set({ bathroomCount }),
  setTotalFloor: (totalFloor) => set({ totalFloor }),
  setFloor: (floor) => set({ floor }),
  setAddressInfo: (addressInfo) => set({ addressInfo }),
  setLocationSummary: (locationSummary) => set({ locationSummary }),
  setTransactionType: (transactionType) => set({ transactionType }),
  setTradingPrice: (tradingPrice) => set({ tradingPrice }),
  setJeonseDeposit: (jeonseDeposit) => set({ jeonseDeposit }),
  setMonthlyRent: (monthlyRent) => set({ monthlyRent }),
  setMonthlyDeposit: (monthlyDeposit) => set({ monthlyDeposit }),
  setMonthlyRentDepositAdjustable: (monthlyRentDepositAdjustable) =>
    set({ monthlyRentDepositAdjustable }),
  setDepositAdjustableDescription: (depositAdjustableDescription) =>
    set({ depositAdjustableDescription }),
  setRoomImages: (roomImages) => set({ roomImages }),
  setFloorPlanImages: (floorPlanImages) => set({ floorPlanImages }),
  setViewImages: (viewImages) => set({ viewImages }),
  setVideo: (video) => set({ video }),
  setRoomDirection: (roomDirection) => set({ roomDirection }),
  setLoanAvailable: (loanAvailable) => set({ loanAvailable }),
  setPetAvailable: (petAvailable) => set({ petAvailable }),
  setParkingAvailable: (parkingAvailable) => set({ parkingAvailable }),
  setAvailableMoveInDate: (availableMoveInDate) => set({ availableMoveInDate }),
  setFacility: (facility) => set({ facility }),
  setAdvantage: (advantage) => set({ advantage }),
  clearStore: () => set({ ...initialState }),
}));
