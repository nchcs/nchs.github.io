// Configuration for particles animation
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#4e54c8"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.2, // Reduced opacity
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#4e54c8",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

// Initialize particles.js when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
});

// Create a cool wave animation for section backgrounds
class WaveAnimation {
    constructor(selector) {
        this.canvas = document.querySelector(selector);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.waveElements = [];
        
        this.resize();
        this.setupWaves();
        this.render();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = 300;
    }
    
    setupWaves() {
        const colors = [
            'rgba(78, 84, 200, 0.2)',
            'rgba(78, 84, 200, 0.3)',
            'rgba(78, 84, 200, 0.4)'
        ];
        
        colors.forEach((color, index) => {
            const multiplier = index + 1;
            
            this.waveElements.push({
                color: color,
                amplitude: 20 * multiplier,
                frequency: 0.01 / multiplier,
                offset: Math.random() * 1000,
                speed: 0.005 / multiplier, // Reduced to 5% of original speed (from 0.1 to 0.005)
                points: []
            });
        });
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.waveElements.forEach(wave => {
            wave.points = [];
            wave.offset += wave.speed;
            
            for (let x = 0; x <= this.canvas.width; x += 5) {
                const y = Math.sin(x * wave.frequency + wave.offset) * wave.amplitude + this.canvas.height / 2;
                wave.points.push({x, y});
            }
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvas.height);
            
            wave.points.forEach(point => {
                this.ctx.lineTo(point.x, point.y);
            });
            
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fillStyle = wave.color;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.render());
    }
}

// Initialize the wave animation
document.addEventListener('DOMContentLoaded', function() {
    new WaveAnimation('#wave-canvas');
    
    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / (cardRect.width / 2)) * 10;
            const rotateX = -((mouseY / (cardRect.height / 2)) * 10);
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Add smooth scrolling effect to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const offsetTop = targetElement.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
});
