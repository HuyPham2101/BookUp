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
  offerId: string;
}

interface Offer {
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
  const [offer, setOffer] = useState<Offer>();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { offerId } = useParams<URLParams>();

  useEffect(() => {

    fetchOffer();

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

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTimeForDate = async (date: Date) => {
    const fetchTimeData = await fetch(`/api/booking/${offerId}?date=${date.toUTCString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(offer => offer.json());

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

      date.setHours(selectedTime.hours);
      // date.setHours(date.getHours() + 1);
      date.setMinutes(selectedTime.minutes);
      console.log(date)
      return date;
    }
  }

  const buildDateAddDuration = () => {
    if (
      offer !== undefined &&
      offer.duration !== undefined &&
      selectedDate !== undefined &&
      selectedTime !== undefined &&
      selectedTime.hours !== undefined &&
      selectedTime.minutes !== undefined) {
      const date = moment(buildDate()).add(offer.duration, 'm').toDate();

      return date;
    }
  }

  const bookEvent = async () => {
    const form = document.getElementById('register-form') as HTMLFormElement;

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
        offer: offer,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCurrentStep(3);
  };

  const fetchOffer = async () => {
    const offerData = await fetch(`/api/offer/${offerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(offer => offer.json());

    setOffer(offerData.data);
  }

  const AvailableTimesComponent = currentStep === 1 ? (
    <div id="available-times-div">
      <DayMonthHeading date={selectedDate} />
      <div style={{ height: "26em", overflowY: "auto" }}>
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
          <h2 id="offer">{offer ? offer.title : 'loading...'}</h2>
          <div className="icon-text-div">
            <img src={logo} alt="clock-icon" />
            <h4 id="duration">{offer ? offer.duration : 'loading...'} min</h4>
          </div>
        </hgroup>
        <p id="description">{offer ? offer.description : 'loading...'}</p>
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
          <h2 id="offer">{offer ? offer.title : 'loading...'}</h2>
          <div className="icon-text-div">
            <img src={logo} alt="clock-icon" />
            <h4 id="duration">{offer ? offer.duration : 'loading...'} min</h4>
          </div><br />
          <div className="icon-text-div">
            {/* <img src="icons/calendar (1).svg" alt="calendar-icon" /> */}
            <h4 id="offer-time-stamp">{moment(buildDate()).format('h:mma')} - {moment(buildDateAddDuration()).format('h:mma')}, {moment(buildDate()).format('MMMM Do YYYY')}</h4>
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
            <h2 id="offer">{offer ? offer.title : 'loading...'}</h2>
            <div className="icon-text-div">
              <img src={logo} alt="clock-icon" />
              <h4 id="duration">{offer ? offer.duration : 'loading...'} min</h4>
            </div><br />
            <div className="icon-text-div">
              {/* <img src="icons/calendar (1).svg" alt="calendar-icon" /> */}
              <h4 id="offer-time-stamp">{moment(buildDate()).format('h:mma')} - {moment(buildDateAddDuration()).format('h:mma')}, {moment(buildDate()).format('MMMM Do YYYY')}</h4>
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
