let usernameinput = document.querySelector(".usernameinput");
let searchbtn = document.querySelector(".searchbtn");
let card = document.querySelector(".card")


function getprofiledata(username){
    return fetch(`https://api.github.com/users/${username}`).then(res=>{
        if(!res.ok){ alert("invalid username")}
        return res.json();
    });
}

function getrepos(username){
    return fetch(`https://api.github.com/user/${username}/repos?sort=updated`).then(res=>{
        if(!res.ok){ alert("facing some error the fetching the repos...")};
        return res.json();
    })
}

function decorateprofiledata(value){
        let dateObj = new Date(value.updated_at);
let day = dateObj.getDate();
let month = dateObj.getMonth() + 1; 
let year = dateObj.getFullYear();
console.log(`Date: ${day}, Month: ${month}, Year: ${year}`);


    let data =  `
    <div class="flex flex-col sm:flex-row sm:space-x-6 items-center border-b border-gray-700 pb-6 mb-6">
    <div class="shrink-0 mb-4 sm:mb-0">
      <div class="w-28 h-28 bg-gray-700 rounded-full overflow-hidden">
        <!-- Placeholder for profile avatar -->
        <img src="${value.avatar_url}" alt="Profile Avatar" class="w-full h-full object-cover"/>
      </div>
    </div>
    <div class="flex-1 w-full">
      <h2 class="text-2xl font-semibold text-white mb-1">${value.name ? value.name: ""}</h2>
      <p class="text-blue-400 font-medium mb-2">@${value.login ? value.login : ""}</p>
      <p class="text-gray-300 mb-2">${value.bio ? value.bio: ""}</p>
      <strong>${value.email? value.email: ""}</strong>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" ><path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-6a6 6 0 106 6 6 6 0 00-6-6z"/><path d="M10 11a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1z"/></svg>
      <span>Followers: <strong>${value.followers}</strong></span>
    </div>
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" ><path d="M10 11a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1z"/><path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-6a6 6 0 106 6 6 6 0 00-6-6z"/></svg>
      <span>Following: <strong>${value.following}</strong></span>
    </div>
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M15 7a3 3 0 11-6 0 3 3 0 016 0z"/><path fill-rule="evenodd" d="M2 15a6 6 0 1112 0H2z" clip-rule="evenodd"/></svg>
      <span>Company: <strong>${value.company}</strong></span>
    </div>
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 00-8 8v5a3 3 0 003 3h10a3 3 0 003-3v-5a8 8 0 00-8-8z"/></svg>
      <span>Location: <strong>${value.location}</strong></span>
    </div>
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v4h-3.5a1.5 1.5 0 00-1.5 1.5V15H6v-4.5A1.5 1.5 0 004.5 9H2V5z"/></svg>
      <span>Public Repos: <strong>${value.public_repos}</strong></span>
    </div>
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <span>Last Update: <strong>${day}/${month}/${year}</strong></span>
    </div>
  </div>
    `

    card.innerHTML = data;

}

searchbtn.addEventListener("click", ()=>{
    let username = usernameinput.value.trim();
 
    if(username.length >0){
        getprofiledata(username).then((data)=>{
            decorateprofiledata(data);
            console.log(data);
        });
    }else{
        alert("facing some error... try again")
    }
})