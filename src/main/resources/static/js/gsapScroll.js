(function () {
  var controller = new ScrollMagic.Controller({
    // globalSceneOptions: {
    //   duration: 436,
    // },
  });

  var bigImg = new TimelineMax()
    .fromTo(".photozone", 1, { scale: 2 }, { scale: 1 })
    .add(
      TweenMax.to(".menu_btn .st0,.scroll_btn .st0", 0.1, {
        stroke: "white",
      })
    )
    .add(
      TweenMax.to(".about__text-title,.main_title-01", 1, {
        color: "white",
      })
    )
    .add(TweenMax.to(".photozone", 1, { "-webkit-filter": "blur(3px)", filter: "blur(3px)" }));

  var scene = new ScrollMagic.Scene({
    triggerElement: "#about",
    triggerHook: "onLeave",
    duration: "180%",
  })
    .setPin("#about")
    .setTween(bigImg)
    // .addIndicators()
    .addTo(controller);
})();
