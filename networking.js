const btnCreate = document.getElementById("btnCreate")
const lblCreate = document.getElementById("lblCreate")
const btnJoin = document.getElementById("btnJoin")
const txtJoin = document.getElementById("txtJoin")
const apiRoot = "https://oow86744ai.execute-api.eu-west-2.amazonaws.com"
let pid;
let gid;

btnCreate.addEventListener("click", () => {
    axios.put(apiRoot + '/games', {})
    .then(response => {
        gid = response.body.game_id
        pid = response.body.pid
        lblCreate.innerText = `Game ID: ${gid}`
    })
})

btnJoin.addEventListener("click", () => {
    let _gid = txtJoin.value
    console.log(_gid)
    axios.put(apiRoot + "/games/" + _gid + "/join", {})
    .then(response => {
        console.log(reponse.body.pid)
    })
})

