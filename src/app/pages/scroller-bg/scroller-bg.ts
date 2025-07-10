import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, signal, viewChild, WritableSignal } from '@angular/core';
import gsap from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { isPlatformBrowser } from '@angular/common';

gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

@Component({
  selector: 'app-scroller-bg',
  imports: [],
  templateUrl: './scroller-bg.html',
  styleUrl: './scroller-bg.scss'
})
export class ScrollerBg implements AfterViewInit{
  wrapper = viewChild<ElementRef>('wrapper')
  imgs = viewChild<ElementRef>('images')
  trigger = viewChild<ElementRef>('trigger')

  isActive:WritableSignal<boolean> = signal(false)

  private smoother: any = null;

  private readonly platform_id = inject(PLATFORM_ID)

  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platform_id)){
      this.ScrollSmootherBg()
      setTimeout(()=>{
        this.triggerInitial()
        ScrollTrigger.refresh()
      })
      console.log(this.isActive())
      }
    }
    
  private triggerInitial(): void {
    const trigger = this.trigger()?.nativeElement;
    ScrollTrigger.create({
      trigger: trigger,
      start:'top center',
      end: 'bottom center',
      onEnter: () => {
        this.isActive.set(true);
      },
      onLeave: () => {
        this.isActive.set(false);
      },
      onEnterBack: () => {
        this.isActive.set(true);
      },
      onLeaveBack: () => {
        this.isActive.set(false);
      },
    });
  }

  private ScrollSmootherBg():void{
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
          onUpdate: self =>  {
              skewSetter(clamp(self.getVelocity() / -50));
          },
          onStop: () => {
            skewSetter(0) 
        }
      })  
      
  }

}
