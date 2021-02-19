import './style.less';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react';
import { DayMonthHeading } from '../../components/DayMonthHeadingComponent';
import { TimeButton } from '../../components/TimeButtonComponent';
import Lottie from 'react-lottie';
import animationData from './confirmation.json';
import moment from 'moment';

import {
  useParams
} from "react-router-dom";

import logo from '../../logo.svg';

export interface TimeAvailable {
  time: string;
  minutes: number;
  hours: number;
  confirmPrompt: boolean;
}

interface URLParams {
  eventTypeId: string;
}

interface EventType {
  id: number;
  title: string;
  description: string;
  link: string;
  duration: number;
  createdAt: Date;
  updateAt: Date | null;
  deletedAt: Date | null;
}

interface SelectedTime {
  minutes: number;
  hours: number;
}

export const CalendarPage = () => {
  const [timesAvailable, setTimesAvailable] = useState<TimeAvailable[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<SelectedTime>();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [eventType, setEventType] = useState<EventType>();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { eventTypeId } = useParams<URLParams>();

  useEffect(() => {

    fetchEvent();

    // TODO fetchTimes

    const timeResponse = [
      {
        minutes: 0,
        hours: 9,
      }, {
        minutes: 0,
        hours: 10,
      }, {
        minutes: 0,
        hours: 11,
      }, {
        minutes: 0,
        hours: 14,
      }, {
        minutes: 0,
        hours: 15,
      }];

    setTimesAvailable(transformAvailableTime(timeResponse));

  }, []);

  const fetchTimeForDate = async (date: Date) => {
    const fetchTimeData = await fetch(`/api/booking/${eventTypeId}?date=${date.toUTCString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(eventType => eventType.json());

    console.log(fetchTimeData);

    setTimesAvailable(transformAvailableTime(fetchTimeData.data));
  }

  const transformAvailableTime = (times: any[]) => {
    return times.map((time) => {
      const { hours, minutes } = time;

      time.time = hourAndMinuteToTimeString(hours, minutes);
      time.confirmPrompt = false;

      return time;
    });
  }

  const hourAndMinuteToTimeString = (hours: number, minutes: number) => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return moment(date).format('h:mma');
  }

  const handleDateClick = (dateEvent: any) => {
    const { date } = dateEvent;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date <= yesterday) {
      return;
    }

    fetchTimeForDate(date);

    setSelectedDate(date);
    setCurrentStep(1);
    setConfirmPromptTimesAvailable({
      minutes: -1,
      hours: -1,
    });
  }

  const setConfirmPromptTimesAvailable = (time: SelectedTime) => {
    timesAvailable.map((timeAvailable) => {
      timeAvailable.confirmPrompt = timeAvailable.hours === time.hours && timeAvailable.minutes === time.minutes;

      return timeAvailable;
    });

    setTimesAvailable([...timesAvailable]);
  }

  const onTimeButtonClick = (time: SelectedTime) => {
    console.log(time)
    setSelectedTime(time);
    setConfirmPromptTimesAvailable(time);
  }

  const onTimeButtonConfirm = () => {
    setCurrentStep(2);
  }

  const buildDate = () => {
    if (
      selectedDate !== undefined &&
      selectedTime !== undefined &&
      selectedTime.hours !== undefined &&
      selectedTime.minutes !== undefined) {
      const date = new Date(selectedDate);

      date.setUTCHours(selectedTime.hours);
      // date.setHours(date.getHours() + 1);
      date.setUTCMinutes(selectedTime.minutes);
      console.log(date)
      return date;
    }
  }

  const buildDateAddDuration = () => {
    if (
      eventType !== undefined &&
      eventType.duration !== undefined &&
      selectedDate !== undefined &&
      selectedTime !== undefined &&
      selectedTime.hours !== undefined &&
      selectedTime.minutes !== undefined) {
      const date = moment(buildDate()).add(eventType.duration, 'm').toDate();

      return date;
    }
  }

    const buildDate = () =>  {
      if(
        selectedDate !== undefined &&
        selectedTime !== undefined &&
        selectedTime.hours !== undefined &&
        selectedTime.minutes !== undefined)
      {
        const date = new Date(selectedDate);

        date.setHours(selectedTime.hours);   
        // date.setHours(date.getHours() + 1);
        date.setMinutes(selectedTime.minutes);
        console.log(date)
        return date;
      }
    }

    if (!form.checkValidity()) {
      return;
    }

    await fetch("/api/booking/", {
      method: "POST",
      body: JSON.stringify({
        status: 0,
        date: buildDate(),
        invitee: {
          firstName,
          lastName,
          email,
        },
        eventType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCurrentStep(3);
  };

  const fetchEvent = async () => {
    const eventTypeData = await fetch(`/api/eventType/${eventTypeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(eventType => eventType.json());

    setEventType(eventTypeData.data);
  }

  const AvailableTimesComponent = currentStep === 1 ? (
    <div id="available-times-div">
      <DayMonthHeading date={selectedDate} />
      <div style={{ height: "24rem", overflowY: "auto" }}>
        {timesAvailable.map((time) =>
          <TimeButton
            time={time}
            onClick={onTimeButtonClick.bind(this)}
            onConfirm={onTimeButtonConfirm.bind(this)} />
        )}
      </div>
    </div>
  ) : null;

  const IndexComponent = (
    <div className="container">
      <section className="description-section">
        <hgroup>
          <h2 id="event">{eventType ? eventType.title : 'loading...'}</h2>
          <div className="icon-text-div">
            <img src={logo} alt="clock-icon" />
            <h4 id="duration">{eventType ? eventType.duration : 'loading...'} min</h4>
          </div>
        </hgroup>
        <p id="description">{eventType ? eventType.description : 'loading...'}</p>
      </section>
      <div className="divider" />
      <section id="calendar-section" className="body-section">
        <h3>Select a Date &amp; Time</h3>
        <div id="schedule-div">
          {AvailableTimesComponent}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height='auto'
            dateClick={handleDateClick}
            timeZone="UTC"
          />
        </div>
      </section>
    </div>
  );

  const RegisterComponent = (
    <div id="register" className="container">
      <section className="description-section">
        {/* <button className="back-btn"><img className="arrow-icon" src="icons/arrow (1).svg" alt="back-arrow" /></button> */}
        <hgroup>
          <h2 id="event">{eventType ? eventType.title : 'loading...'}</h2>
          <div className="icon-text-div">
            <img src={logo} alt="clock-icon" />
            <h4 id="duration">{eventType ? eventType.duration : 'loading...'} min</h4>
          </div><br />
          <div className="icon-text-div">
            {/* <img src="icons/calendar (1).svg" alt="calendar-icon" /> */}
            <h4 id="event-time-stamp">{moment(buildDate()).format('h:mma')} - {moment(buildDateAddDuration()).format('h:mma')}, {moment(buildDate()).format('MMMM Do YYYY')}</h4>
          </div>
        </hgroup>
      </section>
      <div className="divider" />
      <section id="register-section" className="body-section">
        <h3>Enter Details</h3>
        <form id="register-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="firstname">Firstname</label>
          <input type="text" id="firstname" required onChange={(e) => setFirstName(e.target.value)} />
          <label htmlFor="lastname">Lastname</label>
          <input type="text" id="lastname" required onChange={(e) => setLastName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
          <button id="submit-btn" onClick={bookEvent}>Schedule Event</button>
        </form>
      </section>
    </div>
  );

  const ConfirmComponent = (
    <div id="confirm">
      <div className="container">
        <section className="body-section">
          <h3>Confirmed!</h3>
          <p id="scheduler">Succesfully booked meeting.</p>
          <Lottie options={{
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
            height={250}
            width={250} />
        </section>
        <section className="description-section">
          <hgroup>
            <h2 id="event">{eventType ? eventType.title : 'loading...'}</h2>
            <div className="icon-text-div">
              <img src={logo} alt="clock-icon" />
              <h4 id="duration">{eventType ? eventType.duration : 'loading...'} min</h4>
            </div><br />
            <div className="icon-text-div">
              {/* <img src="icons/calendar (1).svg" alt="calendar-icon" /> */}
              <h4 id="event-time-stamp">{moment(buildDate()).format('h:mma')} - {moment(buildDateAddDuration()).format('h:mma')}, {moment(buildDate()).format('MMMM Do YYYY')}</h4>
            </div>
          </hgroup>
        </section>
      </div>
    </div>
  );

  return (
    <div>
      { currentStep < 2 ? IndexComponent : null}
      { currentStep === 2 ? RegisterComponent : null}
      { currentStep === 3 ? ConfirmComponent : null}
    </div>
  );
}
