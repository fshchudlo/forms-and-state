import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

function mapStateToEditModel(form: FormGroup): Backend.EditMyFormModel {
    return {
        id: form.value.id,
        rowVersion: form.value.rowVersion,
        saleTypeInfo: form.value.saleTypeInfo,
        technicalContactSettings: form.value.technicalContactSettings,
        text: form.value.text,
        website: form.value.website,
        websiteDevelopersInfo: form.value.websiteDevelopersInfo
    };
}

@Injectable()
export class MyFormService {
    constructor(private http: HttpClient) {}
    public getEmptyState(): Observable<Backend.MyFormState> {
        const state: Backend.MyFormState = {
            completedAt: null,
            completedBy: null,
            completionComment: null,
            createdBy: null,
            createdOn: null,
            id: null,
            number: null,
            rowVersion: null,
            saleTypeInfo: {
                saleType: 'Own',
                subagentName: null,
                subagentOwnershipForm: null,
                subagentTin: null
            },
            sentAt: null,
            sentBy: null,
            status: 'NotSent',
            technicalContactSettings: {
                email: '',
                firstName: '',
                lastName: '',
                middleName: '',
                phone: { country: null, number: null },
                position: null,
                sex: null
            },
            text: null,
            type: 'Type one',
            website: {
                bindedCity: null,
                siteAudience: null,
                siteUrl: null,
                testUserLogin: null,
                testUserPassword: null,
                websiteRequiresRegistrationForTesting: false
            },
            websiteDevelopersInfo: {
                developersName: null,
                developmentType: 'Own'
            }
        };
        return of(state);
    }

    public get(_: string): Observable<Backend.MyFormState> {
        throw new Error('Not implemented');
    }

    public post(form: FormGroup): Observable<string> {
        const editModel = mapStateToEditModel(form);
        return this.http.post<string>('/', editModel);
    }

    public put(form: FormGroup): Observable<string> {
        const editModel = mapStateToEditModel(form);
        return this.http.put<string>('/', editModel);
    }
}
