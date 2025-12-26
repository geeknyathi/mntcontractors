# Logo Implementation Guide - MNT Contractors

## Current Logo Setup

The website is now configured to display both an image logo AND a text fallback logo, ensuring your brand is visible on all devices.

## How It Works

### Logo Display Hierarchy:
1. **Image Logo** (if `assets/images/logo.png` exists) - Displays your actual logo
2. **Text Logo** (fallback) - Shows "MNT" and "Contractors" if image fails to load

### Current Logo Structure:
```html
<div class="logo">
    <a href="/" class="logo-link">
        <!-- Logo Image (replace src with your logo) -->
        <img src="assets/images/logo.png" alt="MNT Contractors Logo" class="logo-img" loading="eager">
        <!-- Fallback Text Logo -->
        <span class="logo-text">MNT</span>
        <span class="logo-subtext">Contractors</span>
    </a>
</div>
```

## Step-by-Step Setup

### Step 1: Extract Logo from Your Website

The logo is located here on your current site:
```
https://mntcontractors.co.zw/wp-content/uploads/[logo-file-name]
```

**How to get it:**
1. Visit: https://mntcontractors.co.zw/
2. Right-click the logo image in the header
3. Select "Save image as..."
4. Save as `logo.png` or `logo.svg` (PNG preferred for compatibility)

### Step 2: Optimize Your Logo

Before uploading, optimize it:

