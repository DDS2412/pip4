import {Observable} from 'rxjs';
import {CanDeactivate} from '@angular/router';

export interface ComponentCanDeactivate{
  canDeactivate: () => boolean | Observable<boolean>;
}

export class ExitMainGuard implements CanDeactivate<ComponentCanDeactivate>{

  canDeactivate(component: ComponentCanDeactivate) : Observable<boolean> | boolean{

    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
