export enum NavItem {
    Home = 'Home',
    View = 'View Data'
  }
  
  export type Submission = {
    durationSlept: number
    date: string
  }
  
  export type UserData = {
    id: string
    name: string,
    gender: 'Male' | 'Female' | 'Other'
    submissions: Submission[]
  }