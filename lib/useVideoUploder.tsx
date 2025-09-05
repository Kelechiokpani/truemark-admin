import React, { useState } from "react";
import axios, { AxiosError, AxiosProgressEvent } from "axios";

interface IUploader {
  onCompleted?: (res: any) => void;
  onError?: (error: AxiosError) => void;
}

const defaults = {
  onCompleted: (res: any) => {},
  onError: (error: AxiosError) => {},
};

const useVideoUploader = ({ onCompleted, onError }: IUploader = defaults) => {
  const [error, setError] = useState<any>();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setError(undefined);
    setUploadPercentage(0);
  };

  const upload = async (file: File | null, uploadPreset: string, cloudName: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setLoading(true);
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload/`, // 👈 CHANGED
        formData,
        {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const total: number = progressEvent.total || 0;
            const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
            setUploadPercentage(percentCompleted);
          },
        }
      );

      onCompleted?.(result.data);
      setUploadPercentage(0);
      return result.data; // contains secure_url
    } catch (error: AxiosError | any) {
      setError(error);
      onError?.(error);
      console.log(error, "upload error");
    } finally {
      setLoading(false);
    }
  };

  return { uploadPercentage, upload, handleReset, error, loading };
};

export default useVideoUploader;
