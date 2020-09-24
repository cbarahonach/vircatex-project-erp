import { MatProgressButtonOptions } from 'mat-progress-buttons';

export class ButtonHelper {

    public getSpinnerButton(text: string, icon: string = 'verified_user'): MatProgressButtonOptions {
        return {
            active: false,
            disabled: true,
            text: text,
            spinnerSize: 18,
            raised: true,
            stroked: false,
            buttonColor: 'primary',
            spinnerColor: 'accent',
            fullWidth: false,
            mode: 'indeterminate',
            buttonIcon: {
                fontIcon: icon
            }
        }
    }
}