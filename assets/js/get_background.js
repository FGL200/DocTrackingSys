fetch(`${base_url}assets/css/background.txt`)
.then(response => response.text())
.then(response => {

    // console.log(response);
    let myImage = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcbLjcZKWWHRRpf5gdOSCI78jLz3gpNgL67AcTD3zFE-zU_GTG';
    let bgImg = `url("${response}")`;
    const main =  document.getElementById("root").children[0];
    main.setAttribute("style", `background-image: ${bgImg} !important;`);
    console.log({bgImg});
})
.catch(err => {
    console.log("ERROR: " + err);
});