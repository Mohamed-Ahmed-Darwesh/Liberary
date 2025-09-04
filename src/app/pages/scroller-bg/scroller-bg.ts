import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, signal, viewChild, viewChildren, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ImagI } from '../../CORE/interfaces/imag-i';
import { map } from 'rxjs';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);



@Component({
  selector: 'app-scroller-bg',
  imports: [CommonModule],
  templateUrl: './scroller-bg.html',
  styleUrl: './scroller-bg.scss'
})
export class ScrollerBg implements AfterViewInit {
  wrapper = viewChild<ElementRef>('wrapper');
  imgs = viewChild<ElementRef>('images');
  pinned = viewChild<ElementRef>('pinned')
  trigger = viewChild<ElementRef>('trigger')
  scrollerImg = viewChild<ElementRef>('scrollerImg')
  scrollerImgs = viewChildren<ElementRef>('scrollerImgs')
  firstCat = viewChild<ElementRef>('firstCat')
  otherCats = viewChildren<ElementRef>('otherCats')

  private readonly imageSources = [
    '/images/2-bg(compressed)/9780143123231.webp',
    '/images/2-bg(compressed)/9780525564805.webp',
    '/images/2-bg(compressed)/9780553418026.webp',
    '/images/2-bg(compressed)/9780593418918.webp',
    '/images/2-bg(compressed)/9780593492932.webp',
    '/images/2-bg(compressed)/9780593717493.webp',
    '/images/2-bg(compressed)/9780593873922.webp',
    '/images/2-bg(compressed)/9780593874325.webp',
    '/images/2-bg(compressed)/9780676973228.webp',
    '/images/2-bg(compressed)/9780593977057.webp',
    '/images/2-bg(compressed)/9781524746742.webp',
    '/images/2-bg(compressed)/9781496759702.webp',
    '/images/2-bg(compressed)/9781496747754.webp',
    '/images/2-bg(compressed)/9780735221109.webp',
  ];

  readonly Catigories = [
    "adventure",
    "mystery",
    "horror",
  ]
  readonly AnimatedBooks = [
  {img:"/images/2-bg(compressed)/9780593874325.webp" , title:"the bewitching",desc:"Back then, when I was a young woman, there were still witches”: That was how Nana Alba always began the stories she told her great-granddaughter Minerva—stories that have stayed with Minerva all her life."},
  {img:"/images/2-bg(compressed)/9781496759702.webp" , title:"victim six",desc:"The bodies are found in towns and cities around Puget Sound. The young women who are the victims had nothing in common"},
  {img:"/images/2-bg(compressed)/9780143123231.webp" , title:"the silent wife",desc:"A young woman is brutally attacked and left for dead. The police investigate but the trail goes cold."}
]


