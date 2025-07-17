const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateRobotImages() {
  const states = ['idle', 'speaking', 'thinking', 'demonstrating'];
  const baseRobot = path.join(__dirname, '../public/images/robot/robot-base.svg');
  const outputDir = path.join(__dirname, '../public/images/robot');

  // Read the base SVG
  const svgBuffer = await fs.readFile(baseRobot);
  const svgString = svgBuffer.toString();

  // Generate variations for each state
  for (const state of states) {
    let modifiedSvg = svgString;
    
    switch(state) {
      case 'speaking':
        // Modify mouth for speaking
        modifiedSvg = modifiedSvg.replace(
          /<rect x="170" y="160" width="60" height="10"/,
          '<rect x="170" y="160" width="60" height="20"'
        );
        break;
      case 'thinking':
        // Modify eyes for thinking
        modifiedSvg = modifiedSvg.replace(/#4ae3f0/g, '#f04a4a');
        break;
      case 'demonstrating':
        // Modify colors for demonstrating
        modifiedSvg = modifiedSvg.replace(/#4ae3f0/g, '#f0e54a');
        break;
    }

    // Convert to PNG
    await sharp(Buffer.from(modifiedSvg))
      .resize(400, 400)
      .png()
      .toFile(path.join(outputDir, `robot-${state}.png`));
  }

  // Generate circuit pattern
  const circuitSvg = path.join(outputDir, 'circuit-pattern.svg');
  const circuitBuffer = await fs.readFile(circuitSvg);
  
  await sharp(circuitBuffer)
    .resize(200, 200)
    .png()
    .toFile(path.join(outputDir, 'circuit-pattern.png'));
}

generateRobotImages().catch(console.error);
