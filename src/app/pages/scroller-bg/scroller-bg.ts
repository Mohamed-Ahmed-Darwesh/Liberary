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
  firstCat = viewChild<ElementRef>('firstCat')
  otherCats = viewChildren<ElementRef>('otherCats')

  private readonly imageSources = [
    '/images/2-bg(compressed)/9780143123231.png',
    '/images/2-bg(compressed)/9780525564805.png',
    '/images/2-bg(compressed)/9780553418026.png',
    '/images/2-bg(compressed)/9780593418918.png',
    '/images/2-bg(compressed)/9780593492932.png',
    '/images/2-bg(compressed)/9780593717493.png',
    '/images/2-bg(compressed)/9780593873922.png',
    '/images/2-bg(compressed)/9780593874325.png',
    '/images/2-bg(compressed)/9780676973228.png',
    '/images/2-bg(compressed)/9780593977057.png',
    '/images/2-bg(compressed)/9781524746742.png',
    '/images/2-bg(compressed)/9781496759702.png',
    '/images/2-bg(compressed)/9781496747754.png',
    '/images/2-bg(compressed)/9780735221109.png',
  ];

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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'bottom top',
        end: '+=4200',             
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
      {xPercent : 0 ,opacity:1 ,ease:"power1.out",duration:0.15},
      "+0.065"
    )
    tl.to(
      firstCat,
      {
        yPercent:-70,
        opacity:0,
        ease:"power2.out",
        duration:0.08
      },
      "<+0.15"
    )
    tl.to(
      otherCats,
      {
        opacity:1,
        yPercent:0,
        ease:"power2.out",
        duration:0.08,
        stagger: 0.05
      },
      "<+0.05"
    )

    tl.to(
      pinned,
      { x: 0, opacity: 1, ease: "none", duration: 0.1 }
    )

    tl.to(
      pinned,
      { x: -300, opacity: 0, ease: "power2.in", duration: 0.1 }
    );
  }

//=================================================================================



















//==================================================================================
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
