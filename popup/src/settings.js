let btnApplySettings = document.getElementById("btn-submit");
let inputDelimiter = document.getElementById("delimiter");

btnApplySettings.addEventListener("click", () => {
    localStorage.setItem('delimiter', inputDelimiter.value);
    alert("Settings 'delimiter' updated to '" + localStorage.getItem('delimiter') + "' !" )
});