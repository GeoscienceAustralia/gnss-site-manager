import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Headers, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { User } from 'oidc-client';

import { AssociatedDocumentService } from './associated-document.service';
import { ConstantsService } from '../global/constants.service';
import { UserAuthService } from '../global/user-auth.service';

export function main() {
    describe('Associated Document Service', () => {
        let service: AssociatedDocumentService;
        const statusCreated = 201;
        const statusNoContent = 204;
        const documentName = 'document_to_upload.txt';
        const mockUserService = new (class MockUserService {
            userSettings: any = {id_token: '', session_state: '', access_token: '',
                                 refresh_token: '', token_type: '', scope: '',
                                 profile: null, expires_at: 0, state: {}};
            user: User = <User>this.userSettings;
        })();

        beforeAll(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                AssociatedDocumentService,
                ConstantsService,
                UserAuthService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: UserAuthService, useValue: mockUserService
                },
            ]);
            service = injector.get(AssociatedDocumentService);

            let backend = injector.get(MockBackend);
            let mockHeaders = new Headers({'location': 'http://localhost:1234/storage/' + documentName});
            let responses: Response[] = [
                new Response(new ResponseOptions({
                    headers: mockHeaders,
                    status: statusCreated
                })),
                new Response(new ResponseOptions({status: statusNoContent}))
            ];
            backend.connections.subscribe((connection: any) => {
                let response = responses.shift();
                connection.mockRespond(response);
            });
        });

        it('should upload a document to data storage', () => {
            let file = new File(['A dummy file for testing.'], documentName, {type: 'text/plain'});
            service.uploadDocument(documentName, file).subscribe((response: Response) => {
                expect(response.status).toBe(statusCreated);
                const location = response.headers.get('location');
                expect(location).toContain(documentName);
            });
        });

        it('should delete the uploaded document from data storage', () => {
            service.deleteDocument(documentName).subscribe((response: Response) => {
                expect(response.status).toBe(statusNoContent);
            });
        });
    });
}
