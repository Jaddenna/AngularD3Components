import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAxisContent]',
})
export class AxisContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
