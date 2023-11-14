import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "../Post";
import Loader from "../Post/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  const tweetCol = collection(db, "tweets");

  useEffect(() => {
    //Order By "desc"
    const options = query(tweetCol, orderBy("createdAt", "desc"));
    //set options to onSnapShot
    onSnapshot(options, (snapshot) => {
      const tempTweets = [];
      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));
      setTweets(tempTweets);
    });
  }, []);
  // console.log(tweets);
  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Mainpage
      </header>
      <Form user={user} />
      {!tweets ? (
        <Loader />
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
};

export default Main;
