import { Calendar } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { Copyright } from '../../components/CopyrightComponent';

const onPanelChange = (value: any, mode: any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
}

export const CalendarPage = () => {
    return(
        <div>
            <h1>Booking</h1>
            <Calendar onPanelChange={onPanelChange}></Calendar>
            <Footer>
                <Copyright/>
            </Footer>
        </div>
    );
}
