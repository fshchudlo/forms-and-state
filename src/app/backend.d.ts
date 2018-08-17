declare namespace Backend {
    export interface CityModel {
        id: string;
        iataCode: string;
        name: string;
    }
    export interface CountryModel {
        id: string;
        name: string;
        phoneCode: string;
    }
    export interface EditMyFormModel {
        /**
         * example:
         * 00000000-0000-0000-0000-000000000000
         */
        id: string; // uuid
        rowVersion: string; // byte
        text: string;
        technicalContactSettings: TechnicalContactModel;
        websiteDevelopersInfo: WebsiteDevelopersModel;
        saleTypeInfo: SaleTypeModel;
        website: WebsiteModel;
    }
    export interface LookupValue {
        readonly id: string;
        readonly text: string;
    }
    export interface MyFormState {
        readonly text: string;
        readonly testCases?: TestCaseState[];
        readonly technicalContactSettings: TechnicalContactState;
        readonly websiteDevelopersInfo: WebsiteDevelopersState;
        readonly saleTypeInfo: SaleTypeState;
        readonly website: WebsiteState;
        /**
         * example:
         * 00000000-0000-0000-0000-000000000000
         */
        readonly id: string; // uuid
        readonly number: string;
        readonly type: "Type one" | "Type one" | "Type three";
        readonly status: "NotSent" | "Sending" | "WorkflowInstanceRegistered" | "InProgress" | "Completed" | "CancellationRequested" | "CancelledByApplicant" | "RejectedByCarrier";
        readonly sentBy: string;
        readonly sentAt: string; // date-time
        readonly completedBy: string;
        readonly completedAt: string; // date-time
        readonly completionComment: string;
        readonly createdBy: string;
        readonly createdOn: string; // date-time
        rowVersion: string; // byte
    }
    export interface PhoneModel {
        country: CountryModel;
        number: string;
    }
    export interface SaleTypeModel {
        saleType: "Own" | "Subagent";
        subagentName: string;
        subagentOwnershipForm: string;
        subagentTin: string;
    }
    export interface SaleTypeState {
        readonly saleType: "Own" | "Subagent";
        readonly subagentName: string;
        readonly subagentOwnershipForm: string;
        readonly subagentTin: string;
    }
    export interface TechnicalContactModel {
        email: string;
        firstName: string;
        lastName: string;
        middleName: string;
        phone: PhoneModel;
        position: string;
        sex: "Male" | "Female";
    }
    export interface TechnicalContactState {
        readonly email: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly middleName: string;
        readonly phone: PhoneModel;
        readonly position: string;
        readonly sex: "Male" | "Female";
    }
    export interface TestCaseState {
        readonly id: number; // int64
        readonly orderNumber: number; // int32
        readonly isOtioTestCase: boolean;
        readonly testCaseType: "RoundTripWithTwoAdultsAndCustomPaymentFormVVL" | "VegetarianNutritionForOneAndEMDForAnotherPassenger" | "SeparationOfPassengerToDifferentPNR" | "SeparationOfPassengerWithRBDCodeAndRevalidation" | "AdultPlusChildPlusInfantWithAdditionalLuggageMVL" | "AdultPlusChildPlusInfantWithAdditionalLuggageMVLChildTicketReturn" | "AdultPlusChildPlusInfantWithAdditionalLuggageMVLAdultServiceClassUpgrade" | "AdultPlusChildPlusInfantEconomyClassSPATransfer" | "AdultPlusChildPlusInfantEconomyClassSPATransferChildAndInfantTicketReturn" | "OneAdultBusinessFlexTariffCodeShareMVL";
        readonly testCaseDescription: string;
        readonly allocatedBookingNumber: string;
        readonly allocatedTicketNumber: string;
        readonly allocatedEMDNumber: string;
        readonly additionalTicketNumber1: string;
        readonly additionalTicketNumber2: string;
        readonly additionalTicketNumber3: string;
        readonly additionalTicket1SeatNumber: string;
        readonly additionalTicket2SeatNumber: string;
        readonly additionalTicket3SeatNumber: string;
        readonly isApproved: boolean;
        readonly approvalDate: string; // date-time
        readonly rejectionDate: string; // date-time
        readonly lastAgencyUpdateDate: string; // date-time
        readonly hasItineraryReceipt: boolean;
        readonly rowVersion: string; // byte
    }
    export interface WebsiteDevelopersModel {
        developersName: string;
        developmentType: "Own" | "Outsourcing";
    }
    export interface WebsiteDevelopersState {
        readonly developersName: string;
        readonly developmentType: "Own" | "Outsourcing";
    }
    export interface WebsiteModel {
        siteUrl: string;
        siteAudience: "Tourists" | "Customers" | "Subagents";
        bindedCity: CityModel;
        websiteRequiresRegistrationForTesting: boolean;
        testUserLogin: string;
        testUserPassword: string;
    }
    export interface WebsiteState {
        readonly siteUrl: string;
        readonly siteAudience: "Tourists" | "Customers" | "Subagents";
        readonly bindedCity: CityModel;
        readonly websiteRequiresRegistrationForTesting: boolean;
        readonly testUserLogin: string;
        readonly testUserPassword: string;
    }
}
