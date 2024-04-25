export const driversData = [
  {
    id: "driver1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123",
    phoneNumber: "123-456-7890",
    driverData: {
      driverRecognitionNumber: "DR123",
      nationalInsuranceNumber: "NI123",
      selfAssessmentTaxId: "TAX123",
      dateOfBirth: new Date("2023-08-07T12:30:00Z"),
      ratings: 4.8,
      totalJobComplete: 150,
      bio: "Experienced driver with a friendly attitude.",
      hobby: "Reading, hiking",
      depositePaid: true,
      depositeAmount: 500.0,
      commision: 15,
      currentBalance: 350.0,
      subcription: "gold",
      status: "active"
    }
  },
  {
    id: "driver2",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    password: "pass123",
    phoneNumber: "987-654-3210",
    driverData: {
      driverRecognitionNumber: "DR456",
      nationalInsuranceNumber: "NI456",
      selfAssessmentTaxId: "TAX456",
      dateOfBirth: new Date("1995-03-20T09:45:00Z"),
      ratings: 4.2,
      totalJobComplete: 100,
      bio: "Friendly and reliable driver.",
      hobby: "Playing guitar, traveling",
      depositePaid: true,
      depositeAmount: 400.0,
      commision: 12,
      currentBalance: 280.0,
      subcription: "silver",
      status: "pending"
    }
  },
  {
    id: "driver3",
    firstName: "Emily",
    lastName: "Smith",
    email: "emily@example.com",
    password: "securepwd",
    phoneNumber: "555-123-4567",
    driverData: {
      driverRecognitionNumber: "DR789",
      nationalInsuranceNumber: "NI789",
      selfAssessmentTaxId: "TAX789",
      dateOfBirth: new Date("1988-11-15T15:20:00Z"),
      ratings: 4.5,
      totalJobComplete: 120,
      bio: "Passionate about safe driving.",
      hobby: "Photography, cooking",
      depositePaid: true,
      depositeAmount: 450.0,
      commision: 14,
      currentBalance: 320.0,
      subcription: "diamond",
      status: "onHold"
    }
  },
  {
    id: "driver4",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    password: "mike123",
    phoneNumber: "888-555-9999",
    driverData: {
      driverRecognitionNumber: "DR234",
      nationalInsuranceNumber: "NI234",
      selfAssessmentTaxId: "TAX234",
      dateOfBirth: new Date("2000-07-03T18:10:00Z"),
      ratings: 4.0,
      totalJobComplete: 90,
      bio: "Courteous driver with a smile.",
      hobby: "Soccer, movies",
      depositePaid: true,
      depositeAmount: 300.0,
      commision: 10,
      currentBalance: 200.0,
      subcription: "none",
      status: "suspend"
    }
  },
  {
    id: "driver5",
    firstName: "Sophia",
    lastName: "Williams",
    email: "sophia@example.com",
    password: "sophie567",
    phoneNumber: "777-888-1234",
    driverData: {
      driverRecognitionNumber: "DR567",
      nationalInsuranceNumber: "NI567",
      selfAssessmentTaxId: "TAX567",
      dateOfBirth: new Date("1999-01-25T11:05:00Z"),
      ratings: 4.7,
      totalJobComplete: 135,
      bio: "Energetic and punctual driver.",
      hobby: "Swimming, painting",
      depositePaid: true,
      depositeAmount: 420.0,
      commision: 13,
      currentBalance: 300.0,
      subcription: "gold",
      status: "active"
    }
  },
  // Add more objects if needed...
];

export const DRIVER_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'ONHOLD', label: 'On Hold' },
  { value: 'SUSPEND', label: 'Suspend' },
];

export const CAR_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const DRIVER_SUBSCRIPTION_OPTIONS = [
  { value: 'DIMOND', label: 'Diamond' },
  { value: 'GOLD', label: 'Gold' },
  { value: 'SILVER', label: 'Silver' },
  { value: 'NONE', label: 'None' },
];


export const carsData = [
  {
    id: 1,
    color: "Black",
    engine: "V6",
    make: "Toyota",
    model: "Camry",
    year: "2020",
    numberPlate: "ABC123",
    status: "active",
    driverId: "driver1",
  },
  {
    id: 2,
    color: "White",
    engine: "V8",
    make: "Ford",
    model: "Mustang",
    year: "2018",
    numberPlate: "XYZ789",
    status: "active",
    driverId: "driver1",
  },
  {
    id: 3,
    color: "Silver",
    engine: "V6",
    make: "Honda",
    model: "Civic",
    year: "2019",
    numberPlate: "DEF456",
    status: "active",
    driverId: "driver1",
  },
  {
    id: 4,
    color: "Red",
    engine: "V8",
    make: "Chevrolet",
    model: "Camaro",
    year: "2022",
    numberPlate: "MNO987",
    status: "active",
    driverId: "driver2",
  },
  {
    id: 5,
    color: "Blue",
    engine: "V6",
    make: "Nissan",
    model: "Altima",
    year: "2021",
    numberPlate: "PQR789",
    status: "active",
    driverId: "driver2",
  },
  // Add more car data objects here
];