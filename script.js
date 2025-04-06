// Simple mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const iconBars = document.getElementById('menu-icon-bars');
    const iconX = document.getElementById('menu-icon-x');
    menu.classList.toggle('hidden');
    iconBars.classList.toggle('hidden'); // Toggle visibility
    iconBars.classList.toggle('block');
    iconX.classList.toggle('hidden'); // Toggle visibility
    iconX.classList.toggle('block');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a, nav a[href^="#"]').forEach(link => { // Include nav links for smooth scroll closure
    link.addEventListener('click', (e) => {
        const menu = document.getElementById('mobile-menu');
        if (!menu.classList.contains('hidden')) {
            // Check if it's the mobile menu toggle button itself
            if (!e.target.closest('button[aria-controls="mobile-menu"]')) {
                toggleMenu(); // Close menu if open and not clicking the button
            }
        }
    });
});

// Simple fade-in animation on scroll
const fadeElems = document.querySelectorAll('.fade-in');
const slideLeftElems = document.querySelectorAll('.slide-in-left');
const slideRightElems = document.querySelectorAll('.slide-in-right');

const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

// Observer for fade-in elements
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInAnimation ease 1.2s forwards';
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for slide-in-left elements
const leftObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft ease 1s forwards';
        }
    });
}, observerOptions);

// Observer for slide-in-right elements
const rightObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInRight ease 1s forwards';
        }
    });
}, observerOptions);

// Apply observers to respective elements
fadeElems.forEach(elem => { observer.observe(elem); });
slideLeftElems.forEach(elem => { leftObserver.observe(elem); });
slideRightElems.forEach(elem => { rightObserver.observe(elem); });

// Enhance code blocks (if any)
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Add line numbers if needed
        const lines = block.textContent.split('\n').length;
        if (lines > 5) {
            block.classList.add('has-line-numbers');
        }
        
        // Add syntax highlighting class if not already present
        if (!block.classList.contains('language-python') && 
            !block.classList.contains('language-javascript') &&
            !block.classList.contains('language-html') &&
            !block.classList.contains('language-css')) {
            // Detect language from content (simplified)
            if (block.textContent.includes('import') && block.textContent.includes('def ')) {
                block.classList.add('language-python');
            } else if (block.textContent.includes('function') && block.textContent.includes('const ')) {
                block.classList.add('language-javascript');
            }
        }
    });

    // Add active class to current nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNav() {
        const scrollPos = window.scrollY + 100; // Offset for better highlighting
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-gold');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('text-gold');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run once on page load
});

// Enhanced interactions for quantum illustrations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to quantum sphere if present
    const quantumSphere = document.querySelector('svg[viewBox="0 0 200 200"]');
    if (quantumSphere) {
        quantumSphere.addEventListener('mouseover', function() {
            this.classList.add('floating');
        });
        
        quantumSphere.addEventListener('mouseout', function() {
            this.classList.remove('floating');
        });
    }
});

// Enhanced interactions for data visualizations
document.addEventListener('DOMContentLoaded', function() {
    // Animate data bars when they come into view
    const dataBars = document.querySelectorAll('.data-bar');
    
    // Initially set heights to 0
    dataBars.forEach(bar => {
        const targetHeight = bar.style.height;
        bar.dataset.targetHeight = targetHeight;
        bar.style.height = '0px';
    });
    
    // Create observer for data bars
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.height = entry.target.dataset.targetHeight;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.2});
    
    // Observe each data bar
    dataBars.forEach(bar => {
        barObserver.observe(bar);
    });
    
    // Enhanced code highlighting
    const codeBlocks = document.querySelectorAll('pre code');
    let lineNumberCounter = 1;
    
    codeBlocks.forEach(block => {
        // Add syntax highlighting effect on scroll
        const lines = block.innerHTML.split('\n');
        let numberedLines = '';
        
        lines.forEach(line => {
            // Skip empty lines at start/end
            if ((lineNumberCounter === 1 || lineNumberCounter === lines.length) && !line.trim()) return;
            
            // Highlight keywords
            const pythonKeywords = ['def', 'class', 'import', 'from', 'return', 'self', 'for', 'in', 'if', 'else', 'elif', 'print'];
            let processedLine = line;
            
            if (block.classList.contains('language-python')) {
                pythonKeywords.forEach(keyword => {
                    // Highlight only exact matches (not substrings within other words)
                    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                    processedLine = processedLine.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
                });
            }
            
            numberedLines += processedLine + '\n';
            lineNumberCounter++;
        });
        
        if (numberedLines) {
            block.innerHTML = numberedLines;
        }
    });
});
