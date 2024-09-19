import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {PaginationInstance} from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
    @Input('data') meals: string[] = [];
  
    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: 10,
        currentPage: 1
    };
}
