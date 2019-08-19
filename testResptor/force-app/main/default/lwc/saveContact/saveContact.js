/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
//import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import LAST_FIELD from '@salesforce/schema/Contact.LastName';
import HOME_FIELD from '@salesforce/schema/Contact.HomePhone';
import CreateCon from '@salesforce/apex/CreateContact.CreateCon';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SaveContact extends LightningElement {
    @track Fname = FNAME_FIELD;
    @track phone = PHONE_FIELD;
    @track Lname = LAST_FIELD;
    @track hPhone = HOME_FIELD;

        rec = {
            FirstName : this.Fname,
            Phone : this.phone,
            LastName : this.Lname,
            HomePhone : this.hPhone 
        }
    
    inputphone(event){
        this.rec.Phone = event.target.value;
    }

    inputFName(event){
        this.rec.FirstName = event.target.value;
    }

    inputHphone(event){
        this.rec.HomePhone = event.target.value;
    }

    inputLName(event){
        this.rec.LastName = event.target.value;
    }

    SaveData() {
        CreateCon({ con : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.FName = '';
                    this.rec.Phone = '';
                    this.rec.LastName = '';
                    this.rec.HomePhone = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Contact created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }

}