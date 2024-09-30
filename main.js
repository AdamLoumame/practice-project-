// settings bar 
let icon = document.querySelector(".settings-bar .fa-gear")
let clicked = false
icon.addEventListener("click",()=>{
    if (!clicked){
        document.querySelector(".settings-bar").style.left = 0
        Object.assign(icon.style,{backgroundColor:"white",padding:"10px",right:"-45px",opacity:1})
        icon.addEventListener("mouseover",()=>icon.style.transform="rotate(0)")
        clicked = true
    }else{
        document.querySelector(".settings-bar").style.left = "-250px"
        Object.assign(icon.style,{right:"-45px"})
        clicked = false
    }
})
// settings of the colors 
let colorL = document.querySelectorAll(".colors-list li")
if (localStorage.getItem("color")){
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color"))
    colorL.forEach(e =>e.classList.remove("active"))
    document.getElementsByClassName(localStorage.getItem("lastLI"))[0].classList.add("active")
}
colorL.forEach(li =>{
    li.style.backgroundColor = li.dataset.color
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
        colorL.forEach(e =>e.classList.remove("active"))
        e.target.classList.add("active")
        localStorage.setItem("color",e.target.dataset.color)
        localStorage.setItem("lastLI",e.target.classList[0])
    })
})
// random background
let interval
function BgInterval(){
    interval = setInterval(() => {
        let i = Math.floor(Math.random() * 5)
        let image = `url("../images/b${i+1}.jpg")`
        document.querySelector(".landing-page").style.backgroundImage = image
        localStorage.setItem("LastBGimage",image)
    },10000);
}
if (localStorage.getItem("LastBGimage")){
    document.querySelector(".landing-page").style.backgroundImage = localStorage.getItem("LastBGimage")
    if (localStorage.getItem("YorN") == "Yes"){
        BgInterval()
        document.querySelector(".No").classList.remove("active")
        document.querySelector(".Yes").classList.add("active")
    }
}
let clickedONyes = false
document.querySelectorAll(".settings-bar .main-settings .options span").forEach(span=>{
    span.addEventListener("click",randomBG)
})
function randomBG(e){
    if (e.target.classList.contains("Yes") && !clickedONyes){
        clearInterval(interval)
        BgInterval()
        document.querySelector(".No").classList.remove("active")
        e.target.classList.add("active")
        clickedONyes = true
    }else if(e.target.classList.contains("No")){
        clearInterval(interval)
        document.querySelector(".Yes").classList.remove("active")
        e.target.classList.add("active")
        clickedONyes = false
    }
    localStorage.setItem("YorN", e.target.classList[0])
}
// settings of bullets
let bulletsOptions = document.querySelectorAll(".settings-bar .main-settings .bullets-controle-flow .sections li .check-mark ")
let listOfStorage = ["About Us","Skills","Gallary","Timeline","Testimonials","Features"]
listOfStorage.forEach(el=>{
    if (el.toLowerCase().split(" ")[0] === localStorage.getItem(el.toLowerCase().split(" ")[0])){
        let bullet = document.createElement("div")
        bullet.classList.add("bullet")
        bullet.dataset.section = "."+el.toLowerCase().split(" ")[0]
        let info = document.createElement("info")
        info.classList.add("info")
        info.innerText = el
        bullet.appendChild(info)
        document.querySelector(".nav-bullets").appendChild(bullet)
        bulletsOptions.forEach(checkMark=>{
            if (checkMark.dataset.text.toLowerCase().split(" ")[0] === el.toLowerCase().split(" ")[0]){
                checkMark.classList.add("active")
            }
        })
    }
    BulletsWork()
})
bulletsOptions.forEach(checkMark => {
    let navBullets = document.querySelector(".nav-bullets")
    checkMark.addEventListener("click",e=>{
        if (e.target.classList.contains("active")){
            Array.from(navBullets.children).forEach(child=>{
                if (child.dataset.section.split(".")[1] === e.target.parentElement.parentElement.innerText.split(" ")[0].toLowerCase()){
                    child.remove()
                }
            })
            localStorage.removeItem(e.target.parentElement.parentElement.innerText.split(" ")[0].toLowerCase())
            e.target.classList.remove("active")
        }else{
            let bullet = document.createElement("div")
            bullet.classList.add("bullet")
            bullet.dataset.section = "."+e.target.parentElement.parentElement.innerText.split(" ")[0].toLowerCase()
            let info = document.createElement("info")
            info.classList.add("info")
            info.innerText = e.target.dataset.text
            bullet.appendChild(info)
            navBullets.appendChild(bullet)
            e.target.classList.add("active")
            localStorage.setItem(e.target.parentElement.parentElement.innerText.split(" ")[0].toLowerCase(),e.target.parentElement.parentElement.innerText.split(" ")[0].toLowerCase())
        }
        BulletsWork()
    })
})
// our skills showing on scroll 
let progresses = document.querySelectorAll(".skills .skill-progress span");
let span_observer = new IntersectionObserver(entry=>{
    entry.forEach(e=>{
        if (e.isIntersecting){
            e.target.style.width = e.target.dataset.progress
            document.querySelector(".skills .back-image").style.right = "5px"
        }
    })
})
progresses.forEach(ele => span_observer.observe(ele))


