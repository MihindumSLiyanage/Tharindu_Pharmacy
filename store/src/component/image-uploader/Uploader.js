import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { notifySuccess, notifyError } from "@utils/toast";

const Uploader = ({
  imageUrls,
  setImageUrls,
  folder = "",
  multiple = true,
}) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: multiple,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file) => {
          if (file.size > 5 * 1024 * 1024) {
            notifyError(
              `File ${file.name} size is too large. Max size is 5MB.`
            );
          } else {
            notifyError(
              `File ${file.name} is not a valid image. Only JPEG/PNG are allowed.`
            );
          }
        });
        return;
      }

      if (acceptedFiles.length === 0) {
        notifyError("No files were selected.");
        return;
      }

      if (!multiple && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const preview = URL.createObjectURL(file);
        setFilePreviews([preview]);
        uploadImageToCloudinary(file, false);
        return;
      }

      acceptedFiles.forEach((file) => {
        const preview = URL.createObjectURL(file);
        setFilePreviews((prev) => [...prev, preview]);
        uploadImageToCloudinary(file, true);
      });
    },
  });

  const uploadImageToCloudinary = async (file, append = true) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    if (folder) formData.append("folder", folder);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedUrl = response.data.secure_url;
      setImageUrls((prev) => (append ? [...prev, uploadedUrl] : [uploadedUrl]));
    } catch (err) {
      notifyError("Upload failed. Try again.");
      console.error("Cloudinary upload error:", err);
    }
  };

  const removeImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    notifySuccess("Image removed.");
  };

  useEffect(() => {
    return () => {
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviews]);

  return (
    <div className="w-full text-center">
      <div
        className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="flex justify-center">
          <FiUploadCloud className="text-3xl text-cyan-500" />
        </span>
        <p className="text-sm mt-2">Drag or click to upload</p>
        <em className="text-xs text-gray-400">(JPEG/PNG only, max 5MB each)</em>
      </div>
      {imageUrls.length > 0 && (
        <aside className="flex flex-wrap justify-center gap-4 mt-4">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="relative">
              <img
                src={url}
                alt={`Upload ${idx}`}
                className="border rounded-md w-24 max-h-24 object-cover p-2"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
};

export default Uploader;
