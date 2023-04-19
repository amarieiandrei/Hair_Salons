import { Component, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  public modalRef?: BsModalRef;

  constructor(private _modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  public onSubmit = (values: any): void => {
    console.log(values);
  };
}
