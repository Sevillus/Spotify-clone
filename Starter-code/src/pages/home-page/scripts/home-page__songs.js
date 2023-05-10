let http = new XMLHttpRequest();

http.open('get', './json/songs.json', true);
http.send();
http.onload = function (){
    if(this.readyState === 4 && this.status === 200){
     let songs = JSON.parse(this.responseText);
     let output = "";

     songs.forEach(song =>{
         output +=`
            <div class="home-page__song"> 
                <div id="home-page__song-title" >
                    <h3>0${songs.indexOf(song) + 1 }</h3>
                    <img src="./json/${song.image}" alt="">
                        <div class="home-page__song-info">
                            <span>${song.album}</span>
                            <p>${song.title}</p>
                        </div>
                </div>                
                <div id="home-page__song-artist" class="home-page__song-info">
                   <span>Artists</span>
                   <p>${song.artist}</p>
                </div>
                <div id="home-page__song-time" class="home-page__song-info">
                    <span>Time</span>
                    <p>${song.time}</p>
                </div>                
                <div class="home-page__song-menu-box" >
                    <div  id="like-btn"><img src="./images/Group.png" id="like-btn" alt=""></div>
                    <div  class="more-menu-btn">
                        <img id="menu-btn" src="./images/more-menu-vertical-line.png" alt="">
                    </div>                        
                </div>         
                
                        <div class="home-page__more-menu">
                          <p>Add to queue</p>
                           <p>Go to the track</p>
                           <p>Go to the artist</p>
                           <p>Go to album</p>
                           <p>Show content authors</p>
                           <p>Add to playlist</p>
                           <p>Show content authors <img src="/images/arrow.png" alt="show more arrow"></p>
                           <p>Share <img src="/images/arrow.png" alt="show more arrow"></p>
                        </div>
             </div>
         `
     })

        document.querySelector(".home-page__songs").innerHTML = output;


     //Zaznaczanie piosenek
        let currentSong = null;

        const everySong = document.querySelectorAll(".home-page__song")
        const menuBox = document.querySelectorAll(".home-page__song-menu-box")
        const songsArray = Array.from(everySong)
        const btns = document.querySelectorAll(".more-menu-btn")

        const unSelectMenu = ()=>{
            everySong.forEach(el =>{
                currentSong.classList.remove("active")
                menuBox.forEach(menu =>{
                    menu.style.opacity = "0"
                })
            })
        }
        let currentMenu = null;



        function handleClickOutside(event) {
            const menus = document.querySelectorAll(".home-page__more-menu")
            if (currentMenu && !currentMenu.contains(event.target)) {
                menus.forEach(menu =>{
                    menu.style.visibility ="hidden"
                })
                currentMenu = null;
            }
        }
        document.addEventListener('click', handleClickOutside);
        btns.forEach(btn => {
            const menu = btn.parentNode.parentNode.querySelector(".home-page__more-menu")
            btn.addEventListener('click', () => {
                if (currentMenu) {
                    currentMenu.parentNode.parentNode.querySelector(".home-page__more-menu").style.visibility = "hidden"
                }
                menu.style.visibility = "visible"
                currentMenu = btn;
            });
        });



        document.addEventListener("click", (ev)=>{
            if(!songsArray.some(el => el.contains(ev.target))){
                unSelectMenu();
            }else{
                if(currentSong){
                    unSelectMenu();
                }
                const menuBox = ev.target.querySelector(".home-page__song-menu-box")
                menuBox.style.opacity = "1"

                ev.target.classList.toggle("active")
                currentSong = ev.target;
            }

        })

    }



}


