import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { BsTrashFill } from "react-icons/bs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useRef } from "react";

const EditMode = ({ id, text, isImage, close }) => {
  const inputRef = useRef();
  //Update StorageItem
  const deleteImage = async () => {
    //Get UpdatingItem Ref
    const tweetRef = doc(db, "tweets", id);
    //Update Item (:null make is delete)
    await updateDoc(tweetRef, { imageContent: null });
  };
  const handleSave = async () => {
    //Get UpdatingItem Ref
    const tweetRef = doc(db, "tweets", id);
    //Update Item (:null make is delete)
    await updateDoc(tweetRef, { textContent: inputRef.current.value });
    close();
  };
  return (
    <>
      <input
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        defaultValue={text}
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full hover:bg-gray-500"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={() => close()}
        className=" p-2 text-red-400 rounded-full hover:bg-gray-500"
      >
        <ImCancelCircle />
      </button>
      {isImage && (
        <button
          onClick={deleteImage}
          className="absolute end-0 top-20 transition text-xl p-2 text-red-600 rounded-full bg-white hover:bg-gray-500"
        >
          <BsTrashFill />
        </button>
      )}
    </>
  );
};

export default EditMode;
