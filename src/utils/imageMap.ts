const imageMap: {
  [key: string]: any;
} = {
  "Image-3.png": require("@assets/image-3.png"),
  "Leading-icon.png": require("@assets/Leading-icon.png"),
  "Group-342.png": require("@assets/Group-342.png"),
  "Group-342-2.png": require("@assets/Group-342-2.png"),
  "Group-341.png": require("@assets/Group-341.png"),
  "Group-275.png": require("@assets/Group-275.png"),
  "Group-310.png": require("@assets/Group-310.png"),
  "Layer-1.png": require("@assets/Layer-1.png"),
  "dive-feeding.jpg": require("@assets/dive-feeding.jpg"),
  "cheese-shark.jpg": require("@assets/cheese-shark.jpg"),
  "alligator-gar.jpg": require("@assets/alligator-gar.jpg"),
  "sea-fish.jpg": require("@assets/sea-fish.jpg")
};
export const mapImage = (imageName: string): any => {
  if (imageMap[imageName]) {
    return imageMap[imageName];
  } else {
    console.warn(`Image not found: ${imageName}`);
    return null;
  }
};