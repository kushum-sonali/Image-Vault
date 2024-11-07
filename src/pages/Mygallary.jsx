import React, { useState, useEffect } from "react";
import { Button } from "../ui/moving-border"; // Assuming this is the correct path to the Framer Motion Button component
import { useSelector, useDispatch } from "react-redux";
import { ref, deleteObject,getStorage } from "firebase/storage";
import {storage} from "../../imgConfig";
import { CardBody, CardContainer, CardItem } from "../ui/3dcard"; // Assuming the correct path
// import { cn } from "@/lib/utils";

function Gallery() {
  const [editIndex, setEditIndex] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const { image } = useSelector((state) => state.image);
  const [gallery, setGallery] = useState(image);

  useEffect(() => {
    // Load gallery from Redux state
    setGallery(image);
  }, [image]);

  const handleDelete = (refPath, index) => {
    console.log('Deleting file at path:', refPath); // Log the path to verify
  
    // Ensure the refPath is not empty or root
    if (!refPath || refPath === '/') {
      console.error("Invalid file reference path:", refPath);
      return;
    }
  
    // Remove the file from the gallery
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
    localStorage.setItem("gallery", JSON.stringify(updatedGallery));
  
    // Delete the file from Firebase Storage
    const storage = getStorage(); 
    const storageRef = ref(storage, refPath);
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting file:", error.message);
      });
  };

  const handleEdit = (index, description) => {
    setEditIndex(index);
    setEditDescription(description);
  };

  const handleSave = (index) => {
    const updatedGallery = gallery.map((file, i) => {
      if (i === index) {
        return { ...file, memory: editDescription };
      }
      return file;
    });
    setGallery(updatedGallery);
    localStorage.setItem("gallery", JSON.stringify(updatedGallery));
    setEditIndex(null);
    setEditDescription("");
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center">
     <h2 className="text-2xl font-bold mb-4 flex top-0 text-white">My Gallery 📁</h2>
    <div className="flex flex-col items-center p-5 overflow-y-auto">
     
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {gallery?.map((file, index) => (
          <CardContainer key={index} className="relative bg-custom-gradient2 w-95%">
            <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={file?.url}
                  alt={`Uploaded ${index}`}
                 className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                {file.name}
              </CardItem>
              {editIndex === index ? (
                <>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-4"
                    rows="3"
                  />
                  <Button
                    variant="outline"
                    className="bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditIndex(null)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    {file.memory}
                  </CardItem>
                  <Button
                    variant="outline"
                    className="bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold"
                    onClick={() => handleEdit(index, file.memory)}
                  >
                    Edit
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                className="bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold"
                onClick={() => handleDelete(file.refPath, index)}
              >
                Delete
              </Button>
            </CardBody>
          </CardContainer>
        ))}
      </div> 
    </div>
    </div>
    </>
  );
}

export default Gallery;
