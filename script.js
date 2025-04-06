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

// Enhanced fade-in animation on scroll with better performance for GitHub Pages
const fadeElems = document.querySelectorAll('.fade-in');
const slideLeftElems = document.querySelectorAll('.slide-in-left');
const slideRightElems = document.querySelectorAll('.slide-in-right');

const observerOptions = { 
    root: null, 
    rootMargin: '0px', 
    threshold: 0.1 
};

// Observer for fade-in elements with improved performance
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use a timeout to stagger animations slightly for better performance
            setTimeout(() => {
                entry.target.style.animation = 'fadeInAnimation ease 1.2s forwards';
            }, 100);
        }
    });
}, observerOptions);

// Observer for slide-in-left elements
const leftObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'slideInLeft ease 1s forwards';
            }, 150);
        }
    });
}, observerOptions);

// Observer for slide-in-right elements
const rightObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'slideInRight ease 1s forwards';
            }, 200);
        }
    });
}, observerOptions);

// Apply observers to respective elements
fadeElems.forEach(elem => { observer.observe(elem); });
slideLeftElems.forEach(elem => { leftObserver.observe(elem); });
slideRightElems.forEach(elem => { rightObserver.observe(elem); });

// Enhanced code blocks for better display on GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Fix any overflowing code blocks by adding proper wrapping
        block.innerHTML = block.innerHTML
            .replace(/\s{2,}/g, match => {
                return match.replace(/\s/g, '&nbsp;');
            });
        
        // Add syntax highlighting class if not already present
        if (!block.classList.contains('language-python') && 
            !block.classList.contains('language-javascript') &&
            !block.classList.contains('language-html') &&
            !block.classList.contains('language-css')) {
            // Detect language from content (improved)
            if (block.textContent.includes('import') && 
                (block.textContent.includes('def ') || block.textContent.includes('class '))) {
                block.classList.add('language-python');
            } else if (block.textContent.includes('function') || 
                      block.textContent.includes('const ') || 
                      block.textContent.includes('let ')) {
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
    
    // Ensure images load properly or show fallbacks
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.onerror = null; // Prevent infinite loop
            
            // Create fallback element
            const fallback = document.createElement('div');
            fallback.className = 'bg-dark-code rounded-lg p-4 text-center';
            fallback.innerHTML = `<svg class="w-12 h-12 mx-auto text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p>Image unavailable</p>`;
            
            // Replace img with fallback
            if (this.parentNode) {
                this.parentNode.replaceChild(fallback, this);
            }
        };
    });
});

// Enhanced interactions for data visualizations
document.addEventListener('DOMContentLoaded', function() {
    // Animate data bars when they come into view with improved GitHub Pages compatibility
    const dataBars = document.querySelectorAll('.data-bar');
    
    // Initially set heights to 0 with proper CSS transition
    dataBars.forEach(bar => {
        const targetHeight = bar.style.height;
        bar.dataset.targetHeight = targetHeight;
        bar.style.transition = 'height 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
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
    
    // Enhanced code highlighting with better formatting for GitHub Pages
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Improve code block readability with syntax highlighting
        if (block.classList.contains('language-python')) {
            highlightPythonSyntax(block);
        } else if (block.classList.contains('language-javascript')) {
            highlightJavaScriptSyntax(block);
        }
    });
    
    // Simple syntax highlighter functions
    function highlightPythonSyntax(block) {
        const keywords = ['def', 'class', 'import', 'from', 'return', 'self', 'for', 'in', 'if', 'else', 'elif', 'print', 'None', 'True', 'False'];
        const codeText = block.innerHTML;
        
        let highlightedCode = codeText;
        keywords.forEach(keyword => {
            // Only highlight full words, not substrings
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
        });
        
        // Highlight strings
        highlightedCode = highlightedCode
            .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-400">$&</span>')
            // Highlight comments
            .replace(/(#.+?)(?:\n|$)/g, '<span class="text-gray-500">$1</span>');
            
        block.innerHTML = highlightedCode;
    }
    
    function highlightJavaScriptSyntax(block) {
        const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'true', 'false', 'null', 'undefined'];
        const codeText = block.innerHTML;
        
        let highlightedCode = codeText;
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
        });
        
        // Highlight strings
        highlightedCode = highlightedCode
            .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-400">$&</span>')
            // Highlight comments
            .replace(/(\/\/.+?)(?:\n|$)/g, '<span class="text-gray-500">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>');
            
        block.innerHTML = highlightedCode;
    }
});
