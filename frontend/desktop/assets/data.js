function retrieve() {
axios.post('https://togethrgroup1.herokuapp.com/api/retrieveevents', {
    Tags: tags
    })
    .then((response) => {
        console.log(response);
        var events = response.data;
    }, (error) => {
        console.log(error);   
    });
}
module.exports = [
    {
        title:'Title',
        description:'Description',
        location: 'Location',
        startTime:'MM/DD/YYYY 0:00pm',
        endTime:'MM/DD/YYYY 0:00pm',
        guests:'0/0',
        attendees:'Me',
        tag:'DIY'
    }
];