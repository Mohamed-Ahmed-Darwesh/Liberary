import { RandomQuote } from './../../CORE/services/randomQuoteService/random-quote';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../CORE/services/flow-bite';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService)
  private readonly randomQuoteService = inject(RandomQuote)


  QuoteData:WritableSignal<any> = signal({})

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.randomQuote()
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
