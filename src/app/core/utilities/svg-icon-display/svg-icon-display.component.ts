import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { COLORS } from './colors';

@Component({
  selector: 'kolesko-icon',
  template: `
    <div [innerHTML]="svgContent"></div>
  `,
})
export class SvgIconDisplayComponent implements OnInit, OnChanges {
  @Input() name: string = 'outline-chevron-right';
  @Input() size?: number;
  @Input() width?: number;
  @Input() height?: number;
  @Input() color: string = '#000000';
  @Input() strokeColor?: string;

  svgContent: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['color'] || changes['name']) {
      this.loadAndModifySvg();
    }
  }

  ngOnInit(): void {
    this.loadAndModifySvg();
  }

  private loadAndModifySvg(): void {
    const iconFilePath = `assets/icons/${this.name}.svg`;
    this.http.get(iconFilePath, { responseType: 'text' }).subscribe({
      next: svg => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.modifySvg(svg));
      },
      error: (error) => {
        console.error(`Error loading icon:`, error);
      }
    });
  }

  private modifySvg(svg: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svg;

    const svgElement = tempDiv.querySelector('svg');

    if (svgElement) {
      if (this.size !== undefined) {
        svgElement.setAttribute('width', `${this.size}`);
        svgElement.setAttribute('height', `${this.size}`);
      } else {
        if (this.width !== undefined) {
          svgElement.setAttribute('width', `${this.width}`);
        }
        if (this.height !== undefined) {
          svgElement.setAttribute('height', `${this.height}`);
        }
      }

      const elementsToColor = svgElement.querySelectorAll('path, circle, rect, polygon, ellipse, line, polyline');

      elementsToColor.forEach(element => {
        if (!element.getAttribute('stroke')) {
          element.setAttribute('fill', this.mapColorToHex(this.color));
        }
        if (this.strokeColor) {
          element.setAttribute('stroke', this.mapColorToHex(this.strokeColor));
        }
      });
    }

    return tempDiv.innerHTML;
  }

  private mapColorToHex(colorClass: string): string {
    const [colorName, shade] = colorClass.split('-');

    if (COLORS[colorName] && COLORS[colorName][shade]) {
      return COLORS[colorName][shade];
    }

    return '#000000';
  }
}