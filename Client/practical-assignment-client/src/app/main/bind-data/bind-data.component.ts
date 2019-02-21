import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LibraryService } from 'src/app/services/library.service';
import { Urls } from 'src/API/api';
import { Library } from 'src/app/models/libraryModel';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-bind-data',
  templateUrl: './bind-data.component.html',
  styleUrls: ['./bind-data.component.css'],
  providers: [LibraryService]
})
export class BindDataComponent implements OnInit {

  libraryOutput: [Library];
  libraryInput: Library;
  closeResult: string;
  constructor(
    private libraryService: LibraryService,
    private modalService: NgbModal,
    public toastr: ToastrManager
  ) {
  }

  ngOnInit() {
    this.libraryInput = new Library();
    this.getDate();
  }

  getDate = () => {
    this.libraryService.getDataList()
      .subscribe((res: { data: any }) => {
        this.libraryOutput = res.data;
      });
  }

  insertData = (library: any) => {
    this.libraryService.insertData(library)
      .subscribe((res: any) => {
        if (res.status === true) {
         this.toastr.successToastr(res.message, 'Success!');
          this.libraryOutput.push(library);
        }
        console.log('res', res);

      });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  callAPI() {
    this.insertData(this.libraryInput);
  }

}
