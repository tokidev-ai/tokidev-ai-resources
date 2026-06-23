import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styles: `
    @keyframes scroll-bounce {
      0%, 100% { transform: translateY(0);   opacity: 0.3; }
      50%       { transform: translateY(6px); opacity: 0.7; }
    }
    @keyframes card-float {
      0%, 100% { transform: rotate(2deg) translateY(0px); }
      50%       { transform: rotate(2deg) translateY(-10px); }
    }
    @keyframes card-float-slow {
      0%, 100% { transform: rotate(-6deg) translateY(0px); }
      50%       { transform: rotate(-6deg) translateY(-14px); }
    }
    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50%       { background-position: 100% 50%; }
    }
    .scroll-bounce    { animation: scroll-bounce 2s ease-in-out infinite; }
    .card-float       { animation: card-float 5s ease-in-out infinite; }
    .card-float-slow  { animation: card-float-slow 7s ease-in-out infinite; }

    .animate-gradient-shift {
      background-size: 200% auto;
      animation: gradient-shift 6s ease infinite;
    }

    .hero-spotlight {
      background: 
        radial-gradient(
          600px circle at var(--mx, 60%) var(--my, 50%),
          rgba(239, 108, 74, 0.12),
          transparent 50%
        ),
        radial-gradient(
          500px circle at calc(100% - var(--mx, 60%)) calc(100% - var(--my, 50%)),
          rgba(147, 51, 234, 0.08),
          transparent 50%
        );
    }

    .btn-shine {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.25) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25%) translateX(-120%);
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .group:hover .btn-shine {
      transform: skewX(-25%) translateX(120%);
    }

    .hero-cards a.card-float {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .hero-cards a.card-float:hover {
      animation-play-state: paused;
      transform: rotate(0deg) translateY(-8px) scale(1.025) !important;
      border-color: rgba(239, 108, 74, 0.4);
      box-shadow: 0 32px 64px -16px rgba(239, 108, 74, 0.25), 0 0 1px 1px rgba(239, 108, 74, 0.15);
    }
  `,
  host: {
    '(mousemove)': 'onMouseMove($event)',
  },
})
export class LandingPageComponent {
  private readonly el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-line1',  { opacity: 0, y: 60, duration: 0.8 })
        .from('.hero-line2',  { opacity: 0, y: 60, duration: 0.8 }, '-=0.55')
        .from('.hero-sub',    { opacity: 0, y: 24, duration: 0.7 }, '-=0.4')
        .from('.hero-cta',    { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from('.hero-cue',    { opacity: 0, duration: 0.5 },        '-=0.2')
        .from('.hero-cards',  { opacity: 0, x: 40, duration: 1.0, ease: 'power3.out' }, 0.3);

      // GSAP ScrollTrigger Pinned Scale & Reveal Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-text-trigger-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        }
      });

      scrollTl.fromTo('.scroll-scaling-text', 
        { scale: 2.6, opacity: 0.08 },
        { scale: 1, opacity: 1, ease: 'none' }
      )
      .fromTo('.scroll-desc-text',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        '-=0.15'
      );

      // Puzzle-like staggered reveal for Features cards: left, center/bottom, right
      const cards = this.el.nativeElement.querySelectorAll('.features-grid-item');
      if (cards.length >= 3) {
        const featuresTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.features-showcase-section',
            start: 'top 95%',
            end: 'bottom 70%',
            scrub: 1.2,
          }
        });

        featuresTl.from(cards[0], {
          opacity: 0,
          x: -140,
          y: 60,
          rotate: -8,
          duration: 0.5,
          ease: 'power1.out'
        }, 0)
        .from(cards[1], {
          opacity: 0,
          y: 140,
          scale: 0.88,
          duration: 0.5,
          ease: 'power1.out'
        }, 0.25)
        .from(cards[2], {
          opacity: 0,
          x: 140,
          y: -60,
          rotate: 8,
          duration: 0.5,
          ease: 'power1.out'
        }, 0.5);
      }

      // Staggered slide-up for How It Works steps
      gsap.from('.step-grid-item', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.how-it-works-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Scale up and fade in for CTA card
      gsap.from('.cta-card-container', {
        opacity: 0,
        scale: 0.93,
        y: 40,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cta-section-wrapper',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  protected onMouseMove(e: MouseEvent): void {
    const hero = this.el.nativeElement.querySelector('.hero-section') as HTMLElement | null;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--mx', `${x}%`);
    hero.style.setProperty('--my', `${y}%`);
  }
}
