import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PR1 } from 'src/app/_models/Issuances/PR1Model';
import { PR1Service } from 'src/app/_services/PR1/pr1-service';

@Component({
  selector: 'app-pr1',
  templateUrl: './pr1.component.html',
  styleUrls: ['./pr1.component.css']
})
export class PR1Component implements OnInit {

  PRlist: any[] = [];

  PRBasicfromLocal!: FormGroup;
  PRBasicFromForeign!: FormGroup;
  PRDefinationfrom!: FormGroup;



  ItemArray: any[] = [];

  Uints = [
    { value: '1', label: '1 Quart bottle of PMFL (750ml)', measure: 750 },
    { value: '2', label: '2 Pints of PMFL(375ml Each)', measure: 375 },
    { value: '3', label: '4 Nips of PMFL(187.5ml each', measure: 187.5 },
    { value: '4', label: '20 Beer Cans/Bottles(500ml each can)', measure: 500 }
  ];
  Size = [
    { value: '1', label: 'Quart (750 ml) PMFL' },
    { value: '2', label: 'Pint (375 ml PMFL)' },
    { value: '3', label: 'Nip (187 ml)' },
    { value: '4', label: 'Beer (500 ml)' },
  ];
  Country = [
    { value: '1', label: 'China' },
    { value: '2', label: 'USA' },
    { value: '3', label: 'Dubai' },
  ];
  selectedOption = '1';
  MeasureQuantity: number | undefined;
  ExactNo: number = 0;
  TypeValue: string | undefined;
  SizeValue: string | undefined;
  ShowForeign: boolean | undefined;

