const SchedulerCard = ({ color, selected, onClickCardColor }) => {
  return (
    <div
      className={`border-solid border-[4px] cursor-pointer rounded-[4px] w-[42px] h-[42px] mr-2 ${
        selected ? "border-blackBorder" : "border-none"
      } bg-${color}`}
      onClick={() => onClickCardColor(color)}
    ></div>
  );
};

export default SchedulerCard;
