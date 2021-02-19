import { TimeAvailable } from '../pages/Calendar/CalendarPage';

interface Props {
  time: TimeAvailable;
  onClick : (arg0?: any) => void;
  onConfirm : (arg0?: any) => void;
}

export const TimeButton = (props: Props) => {
  const { time, onClick, onConfirm } = props;

    return (
      <div className="time-slot">
        <button className="time-btn" onClick={() => onClick({
          minutes: time.minutes,
          hours: time.hours,
        })}>
          {time.time}
        </button>
        { time.confirmPrompt ? (
            <button className="confirm-btn" onClick={() => onConfirm({
              minutes: time.minutes,
              hours: time.hours,
            })}>
              Confirm
            </button>
          ) : null }
      </div>
    );
};