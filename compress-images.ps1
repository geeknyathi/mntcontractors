# Image Compression Script
# This script compresses JPEG and PNG images to reduce file size while maintaining quality

param(
    [string]$SourceFolder = ".",
    [int]$JpegQuality = 85,
    [int]$MaxWidth = 1920
)

Add-Type -AssemblyName System.Drawing

function Compress-Image {
    param(
        [string]$ImagePath,
        [int]$Quality = 85,
        [int]$MaxWidth = 1920
    )
    
    try {
        $image = [System.Drawing.Image]::FromFile($ImagePath)
        $originalWidth = $image.Width
        $originalHeight = $image.Height
        
        # Calculate new dimensions if image is too large
        $newWidth = $originalWidth
        $newHeight = $originalHeight
        
        if ($originalWidth -gt $MaxWidth) {
            $newWidth = $MaxWidth
            $newHeight = [int]($originalHeight * ($MaxWidth / $originalWidth))
        }
        
        # Create new bitmap with new dimensions
        $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        # Set up encoder parameters for JPEG quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, 
            $Quality
        )
        
        # Get JPEG codec
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | 
            Where-Object { $_.MimeType -eq 'image/jpeg' }
        
        # Save compressed image
        $image.Dispose()
        $graphics.Dispose()
        
        $newImage.Save($ImagePath, $jpegCodec, $encoderParams)
        $newImage.Dispose()
        
        return $true
    }
    catch {
        Write-Host "Error compressing $ImagePath : $_" -ForegroundColor Red
        if ($image) { $image.Dispose() }
        if ($graphics) { $graphics.Dispose() }
        if ($newImage) { $newImage.Dispose() }
        return $false
    }
}

# Get all JPEG images
$images = Get-ChildItem -Path $SourceFolder -Include *.jpg,*.jpeg -Recurse

$totalImages = $images.Count
$compressed = 0
$failed = 0
$totalSizeBefore = 0
$totalSizeAfter = 0

Write-Host "Found $totalImages images to compress..." -ForegroundColor Cyan

foreach ($img in $images) {
    $sizeBefore = $img.Length
    $totalSizeBefore += $sizeBefore
    
    Write-Host "Compressing: $($img.Name) ($('{0:N2}' -f ($sizeBefore/1KB)) KB)..." -NoNewline
    
    if (Compress-Image -ImagePath $img.FullName -Quality $JpegQuality -MaxWidth $MaxWidth) {
        $sizeAfter = (Get-Item $img.FullName).Length
        $totalSizeAfter += $sizeAfter
        $reduction = (1 - ($sizeAfter / $sizeBefore)) * 100
        
        Write-Host " Done! New size: $('{0:N2}' -f ($sizeAfter/1KB)) KB ($('{0:N1}' -f $reduction)% reduction)" -ForegroundColor Green
        $compressed++
    }
    else {
        $failed++
        Write-Host " Failed!" -ForegroundColor Red
    }
}

Write-Host "`n=== Compression Summary ===" -ForegroundColor Cyan
Write-Host "Total images processed: $totalImages"
Write-Host "Successfully compressed: $compressed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Total size before: $('{0:N2}' -f ($totalSizeBefore/1MB)) MB"
Write-Host "Total size after: $('{0:N2}' -f ($totalSizeAfter/1MB)) MB"
Write-Host "Total reduction: $('{0:N1}' -f ((1 - ($totalSizeAfter / $totalSizeBefore)) * 100))%" -ForegroundColor Green
