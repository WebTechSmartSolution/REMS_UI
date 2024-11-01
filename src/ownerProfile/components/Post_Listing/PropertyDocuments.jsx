import React, { useState } from 'react';
import './Style/PropertyDocuments.css';

const PropertyDocuments = ({ setFieldValue }) => {
  const [document, setDocument] = useState(null);

  const handleFileChange = (e) => {
    const selectedDocument = e.target.files[0];
    setDocument(selectedDocument);
    setFieldValue('document', selectedDocument); // Update centralized state
  };

  const handleUpload = () => {
    if (document) {
      console.log('Document uploaded:', document.name);
      alert('Document uploaded successfully.');
      setFieldValue('document', null); // Clear centralized state after upload
      setDocument(null);
    } else {
      alert('Please select a document before uploading.');
    }
  };

  return (
    <div className="property-documents-section" id="documents">
      <div className="documents-description">
        <h3>Property Documents</h3>
        <p>
          Upload all necessary property documents, including legal papers, 
          ownership proof, and other important files that are needed for verification.
        </p>
      </div>

      <div className="documents-upload-container">
        <label htmlFor="documentUpload" className="upload-label">Select Document</label>
        <div className="documents-upload">
          <input
            type="file"
            id="documentUpload"
            onChange={handleFileChange}
            className="upload-input"
          />
          <button className="upload-button" onClick={handleUpload}>
            Upload Documents
          </button>
        </div>

        <ul className="upload-instructions">
          <li>The maximum size is 8 MB. Format: PDF.</li>
          <li>Maximum number of files upload will be 5 files.</li>
        </ul>

        {document && (
          <div className="upload-status">
            <p>Document uploaded successfully: {document.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDocuments;
