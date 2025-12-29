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

export interface GitHubRepo {
  name: string;
  url: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: GitHubRepo;
  created_at: string;
  payload?: {
    action?: string;
    ref?: string;
    ref_type?: string;
  };
}
