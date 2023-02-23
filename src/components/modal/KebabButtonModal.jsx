import React, { useState } from "react";
import deleteIcon from "../../img/deleteIcon.png";
import editIcon from "../../img/editIcon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deleteSchedule } from "../../redux/modules/ScheduleSlice";
import DeleteScheduleModal from "./DeleteScheduleModal";

const KebabModal = ({ setModalOpen, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scheduleEditHandler = () => {};
  const scheduleDeleteHandler = () => {
    setDeleteModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const userId = localStorage.getItem("userId");

  const confirmDeleteHandler = () => {
    //DELETE 기능넣으면 됨
    dispatch(__deleteSchedule([id, userId, dispatch]));
    console.log(id);
    navigate("/");
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <div className="h-full w-[375px]  bg-black bg-opacity-50 flex justify-center fixed bottom-0 z-1 ">
        {deleteModalOpen ? (
          // <DeleteScheduleModal/>
          <div className="text-black pt-8 items-center w-[375px] h-[160px] text-center rounded-[16px] bg-white">
            <div className="text-[18px] font-bold flex flex-col ">
              해당 일정을 삭제하시겠습니까?{" "}
            </div>
            <div className="mt-[14px] text-[14px] text-[#6F6F6F]">
              삭제된 일정은 복구가 불가능합니다.
            </div>
            <button
              className="bg-[#A31414] rounded-[4px]  h-[40px] w-[127px] text-white mt-[18px]"
              onClick={confirmDeleteHandler}
            >
              삭제
            </button>
            <button
              className="ml-[14px] h-[40px] rounded-[4px] border-solid border-black border-[1px] w-[127px] text-black mt-[18px]"
              onClick={() => setDeleteModalOpen(false)}
            >
              취소
            </button>
          </div>
        ) : (
          //이하는 모두 케밥버튼눌렀을 때 수정&삭제 모달
          <div className="inset-x-0 bottom-0 w-[375px] h-[160px] absolute rounded-t-lg bg-white z-2">
            <button className="" onClick={closeModal}>
              x
            </button>
            <div
              onClick={scheduleEditHandler}
              className="text-[#12396F] font-bold pt-[23px] h-[57px] flex row border-solid border-[#BBD7FF] border-b-[1px]"
            >
              <img
                src={editIcon}
                alt="edit"
                className="w-[24px] h-[24px] ml-[30px] mr-[20px]"
              />
              수정
            </div>
            <div
              onClick={scheduleDeleteHandler}
              className="text-[#A31414]  font-bold flex row  h-[60px] pt-[23px] ml-[30px] mb-[17px] "
            >
              <img
                src={deleteIcon}
                alt="delete"
                className="w-[24px] h-[24px] mr-[20px]"
              />
              삭제
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KebabModal;
