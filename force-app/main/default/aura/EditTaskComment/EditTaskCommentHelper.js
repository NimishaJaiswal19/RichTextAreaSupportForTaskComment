({
    loadTaskComment : function(component, helper) {
        var action = component.get("c.fetchTaskComment");
        action.setParams({
			taskID: component.get('v.recordId')
        });
        
		action.setCallback(this, function(response) {
            if(response.getReturnValue() != null) {
                component.set('v.taskCommentRecord', response.getReturnValue());
                component.set('v.taskComments', response.getReturnValue().Comment__c);
                component.set('v.taskCommentsOld',response.getReturnValue().Comment__c);
            }
        });
		$A.enqueueAction(action); 
    },
    updateTaskComment : function(component, event, helper) {
        console.log('==component.get(v.recordId)=',component.get('v.recordId'));
        var action = component.get("c.updateTaskComment");
        action.setParams({
            objTaskComment: component.get('v.taskCommentRecord'),
            taskComment: component.get('v.taskComments'),
            taskID: component.get('v.recordId')
        });
        
		action.setCallback(this, function(response) {
            component.set('v.showSpinner', false); 
            if (response.getState() === "SUCCESS") {
                component.set('v.taskCommentsOld', component.get('v.taskComments'));
                $A.get("e.force:closeQuickAction").fire();
                $A.get('e.force:refreshView').fire();
                component.set("v.CommentEditMode", false);
                location.reload();
            }
        });
        component.set('v.showSpinner', true); 
		$A.enqueueAction(action); 
    }
})