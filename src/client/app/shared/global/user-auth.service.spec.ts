import {UserAuthService, IdToken} from './user-auth.service';
import {ConstantsService} from './constants.service';

export function main() {
    let userAuthService: UserAuthService;
    let url: string = 'http://localhost:5555/login#scope=openid%20profile&id_token=' +
        'eyAidHlwIjogIkpXVCIsICJhbGciOiAiSFMyNTYiIH0.eyAic3ViIjogInVzZXIxIiwgImF1ZGl0VHJhY2tpbmdJZCI6ICJjMGFmYzIyMS0' +
        'wOGM1LTRjZTUtOWRkNC0zMjkyNTM0ZDgzMmUtNzMyIiwgImlzcyI6ICJodHRwOi8vbG9jYWxob3N0OjgwODMvb3BlbmFtL29hdXRoMiIsICJ0b2tlbk5hbWUiOiAiaW' +
        'RfdG9rZW4iLCAiZ3JvdXBzIjogImNuPWFkZTEsb3U9Z3JvdXBzLGRjPW9wZW5hbSxkYz1mb3JnZXJvY2ssZGM9b3JnIiwgImdpdmVuX25hbWUiOiAiT25lIiwgIm5vb' +
        'mNlIjogIjEyMzQiLCAiYXVkIjogIkdOU1NTaXRlTWFuYWdlciIsICJvcmcuZm9yZ2Vyb2NrLm9wZW5pZGNvbm5lY3Qub3BzIjogIjAxOWY0MzgzLThlODQtNDhlMy04' +
        'OWZjLTY1OGI3YTk1ZTM4OSIsICJhenAiOiAiR05TU1NpdGVNYW5hZ2VyIiwgImF1dGhfdGltZSI6IDE0ODU5MjE4ODIsICJuYW1lIjogIlVzZXIgT25lIiwgInJlYWx' +
        'tIjogIi8iLCAiZXhwIjogMTQ4NTkyNTU0NywgInRva2VuVHlwZSI6ICJKV1RUb2tlbiIsICJpYXQiOiAxNDg1OTIxOTQ3LCAiZmFtaWx5X25hbWUiOiAiVXNlciIgfQ' +
        '.ZUE1PYDeJ4Gl1zAIruNQ_L5pkHG_KwJ5xfTej6ZCwQg';
    fdescribe('Test User Auth Service ...', () => {

        beforeEach(() => {
            const fakeConstantsService = {};
            userAuthService = new UserAuthService(fakeConstantsService as ConstantsService);
        });

        it('should be defined', () => {
            expect(userAuthService).not.toBeUndefined();
        });

        it('should return a token object', () => {
            userAuthService.extractAuthDetails(url);
            let extract: IdToken = userAuthService.getIDToken();
            expect(extract).toBeDefined();
            console.log(extract);
            expect(extract.firstName).toEqual('One');
            expect(extract.surname).toEqual('User');
        });
    });
}

