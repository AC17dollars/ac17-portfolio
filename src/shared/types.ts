export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export enum ViewState {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}
