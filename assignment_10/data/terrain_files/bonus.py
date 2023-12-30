from PIL import Image
import numpy as np

# Load the image
img = Image.open('./Lugano.png').convert('I')  # Convert to grayscale

# Extract the 16-bit grayscale data
img_data_16bit = np.array(img)

# Split the 16-bit data into two 8-bit values for red and green channels
img_data_8bit_r = (img_data_16bit >> 8).astype('uint8')  # Higher-order bits for red channel
img_data_8bit_g = (img_data_16bit & 0xFF).astype('uint8')  # Lower-order bits for green channel

# Create a new image with the R and G channels, and an empty B channel
new_img_data = np.stack((img_data_8bit_r, img_data_8bit_g, np.zeros_like(img_data_8bit_r)), axis=-1)

# Convert back to an image
new_img = Image.fromarray(new_img_data, 'RGB')

# Save the new image
new_img_path = './Lugano_16bit_to_8bit_RGB.png'
new_img.save(new_img_path)
new_img_path
