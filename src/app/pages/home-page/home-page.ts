import { isPlatformBrowser } from '@angular/common';
import { RandomQuote } from './../../CORE/services/randomQuoteService/random-quote';
import { Component, inject, OnInit, signal, WritableSignal, viewChild, viewChildren, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../CORE/services/flow-bite';
import { initFlowbite } from 'flowbite';
import gsap from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother);


@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements AfterViewInit {
  private readonly flowbiteService = inject(FlowbiteService)
  private readonly randomQuoteService = inject(RandomQuote)
  private readonly platform_id  = inject(PLATFORM_ID)

  animatedR = viewChildren<ElementRef>('animateR')
  animatedL = viewChild<ElementRef>('animateL')
  wrapper = viewChild<ElementRef>('wrapper')
  imgs = viewChild<ElementRef>('images')


  QuoteData:WritableSignal<any> = signal({})

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    
    this.randomQuote()
    
    if(isPlatformBrowser(this.platform_id)){
      this.animateFadeInsec1()
      this.velocityImgs()
    }
  }


  animateFadeInsec1(): void {
    this.animateFromRightsec1();
    this.animateFromLeftsec1();
  }
  
  private animateFromRightsec1(): void {
    const animateList = this.animatedR();
    const isMobile = window.innerWidth < 640
    const xAxis =  isMobile ? -150 : -200
    const stagger = isMobile ? .4:.2
    const dur = isMobile ? 1: 2
    const elements = animateList.map(ref => ref.nativeElement);
  
      gsap.set(elements, {
        x: xAxis,
        opacity: 0,
      });
      gsap.to(elements, {
        x: 0,
        opacity: 1,
        duration: dur,
        ease: "power1.out",
        stagger: stagger,
      });
  }
  
  private animateFromLeftsec1(): void {
    const imgEl = this.animatedL()?.nativeElement;
    if (imgEl) {
      // from initial state
      gsap.from(imgEl, {
        x: 200,
        opacity: 0,
      });

      gsap.to(imgEl, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      });
    }
  }


  private velocityImgs():void{
    const WrapperNativ = this.wrapper()?.nativeElement
    const ImgsNativ = this.imgs()?.nativeElement
    let skewSetter = gsap.quickTo(ImgsNativ, "skewY"), // fast
	  clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

    ScrollSmoother.create({
      wrapper: WrapperNativ,
      content: ImgsNativ,
      smooth: 2,
      speed: 3,
      effects: true,
      onUpdate: self => skewSetter(clamp(self.getVelocity() / -50)),
      onStop: () => skewSetter(0)
    });

  }


  randomQuote(){
    this.randomQuoteService.RandomQuote().subscribe({
      next:(res)=>{
        console.log(res)
        this.QuoteData.set(res.data)
      },
      error: (err)=>{
        console.log('fgokdijtoid',err)
      }
    })
  }
}
