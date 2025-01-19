export interface NavigationItem {
  label: string;
  icon: string;
}
export interface Show {
  id: number;
  time: string;
  title: string;
  image: string;
}
export interface Details {
  title: string;
  distance: string;
  description: string;
  image: string;
}
export interface ParkInfo {
  tickets: string;
  hours: string;
}
export interface Data {
  header: {
    logo: string;
    notificationIcon: string;
  };
  banner: {
    image: string;
  };
  navigation: NavigationItem[];
  parkInfo: ParkInfo;
  upcomingShows: Show[];
  details: Details;
}