// gallary 
let gal = document.querySelectorAll(".gallary .container .gal")
let shapes = document.querySelectorAll(".gallary .container .gal-container .back-shape")
let GandS = Array.from(shapes).concat(Array.from(gal))
function ShapesAnimation(){
    GandS.forEach(e =>{
        e.style.animation = `bordering ${Math.round((Math.random() * 20)+7)}s infinite`
    })
}
ShapesAnimation()
if (localStorage.getItem("ShapedImage") === "No"){
    GandS.forEach(e =>{
        e.style.animation = `none`
    })
    document.querySelector(".shaped-images .shaped-images-options .Yes").classList.remove("active")
    document.querySelector(".shaped-images .shaped-images-options .No").classList.add("active")
}
gal.forEach(e => {
    e.addEventListener("click", ()=>{
        let popUpOverlay = document.createElement("div")
        popUpOverlay.classList.add("popup-overlay")
        document.body.appendChild(popUpOverlay)

        let popBox = document.createElement("div")
        popBox.classList.add("popup-box")
        document.body.appendChild(popBox)
        let image = document.createElement("img")
        image.className = "pop-image"
        image.src = e.children[0].src
        popBox.appendChild(image)

        let h3 = document.createElement("h3")
        if (e.children[0].alt){
            h3.innerText = e.children[0].alt
        }
        popBox.prepend(h3)

        let X = document.createElement("span")
        X.innerText = "X"
        X.className = "X"
        popBox.prepend(X)
        X.addEventListener("mouseover",()=>X.parentElement.style.borderRadius = "20px")
        X.addEventListener("mouseout",()=>X.parentElement.style.borderRadius = 0)
        X.addEventListener("click",()=>{
            popUpOverlay.remove();
            popBox.remove();            
        })
    })
});
let YandN = document.querySelectorAll(".shaped-images .shaped-images-options span")
YandN.forEach(YN =>{
    YN.addEventListener("click",e=>{
        if (e.target.innerText === "Yes" && !e.target.classList.contains("active")){
            ShapesAnimation()
            document.querySelector(".shaped-images .shaped-images-options .No").classList.remove("active")
            e.target.classList.add("active")
            localStorage.setItem("ShapedImage","Yes")
        }else if(e.target.innerText === "No"){
            GandS.forEach(e =>{
                e.style.animation = `none`
            })
            document.querySelector(".shaped-images .shaped-images-options .Yes").classList.remove("active")
            e.target.classList.add("active")
            localStorage.setItem("ShapedImage","No")
        }
    })
})
// how bullets works 
function BulletsWork(){
    let bullets = document.querySelectorAll(".nav-bullets .bullet")
        let i = .2
        bullets.forEach(bullet=>{
            bullet.addEventListener("click",e=>{
                document.querySelector(e.target.dataset.section).scrollIntoView({behavior:'smooth'})
            })
            bullet.style.transition = `${i}s`
            i+=.2
        })
}

// Big reset
document.querySelector(".reset").addEventListener("click",_=>{
    localStorage.clear()
    window.location.reload()
})

// OTHER FUNCTIONALITIES
// three bar of navigation 
let threeBar = document.querySelector(".landing-page .header .three-bars")
threeBar.addEventListener("click",()=>{
    document.querySelector(".landing-page .header .magic-list").classList.toggle("active")
})