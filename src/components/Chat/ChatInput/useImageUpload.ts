import React, { useState, useCallback, useEffect, RefObject } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
  StorageError,
} from "firebase/storage";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import { FileRejection, useDropzone } from "react-dropzone";

export const useImageUpload = (
  disabled = false,
  inputRef?: RefObject<HTMLTextAreaElement | null>
) => {
  const [localImage, setLocalImage] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<StorageError | null>(null);
  // TODO: extract this from firebase directly
  const { isImageUploadingEnabled } = { isImageUploadingEnabled: true };

  const setImage = useZustandStore((state) => state.setImage);

  const isUploading = uploading && !uploadError;

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file || !file.type.startsWith("image/")) return;
      const imageBlob = new Blob([file], { type: file.type });
      const imageUrl = URL.createObjectURL(imageBlob);
      setLocalImage(imageUrl);
      setUploadError(null);
      setUploading(true);

      const storage = getStorage();
      const fileName = `chat_images/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);

      const task = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          ttl: "24hours",
        },
      });

      setUploadTask(task);

      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploadError(error);
          setUploading(false);
          setUploadTask(null);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(task.snapshot.ref);
            // Create short URL: replace full Firebase path with the /i/ rewrite and strip token
            const shortUrl = downloadURL
              .replace(
                "https://firebasestorage.googleapis.com/v0/b/gmpro-404802.firebasestorage.app/o/chat_images%2F",
                "https://better-chat.vercel.app/i/"
              )
              .replace(/&token=[^&]+/, ""); // Remove token param
            setImage({
              url: shortUrl,
              name: file.name,
              contentType: file.type,
            });
            setUploading(false);
            setUploadTask(null);
          } catch (err) {
            setUploadError(err as StorageError);
            setUploading(false);
            setUploadTask(null);
          }
        }
      );
    },
    [setImage]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        handleFileSelect(acceptedFiles[0]);
      }
    },
    [handleFileSelect]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        const error = rejection.errors[0];

        switch (error.code) {
          case "file-too-large":
            setFileError(
              "File size exceeds 25MB limit. Please choose a smaller image."
            );
            break;
          case "file-invalid-type":
            setFileError(
              "Invalid file type. Please upload a PNG, JPG, JPEG, GIF, or WebP image."
            );
            break;
          case "too-many-files":
            setFileError("Please upload only one image at a time.");
            break;
          default:
            setFileError("Unable to upload file. Please try again.");
        }
      }
    },
    [setFileError]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    noClick: true,
    preventDropOnDocument: false,
    noKeyboard: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    disabled: disabled || isUploading || !isImageUploadingEnabled,
    maxSize: 25 * 1024 * 1024, // 25 MB
    multiple: false,
  });

  useEffect(() => {
    if (uploadError && uploadError.code !== "storage/canceled") {
      setFileError("Failed to upload image. Please try again.");
      setImage(null);
      setLocalImage("");
    }
  }, [uploadError, setImage]);

  const resolveImageUpload = useCallback(() => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploadTask(null);
      setUploading(false);
    }
    setImage(null);
    setLocalImage("");
    setFileError(null);
  }, [uploadTask, setImage]);

  const clearFileError = useCallback(() => {
    setFileError(null);
  }, []);

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      if (disabled || !isImageUploadingEnabled) return;

      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) {
            setFileError(null);
            handleFileSelect(file);
          }
          break;
        }
      }
    },
    [disabled, isImageUploadingEnabled, handleFileSelect]
  );

  // Set up clipboard paste listener on the input element
  useEffect(() => {
    if (disabled || !isImageUploadingEnabled || !inputRef?.current) return;

    const inputElement = inputRef.current;

    inputElement.addEventListener("paste", handlePaste);
    return () => {
      inputElement.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste, disabled, isImageUploadingEnabled, inputRef]);

  return {
    localImage,
    fileError,
    uploading,
    uploadProgress,
    isUploading,
    handleFileSelect,
    resolveImageUpload,
    clearFileError,
    setFileError,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  };
};
