// import React, { useEffect, useRef, useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "./components/ui/button";
// import { v4 as uuidv4 } from "uuid";
// import storage from '../imgConfig';
// import { ref, deleteObject } from "firebase/storage";
// import { uploadBytes, getDownloadURL } from 'firebase/storage';
// import { LoaderCircle } from 'lucide-react';

// function UploaderFile() {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [gallery, setGallery] = useState(JSON.parse(localStorage.getItem("gallery")) || []);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImageSrc(imageUrl);
//       setFile(file);
//     } else {
//       setImageSrc(null);
//       setFile(null);
//     }
//   };

//   const handleClear = () => {
//     setImageSrc(null);
//     fileInputRef.current.value = null; // Clear the file input
//   };

//   const handleUpload = (file) => {
//     if (!file) return;
//     setLoading(true);
//     const storageRef = ref(storage, `images/${uuidv4()}`);
//     uploadBytes(storageRef, file).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setGallery((prevGallery) => [...prevGallery, { url, refPath: snapshot.ref.fullPath }]);
//         handleClear(); 
//         setLoading(false);
//       }).catch(error => {
//         console.error("Error getting download URL:", error);
//         setLoading(false);
//       });
//     }).catch(error => {
//       console.error("Error uploading file:", error);
//       setLoading(false);
//     });
//   };

//   const handleDelete = (refPath, index) => {
//     if (!refPath) {
//       console.error("No reference path provided for deletion.");
//       return;
//     }
//     const fileRef = ref(storage, refPath);
//     deleteObject(fileRef).then(() => {
//       setGallery((prevGallery) => prevGallery.filter((_, i) => i !== index));
//       console.log(`File at ${refPath} deleted successfully.`);
//     }).catch((error) => {
//       console.error("Error deleting file:", error);
//     });
//   };

//   useEffect(() => {
//     if (gallery) {
//       localStorage.setItem("gallery", JSON.stringify(gallery));
//     }
//   }, [gallery]);
//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };


//   return (
//     <div className="flex gap-6 flex-col text-white h-full p-2 w-full ">
//       <div className='flex justify-center items-center flex-col'>
//         <Label htmlFor="picture" className="my-0">Upload Picture</Label>
//         <button
//         type="button"
//         onClick={handleButtonClick}
//         className="bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold flex items-center justify-center"
//       >
//         Select JPG images
//       </button>
//         <Input
//           id="picture"
//           type="file"
//           onChange={handleImageChange}
//           className="my-5"
//           ref={fileInputRef} // Reference for the file input
//         />
//         {imageSrc && (
//           <div className="relative">
//             <img id="pic" className='h-100 w-80' src={imageSrc} alt="Preview" />
//             <Button variant="outline" className="absolute top-0 right-0" onClick={handleClear}>X</Button>
//           </div>
//         )}
//         <Button
//           variant="outline"
//           className="bg-indigo-500 ..."
//           onClick={() => handleUpload(file)}
//         >
//           {loading ? <LoaderCircle className="bg-in digo-500 animate-spin h-5 w-5 mr-3" /> : "Upload"}
//         </Button>
//       </div>
//       <div className='flex flex-col items-center'>
//         <h2>Gallery</h2>
//         <div className="grid grid-cols-4 gap-4">
//           {gallery.map((file, index) => (
//             <div key={index} className="relative">
//               <img src={file.url} alt={`Uploaded ${index}`} className="h-100 w-80" />
//               <Button
//                 variant="outline"
//                 className="absolute top-0 right-0"
//                 onClick={() => handleDelete(file.refPath, index)}
//               >
//                 Delete
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploaderFile;
