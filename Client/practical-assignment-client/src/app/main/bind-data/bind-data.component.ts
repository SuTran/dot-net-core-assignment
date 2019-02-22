import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LibraryService } from 'src/app/services/library.service';
import { Urls } from 'src/API/api';
import { Library } from 'src/app/models/libraryModel';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InputFile } from 'src/app/models/inputFileModel';
import { DocumentService } from 'src/app/services/document.service';
import { DocmentModel } from 'src/app/models/documentModel';


@Component({
  selector: 'app-bind-data',
  templateUrl: './bind-data.component.html',
  styleUrls: ['./bind-data.component.css'],
  providers: [LibraryService]
})
export class BindDataComponent implements OnInit {
  libraryOutput: [Library];
  documentOutput: [DocmentModel];
  libraryInput: Library;
  documentInput: InputFile;
  closeResult: string;

  fileToUpload: File;
  libraryId: string;
  constructor(
    private libraryService: LibraryService,
    private documentService: DocumentService,
    private modalService: NgbModal,
    public toastr: ToastrManager
  ) {
  }

  ngOnInit() {
    this.libraryInput = new Library();
    this.documentInput = new InputFile();
    this.fileToUpload = null;
    this.libraryId = '';
    this.getData();
  }
  // library
  getData = () => {
    this.libraryService.getDataList()
      .subscribe((res: { data: any }) => {
        this.libraryOutput = res.data;
      });
  }

  InsertData = (library: any) => {
    this.libraryService.insertData(library)
      .subscribe((res: any) => {
        if (res.status === true) {
          this.toastr.successToastr(res.message, 'Success!');
          this.libraryOutput.push(library);
        }
        console.log('res', res);

      });
  }

  Insert() {
    this.InsertData(this.libraryInput);
  }

  // modal
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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

  // document
  GetDocById = (libraryId: string) => {
    this.documentService.getDataById(libraryId)
      .subscribe((res: any) => {
        this.documentOutput = res.data;
      });
  }
  UploadFile = () => {
    this.documentInput.fileUrl = this.fileToUpload;
    this.documentInput.libraryId = this.libraryId;
    this.documentInput.description = this.documentInput.description;

    const formData: FormData = new FormData();
    formData.append('fileUrl', this.documentInput.fileUrl, this.documentInput.fileUrl.name);
    formData.append('libraryId', this.documentInput.libraryId);
    formData.append('description', this.documentInput.description);


    this.documentService.UploadFile(formData)
      .subscribe((res: any) => {

        if (res.status === true) {
          this.toastr.successToastr(res.message, 'Success!');
        } else {
          this.toastr.errorToastr(res.message, 'Fail');
        }
      });
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  handleId(id: string) {
    this.libraryId = id;
  }
}
