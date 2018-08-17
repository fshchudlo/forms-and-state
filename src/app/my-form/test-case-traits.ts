import * as moment from 'moment';

export class TestCaseTraits {
    public readonly itineraryReceiptUploadBaseUrl: string;
    public readonly canBeEdited: boolean;
    public readonly downloadItineraryReceiptLink: string;
    public readonly isAwaitingApprovalAfterEdit: boolean;
    public readonly testCaseStatusClass: string;
    public readonly isApproveBtnHidden: boolean;
    public readonly isRejectBtnHidden: boolean;

    constructor(correlationId: string, testCaseState: Backend.TestCaseState, testSessionCompletedByAgency: boolean, canBeApprovedByCurrentUser: boolean) {
        this.itineraryReceiptUploadBaseUrl = `api/AWS01/request/${correlationId}/test-case/${testCaseState.id}/itinerary-receipt`;
        this.downloadItineraryReceiptLink = `${this.itineraryReceiptUploadBaseUrl}/${testCaseState.id}`;
        this.isAwaitingApprovalAfterEdit = (() => {
            if (!testCaseState.lastAgencyUpdateDate || !testSessionCompletedByAgency) {
                return false;
            }

            if (!testCaseState.approvalDate && !testCaseState.rejectionDate) {
                return true;
            }

            return (
                moment(testCaseState.approvalDate).isBefore(testCaseState.lastAgencyUpdateDate) ||
                moment(testCaseState.rejectionDate).isBefore(testCaseState.lastAgencyUpdateDate)
            );
        })();

        this.testCaseStatusClass = (() => {
            if (this.isAwaitingApprovalAfterEdit) {
                return 'test-case-status-awaiting-approval';
            }

            if (testCaseState.approvalDate) {
                return 'test-case-status-approved';
            }

            if (testCaseState.rejectionDate) {
                return 'test-case-status-rejected';
            }

            return null;
        })();

        this.isApproveBtnHidden = (() => {
            return !canBeApprovedByCurrentUser || (testCaseState.isApproved && !this.isAwaitingApprovalAfterEdit);
        })();
        this.isRejectBtnHidden = (() => !canBeApprovedByCurrentUser || (testCaseState.rejectionDate && !this.isAwaitingApprovalAfterEdit))();
        this.canBeEdited = !testCaseState.isApproved;
    }
}
