using System;
using System.Collections.Generic;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();

        // don't forget to initalise the Comments list in the Activity entity class,
        // otehrwise when you have the activity object the comments is null, 
        // and you cannot add a new comment to something that is null, only something which is a list. 
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}