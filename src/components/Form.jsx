import React, { useState } from "react";
import Spinner from "./Spinner";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  //get Collections Ref
  const tweetCol = collection(db, "tweets");
  //Upload mediaData And get URL
  const UploadMedia = async (file) => {
    if (!file) {
      return null;
    }
    const setUrl = "";
    //get Ref from StorageLocation to uploadMedia
    const fileRef = ref(storage, file.name.concat(v4()));
    //upload media to taken Ref
    return await uploadBytes(fileRef, file).then((res) =>
      //GetDownloadedURL
      getDownloadURL(res.ref).catch((err) => console.log(err))
    );
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    //get Form Data
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    //Check data isEmpty
    if (!textContent && !imageContent) {
      return toast.info("Add something!");
    }

    //Run UploadMedia FN and get Returned URL
    const imageURL = await UploadMedia(imageContent);

    //Save TweetData to Collection
    await addDoc(tweetCol, {
      createdAt: serverTimestamp(),
      textContent,
      //Give mediaURL
      imageContent: imageURL,
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
    e.target[0].value = "";
    setIsLoading(false);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700 "
    >
      <img
        className="rounded-full h-[35px] md:h-[45px mt-1]"
        src={user?.photoURL}
        alt="user-photo"
      />
      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none text-normal md:text-lg"
          placeholder="What's happening?"
          type="text"
        />
        <div className="w-full flex justify-between">
          <label
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
            htmlFor="fileInput"
          >
            <BsCardImage />
          </label>
          <input className="hidden" id="fileInput" type="file" />
          <button
            disabled={isLoading}
            type="submit"
            style={isLoading ? { opacity: "0.5" } : {}}
            className="bg-blue-600 flex items-center gap-2 px-4 py-2 rounded-full transition hover:bg-blue-800"
          >
            {isLoading && <Spinner />}
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
