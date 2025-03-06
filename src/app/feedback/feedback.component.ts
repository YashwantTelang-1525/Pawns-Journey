import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  feedbacks = [
    { text: 'A fantastic learning experience! The structured lessons helped me improve my game tremendously.', author: 'Anayara' },
    { text: 'I never knew chess could be this fun and engaging. The trainers are amazing!', author: 'Divyana Chhabra' },
    { text: 'With their guidance, I gained confidence in my tournament play and strategy.', author: 'Advika Kothia' },
    { text: 'Highly recommended for anyone looking to master chess at any level!', author: 'Dhruv Suthar' },
    { text: 'The best chess coaching! Personalized attention really made a difference in my gameplay.', author: 'Leevinika Biswas' },
    
  ];

  currentIndex = 0;

  nextSlide() {
    if (this.currentIndex < this.feedbacks.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
