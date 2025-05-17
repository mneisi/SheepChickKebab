# Sheepchick Kebab - Website

A modern responsive landing page for Sheepchick Kebab restaurant with bilingual support (English and Greek).

## Features

- Fully responsive design for all screen sizes
- Bilingual support with separate English and Greek pages
- Smooth animations and visual effects
- Interactive menu with category filtering
- Testimonial slider
- Dark mode support with preference memory
- Google Reviews integration (placeholder, ready for API connection)
- Contact form
- Mobile-friendly navigation

## Structure

- `index.html` - Main HTML file (English version)
- `locale/el/index.html` - Greek version
- `css/style.css` - Styling for the website
- `js/script.js` - JavaScript functionality
- `images/` - Directory for all website images

## Image Placeholders

The website is set up with placeholders for the following images:

- `images/sheepchick-logo.png` - Main logo (ideally a transparent PNG)
- `images/hero-bg.jpg` - Hero section background
- `images/placeholder-kebab.jpg` - Menu item image
- `images/placeholder-wrap.jpg` - Menu item image
- `images/placeholder-side.jpg` - Menu item image
- `images/placeholder-drink.jpg` - Menu item image
- `images/placeholder-shop.jpg` - About section image
- `images/google-logo.png` - Google logo for reviews section
- `images/user-placeholder.jpg` - Generic user avatar for reviews

## Dark Mode

The website includes a built-in dark mode feature that:

- Automatically detects user system preference
- Remembers user's choice with localStorage
- Provides an easy toggle in the header
- Offers carefully designed color schemes for both light and dark modes

## Google Reviews Integration

The site includes a placeholder section for Google Reviews that can be connected to the actual Google API. To connect with actual Google Reviews:

1. Sign up for a Google Places API key
2. Replace the static reviews with a JavaScript fetch to the Google Places API
3. Parse and display the data dynamically

## Setup

1. Clone or download this repository
2. Replace placeholder images with actual images
3. Update content in index.html and locale/el/index.html as needed
4. Deploy to your web hosting

## Animations & Effects

The website includes the following animations:

- Scroll reveal effects for content sections
- Hover animations on menu items, buttons, and links
- Testimonial slider with auto-rotation
- Smooth scrolling between sections
- Header transformation on scroll
- Animated hero scroll indicator

## Customization

You can easily customize this website by:

- Changing colors in the CSS `:root` variables
- Adding more menu items
- Updating content in both languages
- Adding more sections as needed

## Browser Support

The website is compatible with all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge
