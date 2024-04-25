const checkTime = (bookingDate,bookingTime) =>{
const currentDatetime = new Date();
const dateObject = new Date(bookingDate);

const year = dateObject.getFullYear();
const month = dateObject.getMonth();
const day = dateObject.getDate();

const [hours, minutes, seconds] = bookingTime.split(':');

const newDateTime = new Date(year, month, day, hours, minutes, seconds);


if (newDateTime > currentDatetime) {
    return true
} else {
    return false
}

}

export default checkTime