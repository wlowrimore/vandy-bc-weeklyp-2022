// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

    

// time slots
var dailyTimes = [
  {
      id: "0",
      hour: "9",
      time: "09",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "1",
      hour: "10",
      time: "10",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "2",
      hour: "11",
      time: "11",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "3",
      hour: "12",
      time: "12",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "4",
      hour: "1",
      time: "13",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "5",
      hour: "2",
      time: "14",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "6",
      hour: "3",
      time: "15",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "7",
      hour: "4",
      time: "16",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "8",
      hour: "5",
      time: "17",
      meridiem: "pm",
      reminder: ""
  },
]

// today's date
function getTodaysDate() {
  var curDate = moment().format('dddd, MMMM Do, YYYY');
  $("#currentDay").text(curDate);
}
getTodaysDate();

// color coded text fields
dailyTimes.forEach(function(curHour) {
  var hourRow = $("<form>").attr({
      "class": "row"
  });
  $(".container").append(hourRow);

  // displays time fields 
  var hourField = $("<div>")
      .text(`${curHour.hour}${curHour.meridiem}`)
      .attr({
          "class": "col-md-2 hour"
  });

  // description of scheduled reminders/time state
  var hourReminder = $("<div>")
      .attr({
          "class": "col-md-9 description p-0"
      });
  var reminderInfo = $("<textarea>");
  hourReminder.append(reminderInfo);
  reminderInfo.attr("id", curHour.id);
  if (curHour.time < moment().format("HH")) {
      reminderInfo.attr ({
          "class": "past", 
      })
  } else if (curHour.time === moment().format("HH")) {
      reminderInfo.attr({
          "class": "present"
      })
  } else if (curHour.time > moment().format("HH")) {
      reminderInfo.attr({
          "class": "future"
      })
  }

  // save button
  var saveButton = $("<i class='far fa-save fa-lg'></i>")
  var saveAction = $("<button>")
      .attr({
          "class": "col-md-1 saveBtn"
  });
  saveAction.append(saveButton);
  hourRow.append(hourField, hourReminder, saveAction);
})

// saves reminders into localStorage
function saveReminders() {
  localStorage.setItem("dailyTimes", JSON.stringify(dailyTimes));
}

// saves all info needed, in localStorage
$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".description").children(".future").attr("id");
  dailyTimes[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
  console.log(saveIndex);
  saveReminders();
  displayReminders();
})

// allows localStorage info to be viewed
function displayReminders() {
  dailyTimes.forEach(function (_curHour) {
      $(`#${_curHour.id}`).val(_curHour.reminder);
  })
}

// looks for any existing localStorage info and displays it
function init() {
  var storedDay = JSON.parse(localStorage.getItem("dailyTimes"));

  if (storedDay) {
      dailyTimes = storedDay;
  }

  saveReminders();
  displayReminders();
}

// loads existing info that's found in localstorage
init();