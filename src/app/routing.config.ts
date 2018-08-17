// tslint:disable:typedef variable-name
export class RoutingConfig {
    public static readonly PathMatch: { readonly Full: string; readonly Prefix: string } = {
        Full: 'full', // segments of the URL match
        Prefix: 'prefix' // the remaining URL begins with the route's prefix path
    };
    public static readonly MyForm: { readonly Base: string; readonly New: string; readonly View: string } = {
        Base: 'my-form',
        New: 'new',
        View: ':id'
    };
}
// tslint:enable:typedef variable-name
