export let setText = (text='') => {
    return {
        type: 'SET_TEXT',
        text
    }
}