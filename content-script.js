// Esconde sidebar

var sidebar = document.querySelector("#sidebar");

sidebar.style.display = "none";

// Adiciona link Telegram

var shareList, telegramLink, url;
var posts = document.querySelectorAll(".badge-entry-container");

console.log("Teste");
console.log(posts);

for (var post of posts) {
	
	console.log("loop", post);
	
	url = post.getAttribute("data-entry-url");
	
	shareList = post.querySelector(".share ul");
	
	telegramLink = document.createElement("li");
	telegramLink.innerHTML = "<a href='https://telegram.me/share/url?url="+ encodeURI(url) +"' targer='_blank'><img src='http://i.imgur.com/IauUTmk.png' alt='Share On Telegram'></a>";
	
	shareList.innerHTML = "";
	shareList.appendChild(telegramLink);
	
}

