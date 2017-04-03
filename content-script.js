
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || false;
let timeInterval;


function hideSidebar() {
    console.log("[9gag tweaks] Removing sidebar...");
    let sidebar = document.querySelector("#sidebar");
    sidebar.style.display = "none";
}

function replacesSharingButton() {
	// Adiciona link Telegram


    let shareList, telegramLink, url;
    let posts = document.querySelectorAll(".badge-entry-container");


    for (let post of posts) {

        let url = post.getAttribute("data-entry-url");
        let alreadyFixed = post.getAttribute("data-already-fixed") || false;

        if (alreadyFixed !== "yes") {
            console.log(`[9gag tweaks] replacing sharing buttons for ${url}`);

            shareList = post.querySelector(".share ul");

            telegramLink = document.createElement("li");
            telegramLink.innerHTML = "<a href='https://telegram.me/share/url?url=" + encodeURI(url) + "' target='_blank'><img src='http://i.imgur.com/IauUTmk.png' alt='Share On Telegram'></a>";

            shareList.innerHTML = "";
            shareList.appendChild(telegramLink);
            post.setAttribute("data-already-fixed", "yes");
        }
    }
}


function observeDOM(obj, callback) {
    if(MutationObserver ){
        //DEFINE A NEW OBSERVER
        let obs = new MutationObserver(function(mutations, observer){
            if(mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                callback();
            }
        });
        //HAVE THE OBSERVER OBSERVE FOO FOR CHANGES IN CHILDREN
        obs.observe( obj, { childList:true, subtree:true });
    }
    else {
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
    }
}

function checkDOM() {
    console.log("[9gag tweeks] checking dom...")

    // first pass...
    hideSidebar()
    replacesSharingButton()


    // keep observing the nodes due to infinite scrolling
    let posts = document.getElementById("list-view-2");

    if (posts !== null) {

        observeDOM(posts, replacesSharingButton);
    } else {
        console.log("[9gag tweaks] ERROR DOM NULL, wait 5 secs");
        timeInterval = setTimeout(checkDOM, 5000);

    }

}

checkDOM();