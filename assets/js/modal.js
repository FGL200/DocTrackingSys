/**
 * HOW TO USE MODAL
 * 1. In a page, make a button that will open the modal
 * 2. Invoke MODAL.open() to open modal, but before opening the modal, prepare the inside of modal first
 * 3. MODAL.setTitle(str) to set title
 * 4. MODAL.setBody(str) to set body
 * 5. MODAL.setFooter(str) to set footer (usually the buttons)
 * 6. MODAL.setScript(str) to set script of modal 
 * 7. NOTE(1): setScript function is important since modal is a form tag.
 * 8. NOTE(2): Everytime a button is pressed inside the footer tag, You need a function that will be invoke
 * as soon as the modal is loded, this function will add an 'onSubmit' event listener to the modal, wich if
 * tiggred, will invoke whatever fucntion you wish to invoke,
 * 9. MODAL.close() will automatically remove the 'onSubmit' listener and clear the inside of the modal 
 */
const MODAL = {

    form : document.getElementById("modal-container"),

    /**
     * For opening / closing modal (variable flag)
     */
    fade_out : false,

    /**
     * Submit the form of modal
     * @param {function} callback 
     */
    onSubmit : async function(callback){
        $("#modal-container").on("submit",function (e){
            e.preventDefault();
            if(callback) callback(e);
        });
    },

    __onClose__ : null,

    onClose : function (callBack = null) {
        return MODAL.__onClose__ = callBack;
    },

    /**
     * Hide the modal
     */
    close : function(callBack = MODAL.__onClose__){
        this.fade_out = true;
        $("main").removeClass("no-scroll");
        $("body").removeClass("no-scroll");
        $("#modal-holder").addClass("fade-out");
        $("#modal-container").off("submit");
        if(callBack) callBack(this);
        MODAL.__onClose__ = null;
        // console.log(  jQuery._data( document.getElementById("modal-holder"), "events" ) )
    },

    /**
     * Show the modal
     */
    open : function(callBack = null){
        this.fade_out = false;
        $("main").addClass("no-scroll");
        $("body").addClass("no-scroll");
        $("#modal-holder").removeClass("hide");
        $("#modal-holder").addClass("fade-in");
        if(callBack) callBack(this);
    },

    /**
     * Set title of modal
     * @param {str} content 
     */
    setTitle: function(content){
        $("#modal-title").html(content);
    },

    /**
     * Set body of modal
     * @param {str} content 
     */
    setBody: function(content){
        $("#modal-body").html(content);
    },

    /**
     * Set footer of modal
     * @param {str} content 
     */
    setFooter: function(content){
        $("#modal-footer").html(content);
    },

    /**
     * To set script for individual modal when triggering submit of form
     * @param {str} content 
     */
    setScript: function(content){
        $("#modal-script").html("<script>" + content + "</script>");
    }
}

/**
 * Handles the closing animation and cleaning of modal
 */
$("#modal-holder").on("animationend", function(e){
    e.preventDefault();
    if(MODAL.fade_out){
        $("#modal-holder").addClass("hide");
        $("#modal-holder").removeClass("fade-out");
        $("#modal-title").html("");
        $("#modal-body").html("");
        $("#modal-footer").html("");
        $("#modal-script").html("");
    }else{
        $("#modal-holder").removeClass("fade-in");
    }
});