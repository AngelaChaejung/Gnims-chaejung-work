import { instance } from "../shared/AxiosInstance";

export const ScheduleApi = {
  //스케줄 전체 조회
  getSccheduleApi: (payload) => {
    //const data = instance.get(`/v2-dto/users/${payload}/events`);
    const data = instance.get(`/users/${payload}/events`);
    return data;
  },

  getInfiniteScrollPage: (payload) => {
    console.log(payload.userId);
    const data = instance.get(
      `/v2-page/users/${payload.userId}/events?page=${payload.page}&size=${3}`
    );
    return data;
  },

  //스케줄 등록
  postScheduleApi: (payload) => {
    const data = instance.post("/events", payload);
    return data;
  },

  //지난일정 조회
  getPastScheduleApi: () => {
    const data = instance.get("/events/past");
    return data;
  },

  //스케줄 삭제
  deleteScheduleApi: (payload) => {
    console.log(payload);
    const data = instance.delete(`/events/${payload}`);
    return data;
  },
};
