export const THEME_STORAGE_KEY = "theme";

// Runs before paint (inlined in <head>) so the saved or system theme is
// applied without a flash of the wrong colors.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;
