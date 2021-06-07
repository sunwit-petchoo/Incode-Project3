document.addEventListener("DOMContentLoaded", () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status')
    console.log(status)
    if(status == "created"){
        console.log("inside")
        const msg = document.querySelector("#msg")
        msg.style.display = "block"
        /* console.log(msg.style.display);
        if(msg.style.display === ""){
            msg.style.display === "block"
        }else{
            msg.style.display === "none"
        } */
    }
  })
