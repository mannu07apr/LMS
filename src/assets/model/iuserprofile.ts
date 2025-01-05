export interface IUserProfile {
    id: number;                  // Unique identifier for each user
    userid:number;
    profilePhoto: string;         // To store the profile photo as a binary large object (optional)
    fullName: string;            // Full name of the user
    fathersName: string;         // Father's name of the user
    dob: Date;                   // Date of birth
    mobileNo: string;            // Mobile number
    alternateMobileNo?: string; // Alternate mobile number (optional)
    email: string;               // Email address
    personalEmail: string;      // Personal email address
    address: string;            // Address of the user
    state: string;              // State
    city: string;               // City
    pincode: string;            // Pincode (postal code)
}