  // Available column/row spans
  private readonly colSpans = [ 2,4,3,2,3,3];
  private readonly randomNum = [1,2,3,4,5]
  randomizedElements: ImagI[] = [];
  private readonly platform_id = inject(PLATFORM_ID);




  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platform_id)) {
      ScrollTrigger.normalizeScroll();
      ScrollSmoother

      this.generateRandomizedElements();
      Promise.resolve().then(() => {
        this.triggerEffect();
        this.ScrollSmootherBg();
        ScrollTrigger.refresh();
        window.scrollTo(0, 0);
      });
    }
  }

  private generateRandomizedElements(): void {

    const numElements = 60; // 50-60 elements

    for (let i = 0; i < numElements; i++) {
      const speed = Math.random() * 1.3 + 0.7;

      const colSpan = this.colSpans[Math.floor(Math.random() * this.colSpans.length)];
      let randNum = this.randomNum[Math.floor(Math.random()*this.randomNum.length)]
      let randNum2 = this.randomNum[Math.floor(Math.random()*this.randomNum.length)]
      const src = this.imageSources[Math.floor(Math.random() * this.imageSources.length)];
      if(colSpan == 2){
        randNum = 1
        randNum2 = 1
      }
      this.randomizedElements.push({
        src,
        speed,
        colSpan,
        randNum,
        randNum2
      });
    }
  }

  private triggerEffect(): void {
    const pinned = this.pinned()?.nativeElement;
    const trigger = this.trigger()?.nativeElement;
    const scrollerImg = this.scrollerImg()?.nativeElement;
    const firstCat = this.firstCat()?.nativeElement
    const otherCats = this.otherCats().map(ref => ref?.nativeElement)
    const scrollerImgs  = this.scrollerImgs().map(ref => ref.nativeElement)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'center top',
        end: '+=' + (window.innerHeight*12),
        scrub: true,
        markers: true,
        invalidateOnRefresh: true
      }
    });


    tl.set(
      scrollerImg,
      { xPercent: 90, opacity: 0 },
    )
    tl.set(
      scrollerImgs,
      { xPercent: 90 ,opacity:0 },
    )
    tl.set(
      otherCats,
      {opacity:0,yPercent:100}
    )



    tl.fromTo(
      pinned,
      { xPercent:-40, opacity: 0 },
      { xPercent: 0, opacity: 1, ease: "power2.out", duration: 0.18}
    );

    tl.to(
      scrollerImg,
      {xPercent : 0 ,
        opacity:1 ,
        ease:"power1.out",
        duration:0.15
      },
      "+0.065"
    )
    tl.to(
      firstCat,
      {
        yPercent:-70,
        opacity:0,
        ease:"power2.out",
        duration:0.1,
      },
      "+=0.4"
    )
    tl.to(
      scrollerImgs,
      {
        rotate: (i)=> i==1 ? i % 2 == 1 ? i*2 : i*-2 : -3,
        xPercent:0,
        opacity:1,
        ease:"power2.out",
        duration:0.15,
        stagger:0.4
      },
      "-=0.06"
    )

    tl.to(
      otherCats,
      {

        opacity:1,
        yPercent:0,
        ease:"power2.out",
        duration:0.15,
        stagger:0.4
      },
      "<"
    )


    tl.to(
      gsap.utils.toArray(otherCats).slice(0,-1),
            {
        yPercent:-70,
        opacity:0,
        ease:"power2.out",
        duration:0.15,
        stagger:0.4
      },
      "<+0.35"
    )

      tl.to(
    scrollerImgs,
    {
      rotate: 0,
        ease:"power2.out",
      duration:0.1,
      stagger:-0.1
    }
  )
  tl.to(
    [scrollerImgs , scrollerImg],
    {
      yPercent:20,
        ease:"power2.out",
      duration:0.1,
    }
  )
    tl.to(
    [scrollerImgs , scrollerImg],
    {
      yPercent:3,
        ease:"power2.out",
      duration:0.5,
    }
  )
    tl.to(
    [scrollerImgs , scrollerImg],
    {
      yPercent:20,
        ease:"power2.out",
      duration:0.1,
    }
  )
    tl.to(
    [scrollerImgs , scrollerImg],
    {
      yPercent:0,
        ease:"power2.out",
      duration:0.1,
    }
  )

      tl.to(
    [scrollerImg , scrollerImgs ],
    {
      xPercent:90,
      opacity:0,
      duration:0.175,
      stagger:-0.04 ,
      ease:"power2.out"
    }
  )
  tl.to(
    gsap.utils.toArray(otherCats).slice(otherCats.length-1,otherCats.length),
    {
      opacity:0,
      duration:0.075,
      ease:"power2.out",
      scale:0.2
    },
    "<+0.12"
  )
  tl.to(
    pinned,
    {xPercent:-90,opacity:0,ease:"power2.out",duration:0.15},
    ">+0.05"
  )
}

  private ScrollSmootherBg(): void {
    const WrapperNativ = this.wrapper()?.nativeElement;
    const ImgsNativ = this.imgs()?.nativeElement;

    let skewSetter = gsap.quickTo(ImgsNativ, "skewY");
    let clamp = gsap.utils.clamp(-20, 20);

    ScrollSmoother.create({
      wrapper: WrapperNativ,
      content: ImgsNativ,
      smooth: 2,
      speed: 3,
      effects: true,
      smoothTouch: 0.5,
      onUpdate: self => {
        skewSetter(clamp(self.getVelocity() / -50));
      },
      onStop: () => {
        skewSetter(0);
      }
    });


  }
}
