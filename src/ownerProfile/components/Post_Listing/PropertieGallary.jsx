import React, { useState } from 'react';
import authService from './../../../services/Auth_JwtApi/AuthService';
import './Style/PropertyGallery.css';

const PropertyGallery = ({ setFieldValue }) => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(
      (file) => file.size <= 8000000 && (file.type === 'image/jpeg' || file.type === 'image/png')
    );

    if (validImages.length + images.length > 10) {
      alert('You can only upload a maximum of 10 images.');
      return;
    }

    setImages((prev) => [...prev, ...validImages]);
    setFieldValue('images', [...images, ...validImages]); // Update centralized state
    const previews = validImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert('Please select images to upload.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      images.forEach((image) => formData.append('images', image));
      const response = await authService.uploadImages(formData);
      console.log('Images uploaded:', response);
      alert('Images uploaded successfully');
      setImages([]);
      setImagePreviews([]);
      setFieldValue('images', []); // Clear centralized state images on successful upload
    } catch (error) {
      console.error('Failed to upload images:', error);
      alert('Failed to upload images.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setFieldValue('images', updatedImages); // Update centralized state
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="property-gallery-section" id="gallery" >
      <div className="gallery-description">
        <h3>Property Gallery</h3>
        <p>Upload photos of the property to give potential tenants a better view of the property’s features and layout.</p>
      </div>

      <div className="gallery-upload-container">
        <label htmlFor="imageUpload" className="upload-label">Select Photos</label>
        <div className="gallery-upload">
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
            className="upload-input1"
            accept="image/jpeg, image/png"
            multiple
          />
          <button
            className="upload-button1"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Photos'}
          </button>
        </div>

        <ul className="upload-instructions">
          <li>The maximum photo size is 8 MB. Formats: jpeg, jpg, png.</li>
          <li>Maximum number of photos allowed is 10.</li>
        </ul>

        <div className="image-preview-container">
          {imagePreviews.map((preview, index) => (
            <div className="image-preview" key={index}>
              <img src={preview} alt="Property Preview" className="preview-img" />
              <button className="remove-button" onClick={() => removeImage(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
