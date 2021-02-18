const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Props {
  date: Date,
}

export const DayMonthHeading = (props: Props) => {

  const getText = () => {
    const { date } = props;

    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`
  };

  return (
    <h4>
      {getText()}
    </h4>
  );
};