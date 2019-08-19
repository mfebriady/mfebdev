public with sharing class CreateContact {
    @AuraEnabled
    public static Contact CreateCon(Contact con) {
        insert con;
        return con;
    }
}