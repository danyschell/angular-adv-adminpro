import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;


  constructor() { 

  /*  this.retornaObservable().pipe(
      retry(2)
      ).subscribe(
        valor => console.log('Subs1:',valor),
        (error) => console.warn('Error1:',error),
        () => console.info('obs1 terminado')
    );
  this.retornaObservable().subscribe(
        valor => console.log('Subs2:',valor),
        (error) => console.warn('Error2:',error),
        () => console.info('obs2 terminado')
    );*/

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

      return interval(300)
          .pipe(
            map(valor=>{
              return valor + 1;
            }),
            filter( valor => (valor % 2 === 0)),
            //take(10),
          );
  }
/*
  retornaObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>( observer => {
      
      const intervalo = setInterval( () => {
        
        i++;

        //console.log('i=',i);

        observer.next(i);

        if (i===4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i===2){
          
          observer.error('error llegó a 2');
        }

      }, 1000 )


    });
    

  }
*/
}
