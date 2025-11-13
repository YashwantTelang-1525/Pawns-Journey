import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
     // image paths (update to match files in src/assets/gallery)
  galleryImages: string[] = [
    'assets/gallery/16.jpg',
    'assets/gallery/15.jpg',
    'assets/gallery/11.jpg',
    'assets/gallery/12.jpg',
    'assets/gallery/3.jpg',
    'assets/gallery/4.jpg',
    'assets/gallery/5.jpg',
    'assets/gallery/6.jpg',
    'assets/gallery/7.jpg',
    'assets/gallery/8.jpg',
    'assets/gallery/17.jpg','assets/gallery/18.jpg','assets/gallery/19.jpg',
  ];

  // current slide index
  currentIndex = 0;

  // public methods used by the template
  public nextImage(): void {
    if (this.currentIndex < this.galleryImages.length - 1) {
      this.currentIndex++;
    }
  }

  public prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // helper in case you want to jump to a specific index
  public goTo(index: number): void {
    if (index >= 0 && index < this.galleryImages.length) {
      this.currentIndex = index;
    }
  }
}
