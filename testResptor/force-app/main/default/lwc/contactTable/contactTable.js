/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import fetchContact from '@salesforce/apex/ContactView.fetchContact';

export default class ContactTable extends LightningElement {
    @track myColumns =[
    {label: 'Contact Name', 
     fieldName: 'Name', 
     type: 'text',
     sortable: true},

    {label: 'Title', 
     fieldName: 'Title', 
     type: 'text',
     sortable: true},

    {label: 'Phone', 
     fieldName: 'Phone', 
     type: 'Phone',
     sortable: true},

    {label: 'Email ',
     fieldName: 'Email',
     type: 'email',
     sortable: true}
    ];

    @track searchKey ='';
    @track contactvisible = false;
    showdata(){
        const searchKey = this.searchKey;
        //Invoke using ApexImperativeMethod approach
        fetchContact({ searchKey })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.errors = error;
                this.contacts = undefined;
            });
        this.contactvisible = false;
        this.contactvisible = true;
    }

    handleKeyChange(event){
        this.searchKey = event.target.value;
    }

    handleLoad() {      
        
    }

    @track openPopup = false;
    openNew(){
        this.openPopup = true;
    }
    closeModal(){
        this.openPopup = false;
    }

    handleKeyUp(event) {
        console.log('>> handleKeyUp()');
        const isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            this.searchKey = event.target.value;
        }
    }
    
    @track error;
    @track contacts;
    @wire(fetchContact)
    OptyWired({
        error,
        data
    }){
        if(data){
            this.contacts = data;
            console.log(data);
            console.log(JSON.stringify(data, null, '\t'));
        }else if (error){
            this.error = error;
        }
    }
}