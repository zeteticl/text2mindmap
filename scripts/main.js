(function() {
    if (/Mobi/.test(navigator.userAgent)) {
        alert("這MindMap工具並不太適合手機, 推薦你在電腦上使用!")
    }

    $(document).ready(function() {
        documentTitle.setTitle(settings.getSetting("documentTitle"));

        // Before the user closes the window, warn them if they have unsaved changes.
        $(window).on("beforeunload", function(event) {
            if (unsavedChanges.getHasChanges()  ) { //TODO:
                const message = "你有未儲存的資料. 你確定未儲存就離開?";
                if (event) {
                    event.returnValue = message;
                }
                return message;
            }
            return;
        });

        // Set up shortcut bindings
	    $(document).on("keydown", shortcuts.handleKeypress);
	    const bindings = {
            "Ctrl+N": appFunctions.fileNew,
            "Ctrl+O": appFunctions.fileOpen,
            "Ctrl+S": appFunctions.fileSave
        };
        shortcuts.addBindings(bindings);

        $("#modal-settings-save").on("click", function() {
            $(".modal").removeClass("active");
        });

        $("#textArea").val(settings.getSetting("documentContent"));
        mindmap.render();
    
        function updateMindMap() {
            const value = $("#textArea").val();
            unsavedChanges.setHasChanges(value !== settings.getDefaultValue("documentContent"));
            settings.setSetting("documentContent", value);
            mindmap.render();
        }

        $('#textArea').on("input propertychange", updateMindMap);
        $('#textArea').on("keydown", function(e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode == 9 || keyCode == 13) { 
                updateMindMap();
            } 
            unsavedChanges.setHasChanges(true);
        });
    })
}());