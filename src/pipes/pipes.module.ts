import { NgModule } from '@angular/core';
import { ThaiNumberPipe } from './thai-number/thai-number';
@NgModule({
	declarations: [ThaiNumberPipe],
	imports: [],
	exports: [ThaiNumberPipe]
})
export class PipesModule {}
