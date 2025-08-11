import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-background',
  templateUrl: './stars-background.component.html',
  styleUrls: ['./stars-background.component.css']
})
export class StarsBackgroundComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stars: any[] = [];
  private shootingStars: any[] = [];

  ngOnInit(): void {
    this.canvas = document.getElementById('stars') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setSize();
    this.initStars();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.setSize();
    this.initStars();
  }

  private setSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createStar() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      r: Math.random() * 0.8 + 0.2,
      age: 0,
      lifeSpan: Math.random() * 60 + 60,
      opacity: 0
    };
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < 300; i++) {
      this.stars.push(this.createStar());
    }
  }

  private drawStars() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let s of this.stars) {
      s.age++;
      const halfLife = s.lifeSpan / 2;
      s.opacity = s.age < halfLife ? s.age / halfLife : Math.max(0, 1 - (s.age - halfLife) / halfLife);
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      this.ctx.fill();
      if (s.age >= s.lifeSpan) Object.assign(s, { ...this.createStar(), age: 0 });
    }

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
      if (s.life >= s.maxLife) this.shootingStars.splice(i, 1);
    }
  }

  private animate() {
    this.drawStars();
    if (Math.random() < 0.02 && this.shootingStars.length < 10) {
      this.shootingStars.push({
        x: Math.random() * this.canvas.width * 0.8 + this.canvas.width * 0.2,
        y: Math.random() * this.canvas.height * 0.3,
        initialLength: Math.random() * 50 + 40,
        speed: Math.random() * 4 + 4,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}
