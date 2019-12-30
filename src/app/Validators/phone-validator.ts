import { AbstractControl } from '@angular/forms';

export function phoneValidation(control : AbstractControl) : { [key : string] : boolean} | null{
    let phone_reg = new RegExp('^[0-9]{8,12}$');
    if(!phone_reg.test(control.value)){
        return {'phoneValid':true};
    }
    return null;
} 