**Recommended Specifications:**
- Format: PNG or SVG
- Max dimensions: 200x80px
- File size: Under 50KB
- Background: Transparent (PNG) or no background
- Colors: Your brand colors (#002039 blue, #FBAE17 orange)

**Tools to optimize:**
- TinyPNG.com - Compress PNG files
- ImageResizer.com - Resize to correct dimensions
- Inkscape (free) - Convert to SVG

### Step 3: Create Assets Folder

Create the `/assets/images/` folder if it doesn't exist:

```
mnt-contractors/
├── assets/
│   ├── styles.css
│   ├── script.js
│   └── images/           ← CREATE THIS FOLDER
│       └── logo.png      ← PUT YOUR LOGO HERE
├── index.html
├── contact.html
└── ... (other files)
```

### Step 4: Upload Your Logo

Upload your optimized logo to `assets/images/logo.png`

### Step 5: Verify It Works

1. Open your website in a browser
2. Check the logo displays in the header
3. Test on mobile devices (use browser DevTools)
4. Verify the logo is responsive and scales correctly

## Responsive Logo Sizing

The logo automatically scales based on screen size:

| Screen Size | Logo Height | Max Width |
|---|---|---|
| Desktop (1200px+) | 50px | 150px |
| Tablet (768px-1199px) | 45px | 140px |
| Mobile (481px-767px) | 40px | 120px |
| Small Mobile (max 480px) | 35px | 100px |

**CSS Styling:**
```css
.logo-img {
    height: 50px;           /* Desktop default */
    width: auto;            /* Maintains aspect ratio */
    max-width: 150px;
    object-fit: contain;    /* Prevents distortion */
}

/* Tablet adjustment */
@media (max-width: 768px) {
    .logo-img {
        height: 45px;
        max-width: 140px;
    }
}

/* Small mobile */
@media (max-width: 480px) {
    .logo-img {
        height: 35px;
        max-width: 120px;
    }
}
```

## File Types: PNG vs SVG

### PNG Logo
✅ **Pros:**
- Works in all browsers
- Easy to export from any design tool
- Transparent background support
- Smaller file sizes when optimized

❌ **Cons:**
- Not scalable (some blurriness on very large screens)
- Must be pre-sized correctly

**Use PNG if:**
- You have a raster (non-vector) logo
- File is already in PNG format
- You want maximum browser compatibility

### SVG Logo
✅ **Pros:**
- Perfect scalability at any size
- Smaller file sizes
- Can be animated with CSS/JS
- Easy to change colors with CSS

❌ **Cons:**
- Some older browsers don't support (rare)
- Requires proper export from design tool

**Use SVG if:**
- You have a vector logo (Adobe Illustrator, Figma, Sketch)
- File is already in SVG format
- You want maximum quality at all sizes

## How to Convert Your Logo

### If You Have a PNG Logo:
1. Open in Photoshop or GIMP
2. Crop to exact size (no extra padding)
3. Ensure transparent background
4. Export as PNG with transparency
5. Compress with TinyPNG.com

### If You Have an SVG Logo:
1. Open in Inkscape or VS Code
2. Verify dimensions (viewBox attribute)
3. Ensure colors use your brand colors
4. Export as SVG
5. Update colors if needed with CSS

### Convert PNG to SVG:
Use free online tools:
- Potrace.org - Convert images to vectors
- Online-Convert.com - Batch conversions
- Vector Magic - Professional conversion

## Fallback Text Logo

If the image fails to load, your website displays:
```
MNT
Contractors
```

This ensures your site is still branded even if:
- Network is slow
- Image path is incorrect
- Browser doesn't support the format

**Styling the Text Logo:**
```css
.logo-text {
    font-size: 24px;        /* Desktop */
    font-family: 'Playfair Display', serif;
    color: #002039;         /* Your blue */
    font-weight: 800;
}

.logo-subtext {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #FBAE17;         /* Your orange accent */
}
```

## Testing Your Logo

### On Desktop:
- Open at 1200px width - logo should be 50px tall
- Hover over logo - should have slight scale effect
- Check alignment with navigation

### On Tablet:
- Open at 768px width - logo should be 45px tall
- Navigation should still be visible
- Logo shouldn't overlap menu items

### On Mobile:
- Open at 375px width - logo should be 35-40px tall
- Menu toggle should still be accessible
- Logo shouldn't crowd the hamburger menu

### Browser Compatibility:
- Chrome - ✅ Works perfectly
- Firefox - ✅ Works perfectly
- Safari - ✅ Works perfectly
- Edge - ✅ Works perfectly
- IE 11 - ⚠️ PNG works, SVG might have issues

## Quick Implementation

### The Absolute Fastest Way:

1. Visit your current website: https://mntcontractors.co.zw/
2. Right-click logo → "Save image as..."
3. Save as `logo.png`
4. Create folder: `assets/images/`
5. Put `logo.png` in that folder
6. Done! Your logo now displays on the new site

## Troubleshooting

### Logo Not Showing?
1. **Check file path:** Ensure `assets/images/logo.png` exists
2. **Check file permissions:** File should be readable
3. **Check file format:** Must be PNG, SVG, JPG, or WebP
4. **Check file size:** Shouldn't be over 100KB
5. **Clear cache:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Logo Looks Blurry?
1. **Resize correctly:** Should be 200x80px or close to it
2. **Use PNG with transparency:** Not JPG with background
3. **Check resolution:** Export at 2x size for sharp display
4. **Consider SVG:** Convert to SVG for perfect scalability

### Logo Doesn't Fit?
1. **Adjust `max-width` in CSS:** Reduce from 150px to 120px
2. **Adjust `height` in CSS:** Reduce from 50px to 40px
3. **Use SVG:** Scales perfectly without distortion
4. **Crop logo:** Remove excess padding from image

### Logo Changes Color?
The text fallback uses:
- **"MNT" text:** #002039 (your blue)
- **"Contractors" text:** #FBAE17 (your orange accent)

If you want to change these, edit `assets/styles.css`:
```css
.logo-text {
    color: YOUR_DESIRED_COLOR;  /* Change MNT color */
}

.logo-subtext {
    color: YOUR_DESIRED_COLOR;  /* Change Contractors color */
}
```

## Mobile-Specific Considerations

### Why Responsive Logo Matters:
- **Desktop:** More space, can show larger logo
- **Tablet:** Medium space, slightly smaller logo
- **Mobile:** Limited space, must be compact
- **Small Mobile:** Very limited space, minimal logo

### Mobile Best Practices:
1. ✅ Logo height should be 35-50px on mobile
2. ✅ Logo width should be under 120px on mobile
3. ✅ Transparent background for clean look
4. ✅ Simple, bold design (not too many details)
5. ✅ Test on actual mobile devices

### Common Mobile Issues:
| Issue | Solution |
|---|---|
| Logo too large on mobile | Reduce height in 480px media query |
| Logo too small and hard to see | Increase height or consider smaller nav |
| Logo overlaps menu button | Increase navbar height or reduce logo size |
| Logo looks blurry | Switch to SVG or higher resolution PNG |
| Logo crops on landscape | Adjust max-width for landscape orientation |

## Final Checklist

- [ ] Extract logo from current website
- [ ] Optimize logo (correct size, transparency)
- [ ] Create `assets/images/` folder
- [ ] Upload logo as `logo.png`
- [ ] Test on desktop (logo should appear)
- [ ] Test on tablet (logo should scale)
- [ ] Test on mobile (logo should be readable)
- [ ] Check browser compatibility
- [ ] Verify hover effect works
- [ ] Test with slow network (check fallback)

## File Specifications Summary

```
File Name:     logo.png
Location:      assets/images/logo.png
Format:        PNG (or SVG)
Dimensions:    200x80px (or similar aspect ratio)
Size:          Under 50KB
Colors:        #002039 (blue) and #FBAE17 (orange)
Background:    Transparent
Quality:       High resolution (preferably 2x size)
```

## Need Help?

**Logo looks wrong?** 
- Check if the image exists at `assets/images/logo.png`
- Verify filename is exactly `logo.png` (case-sensitive)

**Logo won't display?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try different format (PNG, SVG, JPG)
- Upload to correct folder

**Logo too big/small?**
- Edit `.logo-img` height in `assets/styles.css`
- Adjust for different screen sizes in media queries

Your logo is now fully integrated and responsive across all devices! 🎯
