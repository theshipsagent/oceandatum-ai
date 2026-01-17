# Video Background Setup

The glassmorphism landing page supports video backgrounds for maximum visual impact.

## Free Stock Video Sources

### Recommended Sites (100% Free, No Attribution Required):

1. **Pexels Videos** (Best Option)
   - URL: https://www.pexels.com/search/videos/ocean%20drone/
   - Search terms: "ocean drone", "ship aerial", "maritime drone"
   - Download MP4 format
   - Completely free for commercial use

2. **Pixabay**
   - URL: https://pixabay.com/videos/search/ocean/
   - High-quality videos
   - No attribution required

3. **Coverr**
   - URL: https://coverr.co/
   - Curated collection
   - Beautiful cinematography

## Recommended Videos from Pexels:

Example searches that match your desired aesthetic:
- "cargo ship drone" - aerial footage of ships
- "ocean waves aerial" - beautiful water movement
- "maritime port drone" - port operations from above
- "container ship aerial" - commercial shipping

## Setup Instructions:

### Option 1: Add Video File (Recommended)

1. Download your chosen video from Pexels/Pixabay
2. Rename it to: `ocean-drone.mp4`
3. Place it in: `public/ocean-drone.mp4`
4. Done! The page will automatically use it

### Option 2: Add Fallback Poster Image

If video is too large or you want a static image:

1. Download a high-res ocean/ship image
2. Rename it to: `ocean-poster.jpg`
3. Place it in: `public/ocean-poster.jpg`
4. The page uses this as a fallback

### Option 3: Remove Video Background

If you prefer no video at all, edit:
```
src/pages/GlassmorphismLandingPage.tsx
```

Comment out or remove the `<video>` element. The gradient background will still look great!

## Video Optimization Tips:

**File Size:**
- Keep video under 10MB for fast loading
- Use 1080p max (not 4K)
- Use online compressors: https://www.freeconvert.com/video-compressor

**Duration:**
- 10-20 seconds is perfect for looping
- Trim longer videos to save bandwidth

**Format:**
- MP4 (H.264 codec) for best browser support
- Use tools like HandBrake for conversion

## Example Pexels Videos I Recommend:

Search these IDs on Pexels:
- 857036 - Aerial ocean waves
- 856012 - Cargo ship at sea
- 3571264 - Container ship from drone
- 4992656 - Ocean surface aerial view

## Legal Note:

**DO NOT use YouTube videos** - even with downloaders. YouTube content is copyrighted.

**Only use:**
- Stock footage from Pexels/Pixabay/Coverr
- Your own footage
- Licensed content you've purchased
- Content with explicit permission from creator

---

Need help? The page works beautifully even without video - the gradient + glass effects + particles create a stunning look on their own!
