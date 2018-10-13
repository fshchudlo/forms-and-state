declare namespace Backend {
    export interface NestedItemModel {
        id: string;
        name: string;
    }
    export interface NestedItemState {
        readonly id: string;
        readonly name: string;
        readonly createdOn: string; // date-time
        readonly modifiedOn: string; // date-time
        readonly createdBy: string;
        readonly modifiedBy: string;
    }
    export interface SomeEntityModel {
        id: string;
        name: string;
        comment: string;
        urgency: "Low" | "Normal" | "High";
        nestedItems: NestedItemModel[];
    }
    export interface SomeEntityState {
        readonly id: string;
        readonly name: string;
        readonly comment: string;
        urgency: "Low" | "Normal" | "High";
        readonly status: "NotSent" | "Sending" | "Registered" | "InProgress" | "Completed" | "CancellationRequested" | "CancelledByApplicant" | "Rejected";
        readonly nestedItems: NestedItemState[];
        readonly createdOn: string; // date-time
        readonly createdBy: string;
        readonly modifiedOn: string; // date-time
        readonly modifiedBy: string;
    }
}
