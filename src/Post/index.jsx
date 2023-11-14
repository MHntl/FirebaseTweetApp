import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import moment from "moment/moment";
import { auth, db } from "../firebase/config";
//to change turkish
import "moment/locale/tr";
import DropDown from "./DropDown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLiked, setIsLiked] = useState();
  //Check Likes
  useEffect(() => {
    const found = tweet.likes.find((id) => id === auth.currentUser.uid);
    setIsLiked(found);
  }, [tweet]);
  // Calculate Date
  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  //Delete tweet
  const handleDelete = async () => {
    if (confirm("Tweet will be deleted. Do you Confirm?")) {
      //get Ref editing tweet
      const tweetRef = doc(db, "tweets", tweet.id);
      //delete tweet
      await deleteDoc(tweetRef);
    }
  };
  //Toggle Lİke
  const toggleLike = async () => {
    //get Ref editing tweet
    const tweetRef = doc(db, "tweets", tweet.id);
    //Update Item And Update an Array
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) //if CurrentUser Liked then remove like
        : arrayUnion(auth.currentUser.uid), //if currentUser didNot like then add like
    });
  };
  return (
    <div className="relative flex gap-3 p-3 border-b-[1px] border-gray-700">
      <img className="w-12 h-12 rounded-full" src={tweet.user.photo} />
      <div className="w-full">
        {/* User Info */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray">
              @{tweet.user.name?.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray">{date}</p>
          </div>
          {/* User Settings */}
          {tweet.user.id === auth.currentUser.uid && (
            <div>
              <DropDown
                handleDelete={handleDelete}
                handleEdit={() => setIsEditMode(true)}
              />
            </div>
          )}
        </div>
        {/* Tweet Content */}

        <div className="my-3">
          {isEditMode ? (
            <EditMode
              close={() => setIsEditMode(false)}
              isImage={tweet.imageContent}
              id={tweet.id}
              text={tweet.textContent}
            />
          ) : (
            <p>{tweet.textContent}</p>
          )}

          {tweet.imageContent && (
            <img
              className="my-2 rounded-lg object-cover w-full mx-auto max-h-[340px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* Interact Buttons */}
        <div className="flex justify-between">
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#44ff005a]">
            <FaRetweet />
          </div>
          <div
            onClick={toggleLike}
            className="flex items-center gap-1 p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#e263eb69]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            {tweet.likes.length}
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#6600ff62]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
