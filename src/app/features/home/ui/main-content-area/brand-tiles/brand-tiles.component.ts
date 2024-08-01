import {
  AfterViewInit,
  Component,
  Input,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Brand } from '../../../../../shared/models/Brand';

@Component({
  selector: 'app-brand-tiles',
  templateUrl: './brand-tiles.component.html',
})
export class BrandTilesComponent implements OnChanges {
  @Input() brands: Brand[] = [];

  chunkedBrands: Brand[][] = [];

  tableFullShown = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['brands']) {
      this.chunkedBrands = this.chunkBrands(this.brands.slice(0, 10));
    }
  }

  private chunkBrands(brands: Brand[]): Brand[][] {
    return brands.reduce((acc: Brand[][], current: Brand, index: number) => {
      if (index % 5 === 0) {
        acc.push([current]);
      } else {
        acc[acc.length - 1].push(current);
      }
      return acc;
    }, []);
  }

  changeTableView() {
    if(!this.tableFullShown)
    {
      this.chunkedBrands = this.chunkBrands(this.brands);
    }
    else
    {
      this.chunkedBrands = this.chunkBrands(this.brands.slice(0, 10));
    }

    this.tableFullShown = !this.tableFullShown;
  }
}
