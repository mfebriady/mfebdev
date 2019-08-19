public class ContactSearch{
    public static List<Contact> searchForContacts(String s,String sh){
        return [select LastName,MailingPostalCode from Contact order by LastName,MailingPostalCode desc];
    }
}