﻿using System;

namespace Pulse.Web.Controllers.Patients.ResponseModels
{
    public class PatientResponse
    {
        public string Id { get; set; }

        public string Address { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Department { get; set; }

        public string Gender { get; set; }

        public string GpAddress { get; set; }

        public string GpName { get; set; }

        public string Name { get; set; }

        public string NhsNumber { get; set; }

        public string PasNo { get; set; }

        public string Phone { get; set; }
    }
}