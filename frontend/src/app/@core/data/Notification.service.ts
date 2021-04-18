import { Injectable } from "@angular/core";
import { ToasterService } from "angular2-toaster";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private toastr: ToasterService) {}

  //   showSuccess(message, title) {
  //     this.toastr.success(message, title);
  //   }

  //   showError(message, title) {
  //     this.toastr.error(message, title);
  //   }

  //   showInfo(message, title) {
  //     this.toastr.;
  //   }

  //   showWarning(message, title) {
  //     this.toastr.warning(message, title);
  //   }
}