  selectedDate: Date | undefined;
  date: any;
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private pr1Services: PR1Service,
    private toastrService: ToastrService,

  ) { }




  ngOnInit(): void {



    debugger
    this.PRBasicfromLocal = this.fb.group({
      Id: [''],
      OldPermit: new FormControl(''),
      Profession: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required]),
      FatherName: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      CNIC: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      City: new FormControl('', [Validators.required]),
    });

    this.PRBasicFromForeign = this.fb.group({
      Id: [''],
      OldPermit: new FormControl(''),
      Profession: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required]),
      FatherName: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Pasportno: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      Nationality: new FormControl('', [Validators.required]),
      VisaExpiaryDate: new FormControl('', [Validators.required]),

    });
    this.PRDefinationfrom = this.fb.group({
      Id: [''],
      Type: [''],
      Size: [''],
      Quantity: [''],
    });


    this.OnCheckChange(1);
    this.GetPermitApplicationList();
  }
  get TypeControl() {
    return this.PRBasicfromLocal.controls;
  }

  get TypeControlForeign() {
    return this.PRBasicFromForeign.controls;
  }


  OnCheckChange(event: number) {
    if (event === 1) {
      this.ShowForeign = false;
    }
    else {
      this.ShowForeign = true;

    }

  }



  searchCnic() {

    var aaaa = this.PRlist;
    let CNIC = this.PRBasicfromLocal.get('CNIC')?.value;

    debugger
    if (CNIC! + null && CNIC.trim() != "") {
      if (aaaa.filter(a => a.cnic === CNIC).length > 0) {

        this.toastrService.error("CNIC or Passport Number already exist!");
        this.PRBasicfromLocal.reset();
        this.PRBasicFromForeign.reset();

      }
      else {
        // this.PRBasicFromForeign.reset();
        // this.PRDefinationfrom.get('CNIC')?.setValue(0); 
        // this.POSform.get('qtyBox')?.setValue(newVal);



      }
    }
  }


  GetPermitApplicationList() {
    this.pr1Services.PRList().subscribe(
      res => {
        // this.PRlist= [];
        var Records = res.data;
        debugger
        for (let index = 0; index < Records.length; index++) {
          this.PRlist.push({

            applicationId: Records[index].applicationId,
            personName: Records[index].personName,
            cnic: Records[index].cnic,
            cellNo: Records[index].cellNo,
            address: Records[index].address,
            city: Records[index].city,
            dateofBirth: Records[index].dateofBirth,
            oldPermitNo: Records[index].oldPermitNo,
          })
        }



        // if (res.status == '0') {
        //   this.spinner.hide();
        // }
        // else {
        //   this.spinner.hide();
        // }
      });
  }

  keyPressbyNumber19Only(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyPressNumberOnly(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyPressAlfhabetsOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }



  keyPressAlfhabetnumericOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9 ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  GetMeasure() {
    let Type = this.PRDefinationfrom.get('Type')?.value;
    this.MeasureQuantity = this.Uints.find(a => a.value == Type)?.measure;
    this.TypeValue = this.Uints.find(a => a.value == Type)?.label;
    this.SizeValue = this.Size.find(a => a.value == Type)?.label;
    if (this.MeasureQuantity == undefined) {
      console.log('Please select Type')
    }
    else {
      this.ExactNo = 0;
      this.ExactNo = this.MeasureQuantity;
    }
  }



  ADDITEM() {
    let Type = this.PRDefinationfrom.get('Type')?.value;
    let Size = this.PRDefinationfrom.get('Size')?.value;
    let Quantity = this.PRDefinationfrom.get('Quantity')?.value;
    this.ItemArray.push({
      Type: this.TypeValue,
      Size: this.SizeValue,
      TypeId: Type,
      SizeId: Size,
      Quantity: Quantity,
      Total: (this.ExactNo * Quantity),
    })
  }



  dateChanged(newDate: any) {
    const today = new Date();
    this.date = this.PRBasicfromLocal.get('DOB')?.value;
    if (this.date == "") {
      this.date = this.PRBasicFromForeign.get('DOB')?.value;
    }
    const birthdateAsDate = new Date(this.date);
    const age = today.getFullYear() - birthdateAsDate.getFullYear();
    if (age < 21) {
      this.toastrService.error("Below the age of 21 years is not accepted");
      this.PRBasicfromLocal.get('DOB')?.setValue("");
      this.PRBasicFromForeign.get('DOB')?.setValue("");
    } else {
      // this.toastrService.success("Age is not greater than 21");
    }
  }

  Save() {


    this.spinner.show();
    if (this.ShowForeign == true) {
      if (!this.PRBasicFromForeign.valid) {
        this.spinner.hide();
        this.PRBasicFromForeign.markAllAsTouched();
        return;
      }
      let oldPermit = this.PRBasicFromForeign.get('OldPermit')?.value == '' ? 0 : this.PRBasicFromForeign.get('OldPermit')?.value;
      let Name = this.PRBasicFromForeign.get('Name')?.value;

      let FatherName = this.PRBasicFromForeign.get('FatherName')?.value;
      let Phone = this.PRBasicFromForeign.get('Phone')?.value;
      let Address = this.PRBasicFromForeign.get('Address')?.value;
      let DOB = this.PRBasicFromForeign.get('DOB')?.value;
      let Profession = this.PRBasicFromForeign.get('Profession')?.value;
      let Pasportno = this.PRBasicFromForeign.get('Pasportno')?.value;
      let Country = this.PRBasicFromForeign.get('Country')?.value;
      let Nationality = this.PRBasicFromForeign.get('Nationality')?.value;
      let VisaExpiaryDate = this.PRBasicFromForeign.get('VisaExpiaryDate')?.value;
      let pr1 = new PR1();
      pr1.oldPermitNo = oldPermit;
      pr1.personName = Name;
      pr1.fatherHusbandName = FatherName;
      pr1.cnic = "";
      pr1.cellNo = Phone;
      pr1.address = Address;
      pr1.city = "";
      pr1.dateofBirth = DOB;
      pr1.permitTypeId=4;
      // pr1.Profession = Profession;
      pr1.passportNo = Pasportno;
      pr1.countryId = Country;
      pr1.nationality = Nationality;
      pr1.visaExpiryDate = VisaExpiaryDate;

      this.pr1Services.PR1BasicInfo(pr1).subscribe(
        res => {
          debugger
          if (res.status == '0') {
            this.spinner.hide();
            this.toastrService.success("Your Application ID: " + res.data.applicationId + "", res.message);
            this.PRBasicFromForeign.reset();
          }
          else {
            this.spinner.hide();
            this.toastrService.error(res.message, 'Error!');
            this.PRBasicFromForeign.reset();
            // this.toastrService.error(res.message, 'Error!');
          }
        });
    }
    else {
      if (!this.PRBasicfromLocal.valid) {
        this.spinner.hide();
        this.PRBasicfromLocal.markAllAsTouched();
        return;
      }


      let oldPermit = this.PRBasicfromLocal.get('OldPermit')?.value == '' ? 0 : this.PRBasicfromLocal.get('OldPermit')?.value;
      let Name = this.PRBasicfromLocal.get('Name')?.value;
      let FatherName = this.PRBasicfromLocal.get('FatherName')?.value;
      let CNIC = this.PRBasicfromLocal.get('CNIC')?.value;
      let Phone = this.PRBasicfromLocal.get('Phone')?.value;
      let Address = this.PRBasicfromLocal.get('Address')?.value;
      let City = this.PRBasicfromLocal.get('City')?.value;
      let DOB = this.PRBasicfromLocal.get('DOB')?.value;
      let Profession = this.PRBasicfromLocal.get('Profession')?.value;
      let pr1 = new PR1();
      pr1.oldPermitNo = oldPermit;
      pr1.personName = Name;
      pr1.fatherHusbandName = FatherName;
      pr1.cnic = CNIC;
      pr1.cellNo = Phone;
      pr1.address = Address;
      pr1.city = City;
      pr1.dateofBirth = DOB;
      // pr1.Profession = Profession;
      pr1.passportNo = 0;
      pr1.countryId = 0;
      pr1.permitTypeId=3;
      pr1.nationality = null;
      pr1.visaExpiryDate = "2000-01-01";
      debugger
      this.pr1Services.PR1BasicInfo(pr1).subscribe(
        res => {
          debugger
          if (res.status == '0') {
            this.spinner.hide();
            this.toastrService.success("Your Application ID: " + res.data.applicationId + "", res.message);
            this.PRBasicfromLocal.reset();


          }
          else {
            this.spinner.hide();
            this.toastrService.error(res.message, 'Error!');
            this.PRBasicfromLocal.reset();

          }
        });
    }


  }

}
