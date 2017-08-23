import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';

@Component({
    moduleId: module.id,
    selector: 'sd-user-registration',
    templateUrl: 'user-registration.component.html',
})
export class UserRegistrationComponent implements OnDestroy {

    userRegistrationForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        organisation: [''],
        position: [''],
        email: [''],
        phone: [''],
        remarks: ['', [Validators.required, Validators.maxLength(10000)]]
    });

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private location: Location,
        private formBuilder: FormBuilder,
        private userService: UserAuthService,
        private dialogs: DialogService,
    ) {}

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public cancel() {
        this.location.back();
    }

    public submit() {
        console.log(this.userRegistrationForm.getRawValue());
        this.userService.requestNewUser(this.userRegistrationForm.getRawValue())
            .takeUntil(this.unsubscribe)
            .subscribe(() =>
                this.dialogs.showNotificationDialog(
                    `Thank you for registering. You will be contacted by a member from the GNSS Operations
                    Team at Geoscience Australia regarding your login details.`,
                    () => window.location.assign('/')
                )
            );

    }

    public isFormInvalid(): boolean {
        return this.userRegistrationForm.invalid;
    }
}
