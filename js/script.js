document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('dark-mode-btn');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    darkModeBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';
        
        if (currentTheme === 'light') {
            targetTheme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Load Menu Data
    loadMenuData();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Normally here you would send the data to a server
            // For this demo, we'll just log it and show an alert
            console.log('Form submitted:', { name, email, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Active Menu Item Based on Scroll Position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Add scrolled class to header
        const header = document.querySelector('header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide
        testimonialSlides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide >= testimonialSlides.length - 1) {
            showSlide(0);
        } else {
            showSlide(currentSlide + 1);
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide <= 0) {
            showSlide(testimonialSlides.length - 1);
        } else {
            showSlide(currentSlide - 1);
        }
    }
    
    // Add event listeners if elements exist
    if (prevBtn && nextBtn) {
        // Next and previous buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Initialize Google Reviews
    initGoogleReviews();
});

// Function to load menu data
function loadMenuData() {
    // Get the current language from html lang attribute
    const currentLanguage = document.documentElement.lang || 'en';
    const ITEMS_PER_PAGE = 6;
    let allItems = [];
    let currentCategory = 'all';
    let currentPage = 1;

    // Determine correct path for menu.json
    let menuJsonPath = 'data/menu.json';
    if (window.location.pathname.includes('/locale/el/')) {
        menuJsonPath = '../../data/menu.json';
    }

    function renderMenuItems() {
        const itemsContainer = document.getElementById('menu-items');
        if (!itemsContainer) return;
        let filteredItems = (currentCategory === 'all')
            ? allItems
            : allItems.filter(item => item.category === currentCategory);
        const start = 0;
        const end = currentPage * ITEMS_PER_PAGE;
        let itemsHTML = '';
        filteredItems.slice(start, end).forEach(item => {
            itemsHTML += `
                <div class="menu-item" data-category="${item.category}">
                    <div class="menu-img">
                        <img src="images/${item.image}" alt="${item.name[currentLanguage]}">
                    </div>
                    <div class="menu-info">
                        <h3>${item.name[currentLanguage]}</h3>
                        <p>${item.description[currentLanguage]}</p>
                        <span class="price">${item.price}</span>
                    </div>
                </div>
            `;
        });
        itemsContainer.innerHTML = itemsHTML;

        // Centered button container
        let btnContainer = document.getElementById('menu-btn-container');
        if (!btnContainer) {
            btnContainer = document.createElement('div');
            btnContainer.id = 'menu-btn-container';
            btnContainer.style.display = 'flex';
            btnContainer.style.justifyContent = 'center';
            btnContainer.style.gap = '1rem';
            btnContainer.style.margin = '2rem 0';
            itemsContainer.parentNode.appendChild(btnContainer);
        }
        btnContainer.innerHTML = '';

        // Load More button
        let loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'load-more-btn';
        loadMoreBtn.className = 'btn';
        loadMoreBtn.textContent = currentLanguage === 'el' ? 'Περισσότερα' : 'Load More';
        loadMoreBtn.onclick = function() {
            currentPage++;
            renderMenuItems();
        };

        // Load Less button
        let loadLessBtn = document.createElement('button');
        loadLessBtn.id = 'load-less-btn';
        loadLessBtn.className = 'btn';
        loadLessBtn.textContent = currentLanguage === 'el' ? 'Λιγότερα' : 'Load Less';
        loadLessBtn.onclick = function() {
            if (currentPage > 1) {
                currentPage--;
                renderMenuItems();
            }
        };

        // Show/hide buttons
        if (filteredItems.length > end) {
            btnContainer.appendChild(loadMoreBtn);
        }
        if (currentPage > 1) {
            btnContainer.appendChild(loadLessBtn);
        }
        if (filteredItems.length <= ITEMS_PER_PAGE && currentPage === 1) {
            btnContainer.innerHTML = '';
        }
    }

    fetch(menuJsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allItems = data.items;
            // Populate menu categories
            const categoriesContainer = document.getElementById('menu-categories');
            if (categoriesContainer) {
                let categoriesHTML = '';
                data.categories.forEach(category => {
                    categoriesHTML += `
                        <button class="category-btn ${category.id === 'all' ? 'active' : ''}" 
                                data-category="${category.id}">
                            ${category.name[currentLanguage]}
                        </button>
                    `;
                });
                categoriesContainer.innerHTML = categoriesHTML;
                // Add event listeners to category buttons
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const category = btn.getAttribute('data-category');
                        // Reset active state
                        document.querySelectorAll('.category-btn').forEach(b => {
                            b.classList.remove('active');
                        });
                        // Add active state to clicked button
                        btn.classList.add('active');
                        // Set current category and reset page
                        currentCategory = category;
                        currentPage = 1;
                        renderMenuItems();
                    });
                });
            }
            renderMenuItems();
        })
        .catch(error => {
            console.error('Error loading menu data:', error);
            // Fallback content if menu load fails
            const itemsContainer = document.getElementById('menu-items');
            if (itemsContainer) {
                itemsContainer.innerHTML = '<p>Menu is temporarily unavailable. Please check back later.</p>';
            }
        });
}

// Function to initialize Google Reviews
function initGoogleReviews() {
    // The Google Reviews section is now static HTML
    // No need for dynamic functionality with the simplified badge approach
    
    // We keep this empty function to maintain compatibility with existing code
    console.log('Google Reviews badge is now static');
}

// Helper function to generate star icons
function getStarIcons(rating) {
    let stars = '';
    
    // Full stars
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (rating % 1 >= 0.5) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
} 