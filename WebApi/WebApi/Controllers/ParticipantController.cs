using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class ParticipantController : ApiController
    {
        DBModel db = new DBModel();

        [HttpGet]
        [Route("api/GetParticipants")]
        public HttpResponseMessage GetParticipants()
        {
            var participants = db.Participants
                .Select(x => new {
                    ParticipantID = x.ParticipantID,
                    Name = x.Name,
                    Email = x.Email,
                    Score = x.Score,
                    TimeSpent = x.TimeSpent
                }).ToList();
            return this.Request.CreateResponse(HttpStatusCode.OK, participants);
        }

        [HttpPost]
        [Route("api/InsertParticipant")]
        public Participant Insert(Participant model)
        {
            db.Participants.Add(model);
            db.SaveChanges();
            return model;
        }

        [HttpPost]
        [Route("api/UpdateOutput")]
        public void UpdateOutput(Participant model)
        {
            db.Entry(model).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
