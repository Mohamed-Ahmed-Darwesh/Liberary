import { isPlatformBrowser } from '@angular/common';
import { RandomQuote } from './../../CORE/services/randomQuoteService/random-quote';
import { Component, inject, OnInit, signal, WritableSignal, viewChild, viewChildren, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../CORE/services/flow-bite';
import { initFlowbite } from 'flowbite';
import gsap from 'gsap';


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

  QuoteData:WritableSignal<any> = signal({})

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    
    this.randomQuote()
    if(isPlatformBrowser(this.platform_id)){
      this.animateFadeIn()
    }
  }


  animateFadeIn(): void {
    this.animateFromRight();
    this.animateFromLeft();
  }
  
  private animateFromRight(): void {
    const animateList = this.animatedR();

      const elements = animateList.map(ref => ref.nativeElement);
  
      gsap.set(elements, {
        x: -300,
        opacity: 0,
      });
      gsap.to(elements, {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power1.out",
        stagger: 0.2,
      });
  }
  
  private animateFromLeft(): void {
    const imgEl = this.animatedL()?.nativeElement;
    if (imgEl) {
      // Set initial state
      gsap.set(imgEl, {
        x: 300,
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
