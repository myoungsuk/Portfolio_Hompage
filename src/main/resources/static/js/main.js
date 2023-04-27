let menuBtn = document.querySelector(".menu_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let menu = document.querySelector("nav");
let menuEl = document.querySelectorAll(".menu_list li");


//메뉴 버튼을 클릭하면 메뉴가 나타납니다
menuBtn.addEventListener("click", (e) => {
    menu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    // console.log("클릭");
});

//취소 버튼을 클릭하면 메뉴가 사라집니다.
cancelBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
    document.body.style.overflow = "unset";
});

//메뉴 아이템에 마우스 오버 시 빨간색 선이 나타납니다.
menuEl.forEach((el) => {
    el.addEventListener("mouseover", () => {
        let redLine = document.querySelector(".redLine");
        redLine.style.display = "unset";
        el.append(redLine);
    });

    //메뉴 아이템을 클릭하면 메뉴가 1초 후에 사라집니다.
    el.addEventListener("click", () => {
        function closeMenu() {
            menu.classList.add("hidden");
        }
        setTimeout(closeMenu, 1000);
    });
});

window.onload = () => {
    let websiteImages = document.querySelectorAll(".menu-app>.card-wrapper");
    let videoImages = document.querySelectorAll(".menu-web>.card-wrapper");
    let tabEls = document.querySelectorAll(".menu-section-wrap [data-index]");
    let tabEl = [...tabEls];
    let menuEls = document.querySelectorAll(".portfolio-menu li");
    let menuEl = [...menuEls];
    let allHeight = document.querySelector(".menu-section-wrap");

    let imgStack = [0, 0, 0];

    let colWidth = innerWidth;
    //반응형
    let resizeId = "";
    window.addEventListener("resize", function () {
        this.clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 300);
    });

    //창 크기에 따라 카드의 크기를 조절합니다.
    function doneResizing() {
        let innerWidth = window.innerWidth;
        let innerContainerWidth = document.querySelector(".menu-section-wrap").offsetWidth;
        let imgW;
        if (innerWidth <= "576") {
            imgStack = [0, 0];
            console.log(innerContainerWidth);
            colWidth = innerContainerWidth / 2;
            imgW = innerContainerWidth / 2;
            let cards = document.querySelectorAll(".card-wrapper");
            cards.forEach((card, i) => {
                cards[i].style.maxWidth = `${imgW}px`;
            });
        } else if (innerWidth <= "992") {
            imgStack = [0, 0];
            colWidth = innerContainerWidth / 2;
            imgW = innerContainerWidth / 2;
            let cards = document.querySelectorAll(".card-wrapper");
            cards.forEach((card, i) => {
                cards[i].style.maxWidth = `${imgW}px`;
            });
        } else {
            imgStack = [0, 0, 0];
            colWidth = innerContainerWidth / 3;
            imgW = innerContainerWidth / 3;
            console.log(innerContainerWidth);
            let cards = document.querySelectorAll(".card-wrapper");
            cards.forEach((card, i) => {
                cards[i].style.maxWidth = `${imgW}px`;
            });
        }
    }
    doneResizing();

    // menu탭 내용을 하나씩 잡았음
    // 카드가 리셋 되어야 함
    //메뉴 아이템에 data-index 속성을 추가하고 해당 메뉴 아이템을 클릭하면 openTab
    //함수를 호출합니다.
    for (let i = 0; i < menuEl.length; i++) {
        menuEl[i].setAttribute("data-index", i);
        // tabEl[i].dataset.id = i;
        menuEl[i].addEventListener("click", (e) => {
            openTab(e.target.getAttribute("data-index"));
        });
    }
    // openTab 함수는 메뉴 아이템과 탭 요소에 active 및 selected 클래스를 추가/삭제하여 탭을 전환합니다
        function openTab(index) {
        menuEl.forEach((el) => el.classList.remove("selected"));
        tabEl.forEach((el) => el.classList.remove("active"));
        tabEl[index].classList.add("active");
        menuEl[index].classList.add("selected");
    }


    //메뉴 아이템을 클릭하면 포트폴리오 컨테이너로 스크롤 이동합니다.
    menuEl.forEach((menuEls, i) => {
        menuEls.addEventListener("click", function () {
            let offset = $(".portfolio-container").offset().top;
            console.log($(this));
            console.log(offset);
            console.log("이동", offset);
            $("html,body").animate({ scrollTop: offset });
        });
    });
    //각 카드를 적절한 위치에 배치합니다.
    for (let i = 0; i < websiteImages.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        // 최소값
        // apply(null, imgStack)도 상관X
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];
        imgStack[minIndex] += websiteImages[i].children[0].firstElementChild.height + 100;
        // 이미지 높이에+20
        websiteImages[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
        // 그냥 애니메이션
        if (i === websiteImages.length - 1) {
            allHeight.offsetHeight = `${Math.max.apply(0, imgStack)}px`;
            allHeight.style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
    //웹사이트 메뉴 아이템을 클릭하면, 웹사이트 이미지 카드를 적절한 위치에 배치합니다.
    menuEl[0].addEventListener("click", () => {
        doneResizing();
        for (let i = 0; i < websiteImages.length; i++) {
            let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
            // 최소값
            // apply(null, imgStack)도 상관X
            let x = colWidth * minIndex;
            let y = imgStack[minIndex];
            imgStack[minIndex] += websiteImages[i].children[0].firstElementChild.height + 100;
            // 이미지 높이에+20
            websiteImages[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
            // 그냥 애니메이션
            if (i === websiteImages.length - 1) {
                allHeight.offsetHeight = `${Math.max.apply(0, imgStack)}px`;
                allHeight.style.height = `${Math.max.apply(0, imgStack)}px`;
            }
        }
    });
    //비디오 메뉴 아이템을 클릭하면, 비디오 이미지 카드를 적절한 위치에 배치합니다.
    menuEl[1].addEventListener("click", () => {
        doneResizing();
        for (let i = 0; i < videoImages.length; i++) {
            let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
            // 최소값
            // apply(null, imgStack)도 상관X
            let x = colWidth * minIndex;
            let y = imgStack[minIndex];
            imgStack[minIndex] += videoImages[i].children[0].firstElementChild.height + 100;
            // 이미지 높이에+20
            videoImages[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
            // 그냥 애니메이션
            // 마지막 이미지가 처리된 후, 전체 높이를 설정합니다.
            if (i === videoImages.length - 1) {
                allHeight.style.height = `${Math.max.apply(0, imgStack)}px`;
            }
        }
    });
};
