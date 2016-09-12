function changeZhihuConfig(disable) {
    chrome.storage.local.set({"disabled": disable}, function () {
        resetButton(disable);
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.reload(tab.id);
        });
    })
}

function resetButton(disable) {
    if (disable) {
        document.getElementById("config-button").innerText = "启用插件";
        document.getElementById("config-button").onclick = function () {
            changeZhihuConfig(false);
        }
    } else {
        document.getElementById("config-button").innerText = "关闭插件";
        document.getElementById("config-button").onclick = function () {
            changeZhihuConfig(true);
        }
    }
}

chrome.storage.local.get("disabled", function (data) {
    if (!data || !data["disabled"]) {
        resetButton(false);
    } else {
        resetButton(true);
    }
});