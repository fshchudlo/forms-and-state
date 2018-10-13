import { MonoTypeOperatorFunction, Observable, pipe } from "rxjs";
import { filter, first, pluck, switchMap } from "rxjs/operators";
export const pluckIf = (...properties: string[]) =>
    pipe(
        pluck(...properties),
        filter(result => !!result)
    );

export const pluckIfNot = (...properties: string[]) =>
    pipe(
        pluck(...properties),
        filter(result => !result)
    );

export function switchIfNotEmpty<T>(
    parameterName: string,
    action: (param: string) => Observable<T>
): MonoTypeOperatorFunction<T> {
    return pipe(
        pluckIf(parameterName),
        switchMap(action),
        first()
    );
}

export function switchIfEmpty<T>(
    parameterName: string,
    action: () => Observable<T>
): MonoTypeOperatorFunction<T> {
    return pipe(
        pluckIfNot(parameterName),
        switchMap(action),
        first()
    );
}
