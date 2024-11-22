import { Component, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('coursesSection') coursesSection!: ElementRef;
  @ViewChild("dialog") dialog: ElementRef|undefined;
  @ViewChild('contactForm') contactForm!: ElementRef;
  successMessage: string = '';
  sendingContact = false;
  sendingFeedback = false;

  showAboutUs: boolean = false;
  showCourses: boolean = false; // Track the visibility of courses section
  paymentStatusMessage = '';
  

  ngAfterViewInit(): void {
    console.log(this.dialog);
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const paymentStatus = params['paymentStatus'];
      const level = params['level'];
      if (paymentStatus === 'success') {
        this.paymentStatusMessage = `Payment for ${level} level was successful.`;
      } else if (paymentStatus === 'cancel') {
        this.paymentStatusMessage = `Payment for ${level} level was cancelled.`;
      }
    });
  }

  openPayment(level: string, amount: number) {
    const razorpayOptions = {
      "key": "rzp_live_zDlAIrO4DM4G09", // Replace with your Razorpay Key ID
      "amount": amount * 100, // Razorpay expects the amount in paise
      "currency": "INR",
      "name": "Chess Academy", // Replace with your business name
      "description": `Payment for ${level} Course`,
      "image": "https://example.com/your_logo", // Your logo URL
      "order_id": "", // You may generate the order_id from the backend
      "handler": (response: any) => {
        // This function is called after successful payment
        alert('Payment Successful!');
        console.log(response);
        this.paymentStatusMessage = `Payment for ${level} was successful. Payment ID: ${response.razorpay_payment_id}`;
        // You may redirect or save the payment info
      },
      "prefill": {
        "name": "Your User", // Prefill customer's details if available
        "email": "user@example.com",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Chess Academy Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    const rzp1 = new (window as any).Razorpay(razorpayOptions);

    rzp1.on('payment.failed', (response: any) => {
      alert('Payment Failed');
      console.error(response.error);
      this.paymentStatusMessage = `Payment for ${level} failed. Reason: ${response.error.description}`;
    });

    rzp1.open();
  }


  // EmailJS function to send an email
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm('service_lq3hc2w', 'template_s50rfs4', e.target as HTMLFormElement, {
        publicKey: 'MSUsbXow5-dIL1Gzc',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          this.successMessage = 'Your message has been sent successfully!';
          this.contactForm.nativeElement.reset(); // Clear the form fields
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
          this.successMessage = 'There was an error sending your message. Please try again.';
        }
      );
  }


  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const imageElement = this.el.nativeElement.querySelector('.center-image');
    const { clientX, clientY } = event;
    const moveX = (clientX - window.innerWidth / 2) * 0.02;
    const moveY = (clientY - window.innerHeight / 2) * 0.02;

    this.renderer.setStyle(imageElement, 'transform', `translate(${moveX}px, ${moveY}px)`);
  }

  toggleAboutUs() {
    this.showAboutUs = !this.showAboutUs;
    if (this.showAboutUs) {
      setTimeout(() => {
        document.querySelector('.about-us-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 600); // Wait for animation to finish
    }
  }
  
  scrollToCourses() {
    this.showAboutUs = false; // Ensure About Us section is hidden
    this.coursesSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToHome() {
    this.showAboutUs = false;
    this.showCourses = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToContact() {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
