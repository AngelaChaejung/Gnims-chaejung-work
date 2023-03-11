import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFollowing } from "../../redux/modules/FollowSlice";
import JoinerList from "./JoinerList";

const FollowingModal = ({ followings, setFollowings, setShowFollowingModal }) => {
  const dispatch = useDispatch();

  const following = useSelector((state) => state.FollowSlice.following);

  useEffect(() => {
    dispatch(__getFollowing());
  }, [dispatch]);

  return (
    <>
      <div className="h-full w-[375px]  bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
        <div className="text-black pt-8 items-center w-[300px] h-[560px] text-center rounded-[16px] mt-[60px] z-20 bg-white ">
          참여자 선택
          <div className="overflow-auto h-[400px] mt-[25px]">
            {following.followingList?.map((f) => {
              return (
                <JoinerList
                  key={f.followId}
                  following={f}
                  selectedFollowings={followings}
                  setSelectedFollowings={setFollowings}
                />
              );
            })}
          </div>
          <div className="h-[40px] w-[268px] flex place-content-center mt-[20px] m-auto">
            <button className="h-[40px] w-[100px] rounded text-[#6F6F6F]" onClick={() => setShowFollowingModal(false)}>
              닫기
            </button>
            <button
              className=" h-[40px] w-[100px] rounded ml-[10px] text-[#002C51]"
              onClick={() => setShowFollowingModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingModal;
