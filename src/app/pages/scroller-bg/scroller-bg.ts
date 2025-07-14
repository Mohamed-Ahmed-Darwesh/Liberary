import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, signal, viewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ImagI } from '../../CORE/interfaces/imag-i';

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
  trigger = viewChild<ElementRef>('trigger');
  
  // Available image sources
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
  private readonly colSpans = [ 2,4,3,4,2,3,3];
  private readonly randomNum = [1,2,3,4,5]
  randomizedElements: ImagI[] = [];

  private readonly platform_id = inject(PLATFORM_ID);


  private generateRandomizedElements(): void {
    
    const numElements = 30; // 50-60 elements
    
    for (let i = 0; i < numElements; i++) {
      const speed = Math.random() * 1.1 + 0.5;
      
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platform_id)) {
      this.generateRandomizedElements();
      Promise.resolve().then(() => {
        this.ScrollSmootherBg();
        ScrollTrigger.refresh();
      });
    }
  }
    


  private ScrollSmootherBg(): void {
    const WrapperNativ = this.wrapper()?.nativeElement;
    const ImgsNativ = this.imgs()?.nativeElement;

    let skewSetter = gsap.quickTo(ImgsNativ, "skewY");
    let clamp = gsap.utils.clamp(-15, 15);
    

    ScrollSmoother.create({
      wrapper: WrapperNativ,
      content: ImgsNativ,
      smooth: 2,
      speed: 3,
      effects: true,
      onUpdate: self => {
        skewSetter(clamp(self.getVelocity() / -50));
      },
      onStop: () => {
        skewSetter(0);
      }
    });

    gsap.utils.toArray("img[data-speed]").forEach((img: any) => {
      const speed = parseFloat(img.getAttribute("data-speed")) || 1;
    
      gsap.to(img, {
        y: () => -(window.innerHeight * speed),
        ease: "none",
        scrollTrigger: {
          trigger: img,
          scrub: true
        }
      });
    });
  }
}
