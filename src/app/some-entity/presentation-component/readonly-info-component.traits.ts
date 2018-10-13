export class ReadonlyInfoComponentTraits {
    public readonly displayGenericInfo: boolean;
    public readonly displayModifiedInfo: boolean;
    constructor(entityState: Backend.SomeEntityState) {
        this.displayGenericInfo = !!entityState.id;
        this.displayModifiedInfo = !!entityState.modifiedBy;
    }
}
