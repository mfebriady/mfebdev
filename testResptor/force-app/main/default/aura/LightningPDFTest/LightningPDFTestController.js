({
    
    downloadfile : function (component, event, helper){                 
        var id = event.target.getAttribute("data-id");       
        alert('Document ID:' +id);
        var actiondownload = component.get("c.DownloadAttachment");
        
        actiondownload.setParams({
            "DownloadAttachmentID": id
        });
        
        actiondownload.setCallback(this, function(b){
            omponent.set("v.Baseurl", b.getReturnValue());
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": b.getReturnValue()
            });
            urlEvent.fire();
            
            
        })
    }
})