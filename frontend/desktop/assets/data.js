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
<<<<<<< HEAD
        location: 'Location',
        startTime:'MM/DD/YYYY 0:00pm',
        endTime:'MM/DD/YYYY 0:00pm',
        guests:'0/0',
        attendees:'Me',
        tag:'DIY'
    }
=======
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Let\'s go Shopping',
        description:'Come shopping with me at the Florida Mall',
        date:'10/09/2020',
        startTime:'4:00pm',
        endTime:'5:00pm',
        atendees:'0/4',
    },
    {
        title:'Puppy Playdate',
        description:'My corgi needs a friend, meet me at the park ',
        date:'10/09/2020',
        startTime:'4:00pm',
        endTime:'5:00pm',
        atendees:'0/4',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },  {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },  {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
    {
        title:'Title',
        description:'Description',
        date:'MM/DD/YYYY',
        startTime:'0:00pm',
        endTime:'0:00pm',
        atendees:'0/0',
    },
>>>>>>> 4ec26dbc0fb52a9e64ddf23e403fe87df206e7b5
];