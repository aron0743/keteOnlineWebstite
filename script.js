// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
        });
        
        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = '';
            }
        });
    }
    
    // Generate QR Code
    const qrCodeDiv = document.getElementById('qrCode');
    if (qrCodeDiv) {
        // Replace with your actual APK URL
        const apkUrl = window.location.origin + '/assets/apk/kete-online-v1.0.0.apk';
        
        QRCode.toCanvas(qrCodeDiv, apkUrl, {
            width: 200,
            height: 200,
            margin: 1,
            color: {
                dark: '#2E7D32',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                console.error('QR Code generation failed:', error);
                qrCodeDiv.innerHTML = '<p style="color: #666;">QR Code failed to load.<br>Please use the download button.</p>';
            }
        });
    }
    
    // Download Counter (Simulated)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        let downloadCount = localStorage.getItem('keteDownloads') || 12547;
        
        downloadBtn.addEventListener('click', () => {
            downloadCount++;
            localStorage.setItem('keteDownloads', downloadCount);
            
            // Update stats display if exists
            const statElement = document.querySelector('.hero-stats .stat:first-child span');
            if (statElement) {
                statElement.textContent = downloadCount.toLocaleString() + ' Downloads';
            }
            
            // Analytics event (simulated)
            console.log('Download initiated:', {
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                userAgent: navigator.userAgent
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.feature-card, .screenshot, .rule-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .screenshot, .rule-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .screenshot.animate, .rule-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2) { transition-delay: 0.1s; }
        .feature-card:nth-child(3) { transition-delay: 0.2s; }
        .feature-card:nth-child(4) { transition-delay: 0.3s; }
        .feature-card:nth-child(5) { transition-delay: 0.4s; }
        .feature-card:nth-child(6) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
    
    // Screenshot slider scrolling
    const slider = document.querySelector('.screenshots-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});
    // Video Controls Functionality
    const video = document.querySelector('.mobile-screen-video');
    const playPauseBtn = document.querySelector('[onclick="playPause()"]');
    const fullscreenBtn = document.querySelector('[onclick="toggleFullscreen()"]');
    
    if (video) {
        // Play/Pause functionality
        window.playPause = function() {
            if (video.paused) {
                video.play();
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                }
            } else {
                video.pause();
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
                }
            }
        };
        
        // Fullscreen functionality
        window.toggleFullscreen = function() {
            const videoContainer = document.querySelector('.mobile-video-wrapper');
            if (!document.fullscreenElement) {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.msRequestFullscreen) { /* IE11 */
                    videoContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            }
        };
        
        // Update button text based on video state
        video.addEventListener('play', function() {
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            }
        });
        
        video.addEventListener('pause', function() {
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            }
        });
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (e.target === video || document.querySelector('.mobile-video-wrapper:fullscreen')) {
                switch(e.key.toLowerCase()) {
                    case ' ':
                    case 'k':
                        e.preventDefault();
                        playPause();
                        break;
                    case 'f':
                        e.preventDefault();
                        toggleFullscreen();
                        break;
                    case 'm':
                        e.preventDefault();
                        video.muted = !video.muted;
                        break;
                    case 'arrowleft':
                        e.preventDefault();
                        video.currentTime -= 10;
                        break;
                    case 'arrowright':
                        e.preventDefault();
                        video.currentTime += 10;
                        break;
                    case '0':
                    case 'home':
                        e.preventDefault();
                        video.currentTime = 0;
                        break;
                    case 'end':
                        e.preventDefault();
                        video.currentTime = video.duration;
                        break;
                }
            }
        });
        
        // Auto-generate thumbnail if none exists
        video.addEventListener('loadeddata', function() {
            if (!this.poster || this.poster === '') {
                // Try to capture first frame after 0.5 seconds
                setTimeout(() => {
                    if (this.readyState >= 2) { // HAVE_CURRENT_DATA
                        const canvas = document.createElement('canvas');
                        canvas.width = this.videoWidth || 360;
                        canvas.height = this.videoHeight || 640;
                        const ctx = canvas.getContext('2d');
                        
                        // Draw video frame
                        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                        
                        // Add subtle gradient overlay
                        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                        gradient.addColorStop(0, 'rgba(46, 125, 50, 0.2)');
                        gradient.addColorStop(1, 'rgba(255, 152, 0, 0.2)');
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        
                        // Add "Kete Online" text
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                        ctx.font = 'bold 24px Poppins';
                        ctx.textAlign = 'center';
                        ctx.fillText('Kete Online', canvas.width/2, canvas.height - 50);
                        
                        ctx.font = '16px Poppins';
                        ctx.fillText('Gameplay Demo', canvas.width/2, canvas.height - 20);
                        
                        // Set as poster
                        this.poster = canvas.toDataURL('image/jpeg');
                    }
                }, 500);
            }
        });
        
        // Video progress tracking (optional analytics)
        let lastReportedTime = 0;
        video.addEventListener('timeupdate', function() {
            const currentTime = Math.floor(this.currentTime);
            
            // Report every 5 seconds of viewing
            if (currentTime > lastReportedTime + 4) {
                lastReportedTime = currentTime;
                console.log('Video watched:', {
                    time: currentTime,
                    percent: Math.round((currentTime / this.duration) * 100) + '%',
                    timestamp: new Date().toISOString()
                });
                
                // Optional: Send to analytics
                // if (typeof gtag !== 'undefined') {
                //     gtag('event', 'video_progress', {
                //         'video_title': 'Kete Gameplay',
                //         'progress': percent
                //     });
                // }
            }
        });
        
        // Video ended event
        video.addEventListener('ended', function() {
            console.log('Video completed');
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-redo"></i> Replay';
            }
        });
        
        // Fullscreen change events
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            if (fullscreenBtn) {
                if (document.fullscreenElement || 
                    document.webkitFullscreenElement || 
                    document.msFullscreenElement) {
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
                } else {
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
                }
            }
        }
        
        // Mobile touch controls
        let tapTimer;
        video.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                tapTimer = setTimeout(() => {
                    // Long press - toggle play/pause
                    playPause();
                }, 500);
            }
        });
        
        video.addEventListener('touchend', function(e) {
            clearTimeout(tapTimer);
            if (e.changedTouches.length === 1) {
                const touch = e.changedTouches[0];
                const videoRect = this.getBoundingClientRect();
                const x = touch.clientX - videoRect.left;
                const width = videoRect.width;
                
                // Tap left side: rewind 10s
                if (x < width * 0.3) {
                    this.currentTime = Math.max(0, this.currentTime - 10);
                }
                // Tap right side: forward 10s
                else if (x > width * 0.7) {
                    this.currentTime = Math.min(this.duration, this.currentTime + 10);
                }
                // Tap middle: play/pause (handled by video element default)
            }
        });
        
        // Prevent context menu on video
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    }