import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { CubeBuilderService } from "app/services/cube-builder";
import { Store } from "@ngrx/store";
import { token, showLoading, closeLoading, setURLCubeBuilder } from "app/app.action";
import { MatSnackBar } from "@angular/material/snack-bar";
import { setCubeBuilderVersion } from "../helpers/cube";

export interface ITokenModelData {
    showCloseBtn?: boolean
}

@Component({
    selector: 'token-modal',
    templateUrl: 'token.component.html',
    styleUrls: ['./token.component.scss']
})
export class TokenModal {

    public urlService: string = ''
    public token: string = ''
    public showCloseButton: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<TokenModal>,
        private store: Store,
        private snackBar: MatSnackBar,
        private cbs: CubeBuilderService,
        @Inject(MAT_DIALOG_DATA) public data: ITokenModelData) {
            const { showCloseBtn } = data
            if (showCloseBtn !== undefined && showCloseBtn !== null)
                this.showCloseButton = showCloseBtn;
        }

    async verify() {
        if (!this.urlService) {
            this.snackBar.open('Missing URL service!', '', { duration: 4000, verticalPosition: 'top', panelClass: 'app_snack-bar-error' });
            return;
        }

        try {
            this.store.dispatch(showLoading())
            const resp = await this.cbs.verifyToken(this.urlService, this.token)
            this.store.dispatch(token({ token: this.token }))
            this.store.dispatch(setURLCubeBuilder({ url: this.urlService }))

            setCubeBuilderVersion(resp.version);
            window.location.reload();
            this.dialogRef.close()

        } catch (_) {
            this.snackBar.open('Invalid Token!', '', {
                duration: 4000,
                verticalPosition: 'top',
                panelClass: 'app_snack-bar-error'
            });

        } finally {
            this.store.dispatch(closeLoading())
        }
    }

    close() {
        this.dialogRef.close()
    }
}