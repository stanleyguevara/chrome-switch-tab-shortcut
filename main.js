chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(active) {
        if(active.length > 0) {
            var forward = (command == "next-tab" ? true : false);
            var next = active[0].index+(forward ? 1 : -1);
            chrome.tabs.query({
                currentWindow : true                
            }, function(all) {
                if(all.length == 1) return;
                if(next >= all.length) chrome.tabs.update(all[0].id, {active: true});
                else if(next < 0) chrome.tabs.update(all[all.length-1].id, {active: true});
                else chrome.tabs.update(all[next].id, {active: true});
            });
        }
    });
});
