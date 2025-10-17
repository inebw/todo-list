export const taskMan = (function () {
    const storage = window.localStorage;
    
    function displayTask(task) {
        document.querySelector('.projects').remove();
    }

    return { displayTask }
})();