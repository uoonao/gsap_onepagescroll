const menus = document.querySelectorAll('nav > ul > li > a')
const bar = document.querySelector('.bar')
const body = document.querySelector('body')
const header = document.querySelector('header')
const mobBtn = document.querySelector('.mob_btn')
const btnDowns = document.querySelectorAll('.btnDown')
const remoteMenus = document.querySelectorAll('#remote a')



console.log('menus:', menus);
console.log('bar:', bar);
console.log('body:', body);

// 헤더 메뉴를 누르면 해당 section으로 스크롤
menus.forEach((menu, idx)=>{
  menu.onclick = (e)=>{
    e.preventDefault();

    body.classList.remove('mOpen') // 모바일 상태에서 눌렀을 때 메뉴 슬라이드 닫히면서 이동
    document.querySelector(menu.dataset.target).scrollIntoView({behavior : 'smooth'})

    setActive(menu.dataset.target)  // menu와 remote 메뉴에 active를 넣는 함수 실행
    

  }
    //메뉴에 마우스를 올리면 bar 표시
  menu.addEventListener('mouseover', ()=>{
    bar.style.width = `${menu.clientWidth}px`
    bar.style.left = `${menu.offsetLeft}px`
  })

  // 마우스가 벗어나면 bar 숨김
  menu.addEventListener('mouseout', ()=>{
    bar.style.width = `0px`
    bar.style.left = `${menu.offsetLeft}px`
  })
})

// 리모트 메뉴 이벤트
remoteMenus.forEach(menu => {
  menu.addEventListener('click', (e)=>{
    e.preventDefault()

    document.querySelector(menu.dataset.target).scrollIntoView({
      behavior : 'smooth'
    })
    
    setActive(menu.dataset.target) 
  })
})

// 메인 메뉴와 리모트 메뉴의 active 연동
function setActive (tt) {
  menus.forEach((menu)=>{
    menu.classList.toggle('active', menu.dataset.target === tt);
  })

  remoteMenus.forEach((menu)=>{
    menu.classList.toggle('active', menu.dataset.target === tt);
  })
}


// 모바일 메뉴 슬라이드
mobBtn.addEventListener('click', function(){
  body.classList.toggle('mOpen')
})



// 스크롤이 되면 헤더 모양이 바뀜
window.addEventListener('scroll', function() {
  header.classList.toggle('on', window.scrollY > 100 )
  
})



// 아래 섹션으로 이동
btnDowns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    /* btn.closest('section').nextElementSibling.scrollIntoView({
      behavior : 'smooth'
    }) */

    const currentSection = btn.closest('section')
    // btn이 솏한 가장 가까운 section을 찾음, 없을 때는 뒤에 있는 요소로 (에러 방지)


    console.log(Number(currentSection.id.slice(1)))
    // 섹션의 id를 가져와 문자열에서 인덱스 1부터 잘라내는 메서드
    
    const currentNum = Number(currentSection.id.slice(1))

    const nextSection = document.querySelector(`#s${currentNum + 1}`)
    console.log(nextSection)

    // nextSection?.scrollIntoView({behavior : 'smooth'})

    // setActive(`#s${currentNum + 1}`)

    if(nextSection){
      nextSection.scrollIntoView({
        behavior : 'smooth'
      });
      setActive(`#s${currentNum + 1}`)
    }
  })
})







// gsap


// gsap.to("타겟엘리먼트", { 속성: 속성값,  , }, 딜레이);
// 움직임이 끝나는 지점을 지정하는 애니메이션
gsap.to("header figure", { 
  rotate: 360,  
  duration: 2,    // 시간 2초 걸림 
  repeat:-1
});

// 움직임이 시작되는 지점
gsap.from("#s1 h2", { opacity:0, y:-300, duration:2, ease: "bounce.out", });


// 움직임의 시작, 끝을 지정
gsap.fromTo("#s2 .txt > *", 
  { opacity: 0, x:200 }, 
  { opacity: 1, x:0,  duration: 1,
    stagger : 0.5, // 여러개 요소를 시간차를 두고 작동되게
    scrollTrigger: "#s2 .txt"  //#s2 .txt 화면에 보이면 실행
  });

  gsap.from("#s2 figure", {
    x:-200, opacity:0,
    scrollTrigger : { 
      trigger: "#s2 figure",    // 뷰포트에 보일때 애니메이션이 시작
      start: 'top 30%',         // 시작지점
      end: 'bottom 50%',        // 끝나는 지점
      // end: '+=500',          //시작지점부터 500px 스크롤 
      //markers: true,            // 개발 가이드 표시
      scrub : true              // 되감기 기능
    }
  })

/* 일일이 delay 지정해야 함
  gsap.from("#s3 .txt",{
    y:-100, opacity:0, duration:0.7
  })
  gsap.from("#s3 .icons",{
    y:50, opacity:0, delay:1
  })
*/


// 여러 애니메이션 순서대로 연결
let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: '#s3',
    start: 'top center',
    end: '+=500',
    scrub: true
  }
});

tl3.from("#s3 .txt",{
    y:-100, opacity:0, duration:0.7
  })
tl3.from("#s3 .icons li",{
    y:50, opacity:0, stagger:0.1
  })


gsap.from('#s4 .card', {
  y:-100, opacity:0, stagger: 0.3,
  scrollTrigger: {
    trigger: '#s4 .cards',
    start: 'top 50%',
    end: 'bottom 60%',
    scrub: true
  }
})


// 배경을 유지하는 것은 pin, 요소가 등장하는 것은 timeline으로 구현
const tl5 = gsap.timeline({
  scrollTrigger: {
    scrub:1, 
    pin:true,
    trigger: '#s5',
    start: 'top 20%',
    end: '+=600',
    markers: true,
  }
})
tl5.from("#s5 figure", { 
  rotateZ:900, x: '100%', autoAlpha: 0, duration:2, ease: "none",
})