// src/components/ui/upload-webcommerce.jsx
'use client'
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Button } from './button';
import { Input } from './input';
import Cookies from 'js-cookie';
import { uploadCommercePhoto } from '@/lib/webCommerce'; // Import the function

const UploadWebCommerceDialog = ({ open, onOpenChange }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!image) {
      console.error('No image selected');
      return;
    }

    const commerceToken = Cookies.get('commerceToken');
    const cif = Cookies.get('commerceCIF');

    // Ensure token and cif are available
    if (!commerceToken || !cif) {
      console.error('Missing token or CIF');
      return;
    }

    try {
      console.log('Uploading image:', image);
      const data = await uploadCommercePhoto(commerceToken, cif, image);
      console.log('Upload successful:', data);
      setImage(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Select an image to upload for your web commerce.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleImageUpload} className="space-y-4">
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {image && (
            <div className="mt-4">
              <p className="text-green-500">Selected image: {image.name}</p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadWebCommerceDialog;