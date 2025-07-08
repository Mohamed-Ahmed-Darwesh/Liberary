import { Component, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,TextPlugin);

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements AfterViewInit {
  nav = viewChild<ElementRef>('navBar');

  ngAfterViewInit(): void {
    this.animateNavbarFadeIn();
  }

  animateNavbarFadeIn(): void {
    const navEl = this.nav()?.nativeElement;
    if (navEl) {
      gsap.fromTo(navEl, 
        {
          opacity: 0,
          y:-100
        },
        {
          y: 0,
          opacity: 1,
          duration: .7,
          ease: "power1.out",
        }
      );
    }
  }
}
