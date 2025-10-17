export const taskMan = (function () {
    
    function displayTasks(project) {
        document.querySelector('.projects').remove();
    }

    return { displayTasks }
})();