import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins

// Lifts the subject out of a photo with the same Vision request Photos uses, then
// places her on a soft blush backdrop.   usage: lift <in.jpg> <out.png> <mask.png>
let args = CommandLine.arguments
guard args.count >= 4,
      let input = CIImage(contentsOf: URL(fileURLWithPath: args[1]),
                          options: [.applyOrientationProperty: true]) else {
    print("cannot read input"); exit(1)
}

let handler = VNImageRequestHandler(ciImage: input, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let observation = request.results?.first else { print("no subject found"); exit(2) }
print("instances found:", observation.allInstances.count)

let buffer = try observation.generateScaledMaskForImage(forInstances: observation.allInstances,
                                                         from: handler)
var mask = CIImage(cvPixelBuffer: buffer)
let context = CIContext()
let space = CGColorSpace(name: CGColorSpace.sRGB)!

// Vision treats the small see-through gap between her arm and her waist as part of
// her, so the original lit board shows through it. Inside that one spot, drop any
// pixel that leans blue. Skin and the lavender saree never do.
do {
    let w = Int(input.extent.width), h = Int(input.extent.height)
    var rgba = [UInt8](repeating: 0, count: w * h * 4)
    context.render(input, toBitmap: &rgba, rowBytes: w * 4, bounds: input.extent,
                   format: .RGBA8, colorSpace: space)
    var m = [UInt8](repeating: 0, count: w * h)
    context.render(mask, toBitmap: &m, rowBytes: w, bounds: input.extent,
                   format: .R8, colorSpace: nil)
    var cleared = 0
    for y in 2040..<2340 {
        for x in 795..<900 {
            let i = y * w + x
            if m[i] > 0 && Int(rgba[i * 4 + 2]) > Int(rgba[i * 4]) + 6 { m[i] = 0; cleared += 1 }
        }
    }
    print("cleared", cleared, "pixels in the gap; nonzero mask px:", m.filter { $0 > 0 }.count)
    // Raw bytes come back with the first row at the bottom, so turn it the right way up.
    // Back to a grayscale image, rows in the same order they were read out.
    var gray = [UInt8](repeating: 255, count: w * h * 4)
    for i in 0..<(w * h) { gray[i * 4] = m[i]; gray[i * 4 + 1] = m[i]; gray[i * 4 + 2] = m[i] }
    mask = CIImage(bitmapData: Data(gray), bytesPerRow: w * 4, size: CGSize(width: w, height: h),
                   format: .RGBA8, colorSpace: nil)
}

print("mask extent before blur:", mask.extent)
// A hair of feathering takes the hard cut off the curls.
let blur = CIFilter.gaussianBlur()
blur.inputImage = mask.clampedToExtent()
blur.radius = 1.2
mask = blur.outputImage!.cropped(to: input.extent)

// Backdrop: lighter blush at the top, a touch deeper at the bottom, so she lifts off it.
let gradient = CIFilter.linearGradient()
gradient.point0 = CGPoint(x: 0, y: input.extent.height)
gradient.point1 = CGPoint(x: 0, y: 0)
gradient.color0 = CIColor(red: 0.941, green: 0.863, blue: 0.886)
gradient.color1 = CIColor(red: 0.890, green: 0.776, blue: 0.812)
let backdrop = gradient.outputImage!.cropped(to: input.extent)

let blend = CIFilter.blendWithMask()
blend.inputImage = input
blend.backgroundImage = backdrop
blend.maskImage = mask
let result = blend.outputImage!

try context.writePNGRepresentation(of: result, to: URL(fileURLWithPath: args[2]),
                                   format: .RGBA8, colorSpace: space)
try context.writePNGRepresentation(of: mask, to: URL(fileURLWithPath: args[3]),
                                   format: .RGBA8, colorSpace: space)
print("done", Int(input.extent.width), "x", Int(input.extent.height))
