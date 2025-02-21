import { Chip, Stack } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ image, setImage }) => {
  
  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, [setImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });
  return (
    <div>
      <div
        {...getRootProps({
          className: `border rounded px-4 py-6 text-center bg-slate-100 cursor-pointer h-20 items-center flex justify-center`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&lsquo; drop some files here, or click to select files
          </p>
        )}
      </div>
      <Stack>
        {image?.name && (
          <Chip
            onDelete={() => setImage(null)}
            label={image.name}
            className="font-bold"
          />
        )}
      </Stack>
    </div>
  );
};

export default ImageUploader;
