import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const ModifyButton = styled.button`
  background-color: grey;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [isEditing, setIsEdting] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [_, setNewPhoto] = useState<File | null>(null);
  const [newPhotoURL, setNewPhotoURL] = useState(photo);
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewPhoto(file);
      setNewPhotoURL(URL.createObjectURL(file));
    }
  };
  const onEdit = async () => {
    if (user?.uid !== userId) return;
    try {
      const tweetRef = doc(db, "tweets", id);
      await updateDoc(tweetRef, {
        tweet: editedTweet,
      });
      setIsEdting(false);
      alert("Tweet updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update tweet");
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <ModifyButton onClick={() => setIsEdting(true)}>Edit</ModifyButton>
          </>
        ) : null}
      </Column>
      {/* {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null} */}
      {isEditing ? (
        <div>
          {newPhotoURL && (
            <img
              src={newPhotoURL}
              alt="New Tweet"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
      ) : (
        photo && (
          <Column>
            <Photo src={photo} alt="Tweet" />
          </Column>
        )
      )}
      {isEditing && (
        <div>
          <textarea
            value={editedTweet}
            onChange={(event) => setEditedTweet(event.target.value)}
            style={{ width: "100%", minHeight: "100px" }}
          />
          <button onClick={onEdit}>Save</button>
          <button onClick={() => setIsEdting(false)}>Cancel</button>
        </div>
      )}
    </Wrapper>
  );
}
