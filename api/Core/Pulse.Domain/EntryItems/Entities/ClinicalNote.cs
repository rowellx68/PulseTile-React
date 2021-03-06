﻿using System;
using Pulse.Domain.Interfaces;

namespace Pulse.Domain.EntryItems.Entities
{
    public class ClinicalNote : IEntryItem, IEntity
    {
        public Guid Id { get; set; }

        public string ClinicalNotesType { get; set; }

        public string Notes { get; set; }

        public string PatientId { get; set; }

        public string Author { get; set; }

        public DateTime DateCreated { get; set; }

        public string Source { get; set; }

        public string SourceId { get; set; }
    }
}