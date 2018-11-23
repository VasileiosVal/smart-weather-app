export let setLang = (lang = 'en') => {
    return {
        type: 'CHANGE_LANG',
        lang
    }
}