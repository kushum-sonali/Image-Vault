import React, { useEffect, useRef, useState } from "react";
import { FaGoogleDrive, FaDropbox } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import {storage} from "../../imgConfig";
import { ref, deleteObject } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { upload } from "@/store/ImageSlice";
import { useNavigate } from "react-router-dom";
// const storageRef = ref(storage, `images/${uuidv4()}`);

import { toast } from "react-toastify";
import { Button } from "../ui/moving-border"; // Assuming this is the correct path to the Framer Motion Button component

const FileUploadButton = ({ className, onChange, ...props }) => {
  
  const [files, setFiles] = useState([]);
  const [imagesrc, setImagesrc] = useState(null);
  const [imageUrlName, setImageUrlName] = useState("");
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(null);
  const [gallery, setGallery] = useState(
    JSON.parse(localStorage.getItem("gallery")) || []
  );
  const fileInputRef = useRef();
 

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageurl = URL.createObjectURL(file);
      setFiles(file);
      setImagesrc(imageurl);
      setImageUrlName(file.name);
    } else {
      setImagesrc(null);
      setFiles(null);
    }
  };

  const handleClear = () => {
    setImagesrc(null);
    fileInputRef.current.value = null;
    setImageUrlName("");
    setMemory("");
  };

  const handleUpload = (file) => {
    if (!file) return;
    if (!user) {
      toast.error("Please make sure you are signed in!");
      return;
    }
    
    setLoading(true);
    const storageRef = ref(storage, `images/${uuidv4()}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            setGallery((prevGallery) => [
              ...prevGallery,
              { url, refPath: snapshot.ref.fullPath, memory }
            ]);
            const result = await axios.post("http://localhost:5000/imageuploader", {
              name: imageUrlName,
              desc: memory,
              url: url,
              createdBy: user._id,
              refPath: snapshot.ref.fullPath,
              
            
          
            });
            console.log(result, "imagedata ");
            dispatch(upload(result.data.data));
            navigate("/gallery");
            toast.success("Files uploaded successfully");
            handleClear();
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    if (gallery) {
      localStorage.setItem("gallery", JSON.stringify(gallery));
    }
  }, [gallery]);

  useEffect(() => {
    if (!user) {
      <Button
        type="button"
        onClick={() => navigate('/login')}
        className="bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold flex items-center justify-center m-2"
      >
        UPLOAD FILES
      </Button>
    }
  }, [upload]);

  return (
    <div className="flex w-full items-center justify-center align-middle ">
      <div className=" bg-custom-gradient3  flex justify-center text-center align-middle rounded-xl relative p-4 items-center sm:p-6 ">
        <div
          className={cn(
            "file-upload-container text-center flex flex-col items-center w-full max-w-md",
            className
          )}
        >
          <h2 className="text-2xl font-bold mb-2">UPLOAD YOUR FILES</h2>
          <p className="text-gray-600 mb-4">Upload your files and save them to the gallery.</p>
          {imagesrc ? (
            <>
              <Button
                type="button"
                onClick={() => handleUpload(files)}
                className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin h-5 w-5 mr-3" />
                ) : (
                  "UPLOAD"
                )}
              </Button>
              <div className="relative mb-4">
                <img
                  id="pic"
                  className="h-60 w-60 sm:h-80 sm:w-80 m-3"
                  src={imagesrc}
                  alt="Preview"
                />
                <button
                  variant="outline"
                  className="absolute bg-custom-blue-1 text-white right-2.5 top-3 rounded hover:bg-sky-700 h-10 w-10" 
                  onClick={handleClear}
                >
                  X
                </button>
              </div>
              <input
                type="text"
                value={imageUrlName}
                onChange={(e) => setImageUrlName(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-4"
                placeholder="Edit Image URL Name"
              />
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-4"
                placeholder="Write your memory about this image"
                rows="3"
              />
            </>
          ) : (
            <Button
              type="button"
              onClick={handleButtonClick}
              className="bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800  font-serif font-bold"
            >
              UPLOAD FILES
            </Button>
          )}
          <input
            id="picture"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadButton;

