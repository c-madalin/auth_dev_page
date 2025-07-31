import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css'
})
export class StarsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('starsCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: any[] = [];
  private shootingStars: any[] = [];
  private animationId!: number;
  public canvasWidth!: number;
  public canvasHeight!: number;
  private resizeListener!: () => void;

  ngOnInit() {
    this.updateCanvasSize();
    this.resizeListener = () => {
      this.updateCanvasSize();
      this.initStars();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.initStars();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private updateCanvasSize() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
  }

  private createStar() {
    return {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      r: Math.random() * 0.8 + 0.2,
      age: 0,
      lifeSpan: Math.random() * 60 + 60,
      opacity: 0,
    };
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < 300; i++) {
      this.stars.push(this.createStar());
    }
  }

  private drawStars() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw regular stars
    for (let s of this.stars) {
      s.age++;
      const halfLife = s.lifeSpan / 2;
      s.opacity = s.age < halfLife ? s.age / halfLife : Math.max(0, 1 - (s.age - halfLife) / halfLife);
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      this.ctx.fill();

      if (s.age >= s.lifeSpan) {
        Object.assign(s, { ...this.createStar(), age: 0 });
      }
    }

    // Draw shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.life++;
      const progress = s.life / s.maxLife;
      const opacity = Math.max(0, 1 - progress);
      const length = s.initialLength * (1 - progress);

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(s.x - length, s.y + length * 0.3);
      this.ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();

      s.x -= s.speed;
      s.y += s.speed * 0.3;

      if (s.life >= s.maxLife) {
        this.shootingStars.splice(i, 1);
      }
    }
  }

  private animate = () => {
    this.drawStars();

    // Create new shooting stars randomly
    if (Math.random() < 0.02 && this.shootingStars.length < 10) {
      this.shootingStars.push({
        x: Math.random() * this.canvasWidth * 0.8 + this.canvasWidth * 0.2,
        y: Math.random() * this.canvasHeight * 0.3,
        initialLength: Math.random() * 50 + 40,
        speed: Math.random() * 4 + 4,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }

    this.animationId = requestAnimationFrame(this.animate);
  }
}
