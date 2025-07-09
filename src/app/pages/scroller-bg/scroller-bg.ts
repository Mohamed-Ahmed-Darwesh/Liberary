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
  active:boolean = false
  private readonly platform_id = inject(PLATFORM_ID)

  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platform_id)){
      this.velocityImgs()
    }

    ScrollTrigger.refresh()
  }
  
  private velocityImgs(): void {
    const WrapperNativ = this.wrapper()?.nativeElement;
    const ImgsNativ = this.imgs()?.nativeElement;
    const trigger = this.trigger()?.nativeElement;

    if (!WrapperNativ || !ImgsNativ || !trigger) {
      console.warn('One or more elements are missing:', { WrapperNativ, ImgsNativ, trigger });
      return;
    }

    let skewSetter = gsap.quickTo(ImgsNativ, "skewY");
    let clamp = gsap.utils.clamp(-30, 30);

    // Only create one ScrollSmoother instance


    ScrollTrigger.create({
      trigger: trigger,
      onEnter: () => {
        this.active = true
        console.log(this.active)
      },
      onLeave: () => {
        this.active = false
        console.log(this.active)
      },
      onEnterBack: () => {
        this.active = true
        console.log(this.active)
      },
      onLeaveBack: () => {
        this.active = false
        console.log(this.active)
      }
    });
      ScrollSmoother.create({
        wrapper: WrapperNativ,
        content: ImgsNativ,
        smooth: 2,
        speed: 3,
        effects: true,
      //skewSetter(clamp(self.getVelocity() / -50))
          onUpdate: self =>  {if(this.isActive()) {
            console.log(self.getVelocity())}
          },
          onStop: () => {
            if (this.isActive()) {
            skewSetter(0) 
          }
        }
      })
  }
}
