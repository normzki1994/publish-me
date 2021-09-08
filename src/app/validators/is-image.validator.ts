import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isImageValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // if(!control.value) {
        //     return { noFile: { value: control.value } };
        // }

        const validImageType = ["image/jpg", "image/jpeg", "image/png"];
        if(validImageType.includes(control.value.type)) {
            return null;
        }

        return { invalidFileType: { value: control.value.type } };
        // return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
}