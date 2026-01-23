const TOUR_TYPES = {
  ADVENTURE: "adventure",
  CULTURAL: "cultural",
  RELAXATION: "relaxation",
  WILDLIFE: "wildlife",
} as const;

const TOUR_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  CANCELLED: "cancelled",
} as const;

export { TOUR_TYPES, TOUR_STATUS };
