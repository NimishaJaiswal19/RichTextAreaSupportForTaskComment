({
    onInit: function (component, event, helper) {
		helper.loadTaskComment(component, helper);
    },
    closeEditTaskCommentModal: function(component, event, helper) {
        //$A.get("e.force:closeQuickAction").fire();
        if(component.get('v.taskComments') != component.get('v.taskCommentsOld'))
           component.set('v.taskComments', component.get('v.taskCommentsOld'));
        component.set("v.CommentEditMode", false);
        $A.get("e.force:closeQuickAction").fire();
        $A.get('e.force:refreshView').fire();
    },
    saveTaskComment: function (component, event, helper) {
        helper.updateTaskComment(component, event, helper);
    },
    EditTaskComment: function (component, event, helper) {
        component.set("v.CommentEditMode", true);
    },
    handleClick: function(component, event, helper) {
        var isOpen = component.get("v.isOpen");
        component.set("v.isOpen", !isOpen); 
    }
})