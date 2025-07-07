import { Component, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomePage } from "./pages/home-page/home-page";
import { Navbar } from "./pages/navbar/navbar";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
