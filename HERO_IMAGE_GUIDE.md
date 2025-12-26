# Hero Image Setup Guide - MNT Contractors

## Current Hero Image

The homepage currently uses a professional interior/modern space image from Unsplash:
```
https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop
```

## How to Replace with Your Own Images

### Option 1: Use Unsplash Professional Ceiling/Interior Images

Replace the image URL in `assets/styles.css` with one of these professional ceiling/interior images:

**Recommended Unsplash Images:**
1. **Modern Ceiling Design** (Best match for your business)
   - URL: `https://images.unsplash.com/photo-1565183938294-7563f3ff588d?w=1600&h=900&fit=crop`
   - Shows: Modern suspended ceiling with lighting

2. **Commercial Ceiling Installation**
   - URL: `https://images.unsplash.com/photo-1565183938294-7563f3ff588d?w=1600&h=900&fit=crop`
   - Shows: Professional interior with detailed ceiling work

3. **Luxury Modern Interior**
   - URL: `https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&h=900&fit=crop`
   - Shows: Contemporary ceiling design with modern aesthetics

4. **Minimalist Interior**
   - URL: `https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1600&h=900&fit=crop`
   - Shows: Clean modern ceiling installation

### Option 2: Use Your Own Professional Photos

**Steps to add your own images:**

1. **Optimize your image:**
   - Dimensions: 1600x900px minimum (16:9 aspect ratio)
   - File size: Under 500KB (for web performance)
   - Format: JPG or WebP for best performance
   - Quality: At least 72 DPI

2. **Tools to optimize:**
   - TinyPNG.com - Compress JPG/PNG
   - ImageResizer.com - Resize to 1600x900
   - ImageOptim - Mac users
   - FileZilla - FTP upload to server

3. **Upload to your server:**
   - Create folder: `/assets/images/`
   - Upload optimized image: `/assets/images/hero-ceiling.jpg`

4. **Update CSS:**
   Edit `assets/styles.css` and change:
   ```css
   .hero-background {
       background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop');
   }
   ```
   
   To:
   ```css
   .hero-background {
       background-image: url('/assets/images/hero-ceiling.jpg');
   }
   ```

### Option 3: Use Multiple Hero Images (Rotation)

For a dynamic hero, you can cycle through different project photos:

Edit `assets/script.js` and add this code in the DOMContentLoaded section:

```javascript
// Hero Image Rotation
const heroImages = [
    '/assets/images/hero-1.jpg',
    '/assets/images/hero-2.jpg',
    '/assets/images/hero-3.jpg',
    '/assets/images/hero-4.jpg'
];

let currentImageIndex = 0;

function rotateHeroImage() {
    const heroBackground = document.querySelector('.hero-background');
    heroBackground.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
}

// Change image every 10 seconds
setInterval(rotateHeroImage, 10000);
```

## Image Recommendations for MNT Contractors

### Best Image Types to Use:
1. **Your completed ceiling projects** - Shows real work quality
2. **Modern suspended ceiling installation** - Shows core business
3. **Residential ceiling transformation** - Shows residential work
4. **Commercial office ceiling** - Shows commercial expertise
5. **Decorative ceiling design** - Shows design capabilities
6. **Team working on installation** - Shows professionalism

### Image Technical Specifications:

| Requirement | Specification |
|---|---|
| Aspect Ratio | 16:9 (1600x900 minimum) |
| File Format | JPG or WebP |
| File Size | 100-500KB (compressed) |
| Resolution | 72-96 DPI |
| Color Depth | RGB |

### Best Practices:

✅ **DO:**
- Use high-quality, professional photos
- Show your actual completed work
- Use images with good lighting
- Ensure ceiling/interior is the focus
- Use images that convey professionalism

❌ **DON'T:**
- Use blurry or low-quality images
- Use stock photos that look generic
- Use images with distracting elements
- Use copyrighted images without permission
- Use images with people if they're recognizable

## Where to Find Quality Ceiling/Interior Images

### Free Stock Photo Sites:
1. **Unsplash** - unsplash.com
   - Search: "ceiling", "interior design", "modern room"
   - Filter: High resolution, commercial use

2. **Pexels** - pexels.com
   - Search: "ceiling", "construction", "interior"

3. **Pixabay** - pixabay.com
   - Search: "office ceiling", "home interior"

### Paid Premium Stock Sites:
1. **Shutterstock** - Professional architectural photos
2. **Getty Images** - High-end interior design
3. **Adobe Stock** - Creative ceiling designs

## Performance Optimization

The hero background image uses:
- **`background-size: cover`** - Fills the entire space
- **`background-position: center`** - Centers the image
- **`background-attachment: fixed`** - Creates parallax effect on desktop
- **Color overlay** - Dark gradient ensures text readability

### Fallback Gradient

If the image fails to load, the gradient overlay will display:
```css
background: linear-gradient(135deg, 
    rgba(0, 32, 57, 0.75) 0%, 
    rgba(0, 61, 92, 0.65) 50%, 
    rgba(0, 16, 32, 0.8) 100%);
```

## Testing Your Image

1. **Desktop view** - Open on large screen
2. **Mobile view** - Check on phone (use dev tools)
3. **Text contrast** - Ensure text is readable over image
4. **Loading time** - Image shouldn't slow down page
5. **Different browsers** - Test in Chrome, Firefox, Safari, Edge

## Updating the Image

### In Production:

1. Replace the URL in `assets/styles.css`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Test across devices
4. Monitor Core Web Vitals

### Current Image Location:
File: `assets/styles.css`
Line: ~424
Property: `.hero-background { background-image: url(...) }`

## CSS Properties Explained

```css
.hero-background {
    background-image: url('IMAGE_URL');
    background-size: cover;              /* Fill entire area */
    background-position: center;         /* Center the image */
    background-attachment: fixed;       /* Parallax effect */
}

.hero-overlay {
    /* Dark gradient overlay for text readability */
    background: linear-gradient(...);
}
```

## Quick Reference: Image URLs to Try

### Ceiling/Interior Focus:
```
Unsplash ceiling/modern interior:
https://images.unsplash.com/photo-1565183938294-7563f3ff588d?w=1600&h=900&fit=crop

Modern office space:
https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&h=900&fit=crop

Contemporary interior:
https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1600&h=900&fit=crop

Luxury home interior:
https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=900&fit=crop

Residential ceiling:
https://images.unsplash.com/photo-1600210174714-fc6003bef5b6?w=1600&h=900&fit=crop
```

## Next Steps

1. **Find/Create the perfect ceiling/interior image**
2. **Optimize it to 1600x900px**
3. **Compress to under 500KB**
4. **Update the URL in `assets/styles.css`**
5. **Test on all devices**
6. **Monitor performance metrics**

---

**Need Help?**
- Compress images: TinyPNG.com
- Find stock images: Unsplash.com
- Resize images: ImageResizer.com
- Test performance: PageSpeed.web.dev

Your hero image is crucial to first impressions. Make it count! 🎯
