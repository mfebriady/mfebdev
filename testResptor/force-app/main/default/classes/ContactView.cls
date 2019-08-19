public with sharing class ContactView {
    @AuraEnabled(cacheable=true)
    public static list <Contact> fetchContact(string searchKey){
        String key = '%' + searchKey + '%';
        List <Contact> lstCon = [
                                SELECT Id, Name, Title, Phone, Email 
                                FROM Contact
                               WHERE Name like: searchKey
                                ];
        return lstCon;
    }

}