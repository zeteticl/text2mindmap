// Helper functions for saving and loading user settings with localstorage.
settings = (function() {
	// Used for seperating settings on the same domain
	const prefix = "text2mindmap";
	
	// Default values for various user settings.
	const defaultValues = {
		"documentContent": "Text2MindMap\n\t這工具可以把TAB(縮進標籤)變成(MindMap)思維導圖\n\t\t在每一行裡按TAB,可以自動縮進\n\t\t按 Shift + Tab 可以反向縮進\n\t右邊的每個點可以直接拉動\n\t\t寫好後別忘了 Ctrl + S 儲存檔案\n\t這工具建基於已關站的 Text2MindMap.com\n\t大項B\n\t大項C\n\t大項D\n\t\t細節B\n\t\t\t細節C\n\t\t\t\t細節D\n\t大項E\n\t大項F",
		"documentTitle": "沒有名字的文件"
	};

	// Used for converting settings values to actual font-familys.
	const fontFamilyMap = {
		"monospace": "monospace",
		"sans-serif": "sans-serif",
		"serif": "serif",
	};

	// Get the setting with the specified key. If the setting is null, use the default value.
	function getSetting(key) {
		let setting;
		try {
			setting = JSON.parse(localStorage.getItem(prefix+key));
		} catch (exception) {
			// Ignored
		}
		if (!setting || setting == "") {
			setting = getDefaultValue(key);
			setSetting(key, setting);
		}
		return setting;
	}

	// Set the setting with the specified key to the specified value.
	function setSetting(key, value) {
		if (!value) {
			value = getDefaultValue(key);
		}
		try {
			localStorage.setItem(prefix+key, JSON.stringify(value));
		} catch (exception) {
			console.error(`Error saving setting.\nKey: ${key}\nValue: ${value}\n`);
		}
	}

	// Get the default value of the setting with the specified key.
	function getDefaultValue(key) {
		if (key in defaultValues) {
			return defaultValues[key];
		}
	}

	// Reset all the settings to their default values.
	function reset() {
		for (let key in defaultValues) {
			setSetting(key, getDefaultValue(key));
		}
	}

	return {
		getSetting,
		setSetting,
		fontFamilyMap,
		getDefaultValue,
		reset
	};
}());
