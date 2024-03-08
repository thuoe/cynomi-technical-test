export enum NavItem {
    Home = 'Home',
    View = 'View Data'
  }
  
  export type SleepPattern = {
    id: number
    duration: number
    date: string
    userId: number
  }
  
  export type User = {
    id: number
    name: string,
    gender: 'male' | 'female' | 'other'
    sleepPatterns: SleepPattern[]
  }