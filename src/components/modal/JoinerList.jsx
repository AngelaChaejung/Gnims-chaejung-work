import React, { useEffect } from "react";
import selectedIcon from "../../img/participantsSelected.svg";

//props로 받아올 것들...
const JoinerList = ({ following, selectedFollowings, setSelectedFollowings }) => {
  const selectHandler = (f) => {
    if (selectedFollowings.includes(f)) {
      setSelectedFollowings([...new Set(selectedFollowings.filter((following) => following !== f))]);
      return;
    }
    if (selectedFollowings.length >= 5) {
      return;
    }
    setSelectedFollowings([...new Set([...selectedFollowings, f])]);
  };

  const selectedStyle = selectedFollowings.includes(following) ? { backgroundColor: "#E3F0F5" } : {};

  return (
    <div className="mt-[20px] ">
      <div className="pl-[10px] pr-[10px]">
        <div
          className="flex p-[10px] rounded-[10px]"
          //배경색바뀌는부분
          style={selectedStyle}
          onClick={() => selectHandler(following)}
        >
          <div className="w-[50px] h-[50px]">
            <img className="w-full h-full rounded-full" src={following.profile} alt="프로필" />
          </div>
          <div className="flex w-[124px] items-center ml-[40px] ">
            {following.username}
            {selectedFollowings.includes(following) && (
              <img src={selectedIcon} alt="선택아이콘" className="ml-[60px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinerList;
