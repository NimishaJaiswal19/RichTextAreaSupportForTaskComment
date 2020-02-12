public with sharing class EditTaskCommentController {
    /**  
	@Description fetch rich text task comment.
	@author Nimisha Jaiswal
	@date 17/07/2019
	*/
	@AuraEnabled
    public static Task_Comment__c fetchTaskComment(String taskID) {
        
        List<Task_Comment__c> lstTaskComment = new List<Task_Comment__c>();
		lstTaskComment = [SELECT Id, Comment__c, Task_Id__c
								 FROM Task_Comment__c
								 WHERE Task_Id__c =: taskID];
		
		if(!lstTaskComment.isEmpty()) {
			
			return lstTaskComment[0];
		}
		return null;
    }

    /**  
	@Description update task comment.
	@author Nimisha Jaiswal
	@date 17/07/2019
	*/
	@AuraEnabled
    public static void updateTaskComment(Task_Comment__c objTaskComment, String taskComment, String taskID) {
        
        try {
        
            Task objTask = new Task();
            // if(objTaskComment != null
            // && objTaskComment.Comment__c != taskComment) {
                objTaskComment = (objTaskComment != null) ? objTaskComment : new Task_Comment__c();
                objTaskComment.Comment__c = taskComment;
                objTaskComment.Task_Id__c = taskID;
                upsert objTaskComment;
                if(objTaskComment.Task_Id__c != null) {
                    objTask.Id = objTaskComment.Task_Id__c;
                    objTask.Description = taskComment.replace('</p>','---r---n').replace('<li>','---r---n').stripHtmlTags().replace('---r---n','\r\n');
                    update objTask;
                }
            // }
        } catch (Exception ex) {
            
            system.debug('==ex=>>>'+ex.getMessage());
        }
    }
}